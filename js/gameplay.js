const colors = ["blue", "yellow", "red", "purple", "white", "pink", "orange", "green"];
const magyarSzinek = ["kék", "sárga", "piros", "lila", "fehér", "rózsaszín", "narancs", "zöld"]
let guessColors = ["", "", "", ""]
let tippedColors = []

let szinSzam;
let sorSzam;


let difficulty = localStorage.getItem('difficulty') || 'Standard';
console.log(difficulty)



if (window.location.pathname.endsWith('settings.html')) {
    const nehezsegCsuszka = document.getElementById('csuszka-nehezseg');
    const nehezsegiSzintek = ['Standard', 'Medium', 'Hard', 'Extreme'];

    let difficulty = localStorage.getItem('difficulty') || 'Standard';

    nehezsegCsuszka.value = nehezsegiSzintek.indexOf(difficulty) + 1;

    function updateDifficulty() {
        difficulty = nehezsegiSzintek[nehezsegCsuszka.value - 1];
        localStorage.setItem('difficulty', difficulty);
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
    for (let i = 0; i < 4; i++) {
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

function colorDropped(event) {
    // console.log(event)
    const kockaid = event.toElement.id
    if (kockaid.substring(0, 1) == "1") {
        if (kockaid.substring(2, 3) == "1" || document.getElementById(`1v${Number(kockaid.substring(2, 3)) - 1}`).style.backgroundColor != "") {
            if (event.dataTransfer.getData("class") == "szin-kocka")
                document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
            tippedColors[Number(kockaid.substring(2, 3) - 1)] = event.dataTransfer.getData("color");
        }
    }
    else if (document.getElementById(`${Number(kockaid.substring(0, 1)) - 1}v${szinSzam}`).style.backgroundColor != "") {
        if (event.dataTransfer.getData("class") == "szin-kocka"){
            if((kockaid.substring(2,3) == "1" && document.getElementById(`${kockaid.substring(0,1)}v${Number(kockaid.substring(2,3))+1}`).style.backgroundColor == "")||
            (document.getElementById(kockaid).style.backgroundColor == "" && document.getElementById(`${kockaid.substring(0,1)}v${Number(kockaid.substring(2, 3)) - 1}`).style.backgroundColor != "")||
                (document.getElementById(`${Number(kockaid.substring(0,1))}v${Number(kockaid.substring(2,3)-1)}`).style.backgroundColor != "" && 
                document.getElementById(`${Number(kockaid.substring(0,1))}v${Number(kockaid.substring(2,3))+1}`).style.backgroundColor == ""))
                {
                    document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
                    tippedColors[Number(kockaid.substring(2, 3) - 1)] = event.dataTransfer.getData("color");
                }
        }
    }

    if (kockaid.substring(2, 3) == 4) {
        gameCheck(kockaid.substring(0, 1))
    }
}


function gameCheck(sor) {
    let guessed = 0;
    let guessIndex = 1;
    for (let i = 0; i < 4; i++) {
        if (tippedColors[i] === guessColors[i]) {
            guessed++;
            pottyTalalt(`${sor}p${guessIndex}`);
            guessIndex++;
            tippedColors[i] = "";
        }
    }
    for (let i = 0; i < 4; i++) {
        if (guessColors.includes(tippedColors[i])) {
            pottySzin(`${sor}p${guessIndex}`);
            guessIndex++;
            tippedColors[i] = "";
        }
    }

    if (guessed == 4) {
        for (let i = 0; i < 4; i++) {
            console.log(`var(--${guessColors[i]})`);
            document.getElementById(`a${i + 1}`).style.backgroundColor = `var(--${guessColors[i]})`;
            document.getElementById(`a${i + 1}`).innerText = ""
        }
    } else if (sor == 3) {
        for (let i = 0; i < 4; i++) {
            console.log(`var(--${guessColors[i]})`);
            document.getElementById(`a${i + 1}`).style.backgroundColor = `var(--${guessColors[i]})`;
            document.getElementById(`a${i + 1}`).innerText = ""
        }
    }
    tippedColors = []
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


