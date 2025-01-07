const colors = ["blue", "yellow", "red", "purple", "white", "pink", "orange", "green"];
const magyarSzinek = ["kék", "sárga", "piros", "lila", "fehér", "rózsaszín", "narancs", "zöld"]
let guessColors = ["", "", "", ""]
let tippedColors = []

let szinSzam;
let sorSzam;
let difficulty = 'Standard'
let speechSet = 0

let elertPont = 0
let legjobbPontszam = 0;

if (sessionStorage.getItem("bestScore")) {
    legjobbPontszam = parseInt(sessionStorage.getItem("bestScore"));
    document.getElementById("personal-best").textContent = legjobbPontszam;
}

let kezdesIdeje;
let befejezesIdeje;
let elteltMp;

let jatekVege = false;
let intervalId;

difficulty = sessionStorage.getItem('difficulty') || 'Standard';
console.log(difficulty)
speechSet = sessionStorage.getItem('speechSet') || 0;
iscolorblindOn = sessionStorage.getItem('iscbOn') || false;



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

    const speechCsuszka = document.getElementById('csuszka-beszed');

    let speechSet = sessionStorage.getItem('speechSet') || 'Off';

    speechCsuszka.value = speechSet + 1;

    function updateSpeech() {
        speechErtek = speechCsuszka.value - 1;
        sessionStorage.setItem('speechSet', speechErtek);
    }

    speechCsuszka.addEventListener('input', updateSpeech);

    updateSpeech();

    const nyelvValaszto = document.getElementById('nyelvek');
    let lang = sessionStorage.getItem('lang') || 'en';

    nyelvValaszto.value = lang;

    function updateLanguage() {
        lang = nyelvValaszto.value;
        if(lang == 'hu'){
            sessionStorage.setItem('lang', 'hu-HU');
        }
        else{
            sessionStorage.setItem('lang', 'en-US');
        }            
        console.log(`nyelv: ${lang}`);
    }

    nyelvValaszto.addEventListener('change', updateLanguage);

    updateLanguage();

    const colorblindCsuszka = document.getElementById('csuszka-szintevesztes');

    let colorbvalue = sessionStorage.getItem('iscbOn')
    if(colorbvalue == 'true'){colorblindCsuszka.value = 2
        document.querySelector('.color-pies').style.display = 'flex';
    }
    else(colorblindCsuszka.value = 1)
    setColorBlindness()
    colorblindCsuszka.addEventListener('input', () => {
        const colorblindSet = parseInt(colorblindCsuszka.value);
    
        if (colorblindSet === 1) {
            document.querySelector('.color-pies').style.display = 'none';
            if (colorblindMode) {
                console.log(colorblindMode)
                toggleColorblindMode();
            }
            sessionStorage.setItem('iscbOn', false);
        } else if (colorblindSet === 2) {
            if (!colorblindMode) {
                console.log(colorblindMode)
                toggleColorblindMode();
            }
            sessionStorage.setItem('iscbOn', true);
        }
    });
    
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

    kezdesIdeje = new Date;
    console.log('Kezdés ideje:')
    console.log(kezdesIdeje)

    console.log('cvd mode:' + colorblindMode)
    console.log(sessionStorage.getItem('iscbOn'))

    difficultyLevel();
    kockakFeltoltes();
    pottyClear();
    setColorBlindness();
    speechSetting();
    let colorPool = [];
    colors.forEach(szin => {
        colorPool.push(szin);
    });
    for (let i = 0; i < szinSzam; i++) {
        let index = Math.floor(Math.random() * colorPool.length);
        guessColors[i] = colorPool[index];
        console.log(guessColors[i]);
    }
    for (let i = 0; i < szinSzam; i++) {
        document.getElementById(`a${i + 1}`).innerText = "?";
    }
    const sorok = document.querySelectorAll('.sor');
    if (sorok.length > 0) {
        sorok[0].classList.add('aktualis-sor');
    }
    Szinezes = '1v1';
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
    const sorok = document.querySelectorAll('.sor');
    sorok.forEach(sorElem => sorElem.classList.remove('aktualis-sor'));
    if (Number(sor) < sorSzam) {
        document.querySelector(`.sor:nth-child(${Number(sor) + 1})`).classList.add('aktualis-sor');
    }

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

            jatekVegetErt((sorSzam-sor));
        }
    } else if (sor == sorSzam) {
        for (let i = 0; i < szinSzam; i++) {
            document.getElementById(`a${i + 1}`).style.backgroundColor = `var(--${guessColors[i]})`;
            document.getElementById(`a${i + 1}`).innerText = "";
        
            jatekVegetErt(0);
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

function jatekVegetErt(megmaradtProbalkozas){
    jatekVege = true;
    clearInterval(intervalId);
    befejezesIdeje = new Date;
    console.log("A játék véget ért.");
    console.log(befejezesIdeje)

    if (megmaradtProbalkozas == 0){
        elertPont = 'You lost.'
    }
    else{
        elertPont = pontszamitas(megmaradtProbalkozas)

        if (elertPont > legjobbPontszam){
            legjobbPontszam = elertPont;
        }
    }

    sessionStorage.setItem("bestScore", legjobbPontszam);

    document.getElementById("score").textContent = elertPont;
    document.getElementById("personal-best").textContent = legjobbPontszam;
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
            sorSzam = 10;

            if (jatekVege == false && !intervalId) {
                setInterval(szinKorforgas, 30000);
            }
    
            break;
    }};

function extremeSzinGeneralas() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function szinKorforgas() {

    const colors = [
        "--blue",
        "--yellow",
        "--red",
        "--purple",
        "--white",
        "--pink",
        "--orange",
        "--green"
    ];

    let usedColors = [];

    colors.forEach(color => {
        let newColor;

        do {
            newColor = extremeSzinGeneralas();
        } while (usedColors.includes(newColor));

        usedColors.push(newColor);

        document.documentElement.style.setProperty(color, newColor);
    });

    console.log("Színek frissítve...");
}

function pontszamitas(megmaradtProbalkozas){

    switch (difficulty) {
        case 'Standard':
            alapPont = 120;
            break;
        case 'Medium':
            alapPont = 300;
            break;
            break;
        case 'Hard':
            alapPont = 600;
            break;
            break;
        case 'Extreme':
            alapPont = 1200;
            break;
    }

    elteltMp = (befejezesIdeje-kezdesIdeje)/1000
    console.log(elteltMp)

    elertPont = alapPont + megmaradtProbalkozas - Math.floor((elteltMp-5)/5);

    return elertPont;
}

function setColorBlindness(){
    console.log("asd")
    if(sessionStorage.getItem('iscbOn') == 'true'){
        switch (sessionStorage.getItem('colorblindType')) {
            case 'protanopia':
                console.log("ASdasdasdasdas")
                setColorblindColors("rgb(255, 100, 50)", "rgb(140, 50, 230)", "rgb(255, 150, 230)", "rgb(255, 170, 80)", "rgb(0, 200, 150)", "blue", "yellow", "red");
                break;
            case 'deutranopia':
                setColorblindColors("rgb(200, 50, 50)", "rgb(150, 0, 200)", "rgb(255, 150, 200)", "rgb(255, 140, 0)", "rgb(0, 170, 170)", "rgb(0, 0, 255)", "rgb(255, 255, 0)", "red");
                break;
            case 'tritanopia':
                setColorblindColors("rgb(255, 0, 0)", "rgb(200, 50, 200)", "rgb(255, 120, 180)", "rgb(255, 100, 50)", "rgb(0, 150, 100)", "rgb(140, 0, 255)", "rgb(150, 200, 0)", "rgb(255, 255, 255)");
                break;
            case 'achromatopsia':
                setAchromatopsiaColors();
                break;
            default:
                resetToDefaultColors(); 
                break;
        }
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
            console.log(`${Number(kockaID.substring(0,1)) + sorvalt}v${Number(kockaID.substring(2,3)) + oszlopvalt}`);
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