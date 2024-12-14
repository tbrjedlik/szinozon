const colors = ["blue", "yellow", "red", "purple", "white", "pink", "orange", "green"];
const magyarSzinek = ["kék", "sárga", "piros", "lila", "fehér", "rózsaszín", "narancs", "zöld"]
let guessColors = ["", "", "", ""]
let tippedColors = []

let szinSzam;
let sorSzam;
let difficulty = 'Standard'

difficulty = sessionStorage.getItem('difficulty') || 'Standard';
console.log(difficulty)



function settings(){
    const nehezsegCsuszka = document.getElementById('csuszka-nehezseg');
    const nehezsegiSzintek = ['Standard', 'Medium', 'Hard', 'Extreme'];

    let difficulty = sessionStorage.getItem('difficulty') || 'Standard';

    nehezsegCsuszka.value = nehezsegiSzintek.indexOf(difficulty) + 1;

    function updateDifficulty() {
        difficulty = nehezsegiSzintek[nehezsegCsuszka.value - 1];
        sessionStorage.setItem('difficulty', difficulty);
        console.log(difficulty);
    }

    nehezsegCsuszka.addEventListener('input', updateDifficulty);

    updateDifficulty();
}




function allowDrop(event) {
    event.preventDefault();
}
function colorDragStart(event, color) {
    // console.log(event);
    event.dataTransfer.setData("color", color);
    event.dataTransfer.setData("class", event.srcElement.classList[1])
}

function gameStartup() {
    difficultyLevel()
    kockakFeltoltes()
    pottyClear()
    let colorPool = [];
    colors.forEach(szin => {
        colorPool.push(szin);
    });
    for (let i = 0; i < szinSzam; i++) {
        let index = Math.floor(Math.random() * colorPool.length);
        guessColors[i] = colorPool[index]
        colorPool.splice(index, 1);
        console.log(guessColors[i])
    }
    for (let i = 0; i < szinSzam; i++) {
        document.getElementById(`a${i + 1}`).innerText = "?"
    }
    Szinezes = '1v1'
}

function kockakFeltoltes(){
    const megfejtDiv = document.getElementById("megfejtes");
    megfejtDiv.innerHTML = "";
    const valaszDiv = document.getElementById("valasz");
    valaszDiv.innerHTML = "";
    for(let i = 0; i < szinSzam; i++) {
        megfejtDiv.innerHTML += `<div class='kocka' id="a${i+1}"></div>`
    }
    for(let i = 0; i < sorSzam; i++){
        valaszDiv.innerHTML += "<div class='sor'></div>"
    }    
    const sorok = document.querySelectorAll("div.sor");
    for(let i = 0; i < sorSzam; i++){
        const sor = sorok[i];
        for(let j = 0; j < szinSzam; j++) {
            sor.innerHTML += `<div class="kocka" id="${i+1}v${j+1}" ondrop="colorDropped(event)" ondragover="allowDrop(event)"></div>`
        }
        for(let j = 0; j < szinSzam; j++) {
            sor.innerHTML += `<div class="potty" id="${i+1}p${j+1}"></div>`;
        }
    }
}

function colorDropped(event){
    // console.log(event)
    const kockaid = event.toElement.id
    if(Number(kockaid.split('v')[0]) < 10){
        if (event.dataTransfer.getData("class") == "szin-kocka" && kockaid.substring(0,1) == "1"){       //Első sor ellenőrzés
            if((kockaid.substring(2,3) == "1" &&  kockaHatter(kockaid,0,+1, false, false) == "") ||
            (Number(kockaid.substring(2,3)) == szinSzam && kockaHatter(kockaid, 0, 0, false, false) == "") ||
            (kockaHatter(kockaid, 0, -1, false, false) != "" && kockaHatter(kockaid,0,+1, false, false) == ""))  {
                document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
                tippedColors[Number(kockaid.substring(2, 3) - 1)] = event.dataTransfer.getData("color");
                
            }
        }
        else if(event.dataTransfer.getData("class") == "szin-kocka" && kockaHatter(kockaid, -1, szinSzam, true, false)){
            if((kockaid.substring(2,3) == "1" &&  kockaHatter(kockaid,0,+1, false, false) == "") ||
            (Number(kockaid.substring(2,3)) == szinSzam && kockaHatter(kockaid, 0, 0, false, false) == "") ||
            (kockaHatter(kockaid, 0, -1, false, false) != "" && kockaHatter(kockaid,0,+1, false, false) == "")){
                document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
                tippedColors[Number(kockaid.substring(2, 3) - 1)] = event.dataTransfer.getData("color");
            }
        }
        if (kockaid.substring(2, 3) == szinSzam) {
            gameCheck(kockaid.substring(0, 1))
        }
    }
    else{       //10nél nagyobb id-s sorok
        if(event.dataTransfer.getData("class") == "szin-kocka" && kockaHatter(kockaid, -1, szinSzam, true, true)){
            if((kockaid.substring(3,4) == "1" &&  kockaHatter(kockaid,0,+1, false, true) == "") ||
            (Number(kockaid.substring(3,4)) == szinSzam && kockaHatter(kockaid, 0, 0, false, true) == "") ||
            (kockaHatter(kockaid, 0, -1, false, true) != "" && kockaHatter(kockaid,0,+1, false, true) == "")){
                document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
                tippedColors[Number(kockaid.substring(3, 4) - 1)] = event.dataTransfer.getData("color");
            }
        }
        if (kockaid.substring(3, 4) == szinSzam) {
            gameCheck(kockaid.substring(0, 2))
        }
    }

    
}


function gameCheck(sor) {
    // console.log("belép");
    let guessed = 0;
    let guessIndex = 1;

    let remainingGuessColors = [...guessColors];
    let remainingTippedColors = [...tippedColors];

    for (let i = 0; i < szinSzam; i++) {
        if (tippedColors[i] === guessColors[i]) {
            guessed++;
            pottyTalalt(`${sor}p${guessIndex}`);
            guessIndex++;
            remainingGuessColors[i] = null;
            remainingTippedColors[i] = null;
        }
    }

    for (let i = 0; i < szinSzam; i++) {
        if (remainingTippedColors[i] !== null) {
            const colorIndex = remainingGuessColors.indexOf(remainingTippedColors[i]);
            if (colorIndex !== -1) {
                pottySzin(`${sor}p${guessIndex}`);
                guessIndex++;
                remainingGuessColors[colorIndex] = null;
                remainingTippedColors[i] = null;
            }
        }
    }

    if (guessed === szinSzam) {
        for (let i = 0; i < szinSzam; i++) {
            document.getElementById(`a${i + 1}`).style.backgroundColor = `var(--${guessColors[i]})`;
            document.getElementById(`a${i + 1}`).innerText = "";
        }
    } else if (sor == sorSzam) {
        for (let i = 0; i < szinSzam; i++) {
            document.getElementById(`a${i + 1}`).style.backgroundColor = `var(--${guessColors[i]})`;
            document.getElementById(`a${i + 1}`).innerText = "";
        }
    }

    tippedColors = [];
}




function newGame() {
    let kockak = document.getElementsByClassName("kocka");
    for (let i = 0; i < kockak.length; i++) {
        kockak[i].style.backgroundColor = "";
    }
    gameStartup();

}



function pottyTalalt(pId){      //Szín+hely jó
    const potty = document.getElementById(pId);
    potty.style.borderColor = "black";
    potty.style.borderWidth = "8px";
    potty.style.margin = 0;
}

function pottySzin(pId){        //Szín jó
    const potty = document.getElementById(pId);
    potty.style.borderColor = "white";
    potty.style.borderWidth = "8px";
    potty.style.margin = 0;
}
function pottyClear(){          
    const pottyok = document.querySelectorAll(".potty");
    for (let i = 0; i < pottyok.length; i++) {
        pottyok[i].style.borderWidth = "2px";
        pottyok[i].style.borderColor = "black";
        pottyok[i].style.marginLeft = "5px";
        pottyok[i].style.marginRight = "5px";
    }
}






function difficultyLevel() {
    switch (difficulty) {
        case 'Standard':
            szinSzam = 4;
            sorSzam = 12;
            break;
        case 'Medium':
            szinSzam = 4;
            sorSzam = 8;
            break;
        case 'Hard':
            szinSzam = 5;
            sorSzam = 10;
            break;
        case 'Extreme':
            szinSzam = 5;
            sorSzam = 1;
            break;
    }
}


function kockaHatter(kockaID, sorvalt, oszlopvalt, oszlopmegad, idtobbszamu){     //sorvalt: sorváltoztatás +1/-1 stb.    oszlopvalt: oszlopváltoztatás: +1/-1
                                                                                // Oszlopmegad: true -> oszlopvalt = oszlopszám, false -> szokásos müködés
                                                                                // idtobbszamu: ha az id kettő számjegyű akkor true
    // console.log(kockaID);
    // console.log(sorvalt);
    // console.log(oszlopvalt);
    // console.log(1 + sorvalt);
    // console.log(1 + oszlopvalt);
    
    // console.log();
    if ((Number(kockaID.substring(0,1)) + sorvalt) >= 1 && idtobbszamu == false) {
        if(oszlopmegad == false && (Number(kockaID.substring(2,3)) + oszlopvalt) <= szinSzam && (Number(kockaID.substring(2,3)) + oszlopvalt) > 0){
            // console.log(`${Number(kockaID.substring(0,1)) + sorvalt}v${Number(kockaID.substring(2,3)) + oszlopvalt}`);
            return document.getElementById(`${Number(kockaID.substring(0,1)) + sorvalt}v${Number(kockaID.substring(2,3)) + oszlopvalt}`).style.backgroundColor
        }
        if(oszlopmegad == true && (Number(kockaID.substring(2,3)) <= szinSzam && Number(kockaID.substring(2,3)) > 0)){
            // console.log(`${Number(kockaID.substring(0,1)) + sorvalt}v${Number(oszlopvalt)}`)
            return document.getElementById(`${Number(kockaID.substring(0,1)) + sorvalt}v${Number(oszlopvalt)}`).style.backgroundColor
        }
    }
    else if((Number(kockaID.substring(0,2)) + sorvalt) >= 1 && idtobbszamu == true){
        if(oszlopmegad == false && (Number(kockaID.substring(3,4)) + oszlopvalt) <= szinSzam && (Number(kockaID.substring(3,4)) + oszlopvalt) > 0){
            // console.log(`${Number(kockaID.substring(0,1)) + sorvalt}v${Number(kockaID.substring(2,3)) + oszlopvalt}`);
            return document.getElementById(`${Number(kockaID.substring(0,2)) + sorvalt}v${Number(kockaID.substring(3,4)) + oszlopvalt}`).style.backgroundColor
        }
        if(oszlopmegad == true && (Number(kockaID.substring(3,4)) <= szinSzam && Number(kockaID.substring(3,4)) > 0)){
            // console.log(`${Number(kockaID.substring(0,1)) + sorvalt}v${Number(oszlopvalt)}`)
            return document.getElementById(`${Number(kockaID.substring(0,2)) + sorvalt}v${Number(oszlopvalt)}`).style.backgroundColor
        }
    }
}