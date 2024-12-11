const colors = ["blue", "yellow", "red", "purple", "white", "pink", "orange", "green"];
const magyarSzinek = ["kék", "sárga", "piros", "lila", "fehér", "rózsaszín", "narancs", "zöld"]
let guessColors = ["", "", "", ""]
let tippedColors = []


function allowDrop(event) {
    event.preventDefault();
}
function colorDragStart(event, color) {
    // console.log(event);
    event.dataTransfer.setData("color", color);
    event.dataTransfer.setData("class", event.srcElement.classList[1])
}

function gameStartup() {
    for (let i = 0; i < 4; i++) {
        guessColors[i] = colors[Math.floor(Math.random() * 4)]
        console.log(guessColors[i])
    }
    for (let i = 0; i < 4; i++) {
        document.getElementById(`a${i + 1}`).innerText = "?"
    }
    Szinezes = '1v1'
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
    else if (document.getElementById(`${Number(kockaid.substring(0, 1)) - 1}v4`).style.backgroundColor != "") {
        if (kockaid.substring(2, 3) == "1" || document.getElementById(`${kockaid.substring(0, 1)}v${Number(kockaid.substring(2, 3)) - 1}`).style.backgroundColor != "") {
            document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
            tippedColors[Number(kockaid.substring(2, 3) - 1)] = event.dataTransfer.getData("color");
        }
    }

    if (kockaid.substring(2, 3) == 4) {
        gameCheck(kockaid.substring(0, 1))
    }
}


function gameCheck(sor) {
    let guessed = 0;

    for (let i = 0; i < 4; i++) {
        if (tippedColors[i] === guessColors[i]) {
            guessed++;
        }
        else if (guessColors.includes(tippedColors[i])) {
            console.log("Jó szín, rossz hely")      //TODO: Jó szín rossz hely lekezel
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






let colorblindMode = false;
// console.log('cvd mode:'+colorblindMode)
function toggleColorblindMode(){
    colorblindMode = !colorblindMode;

    // console.log('cvd mode:' + colorblindMode)

    if (!colorblindMode){
        document.documentElement.style.setProperty("--blue", "blue")
        document.documentElement.style.setProperty("--yellow", "yellow")
        document.documentElement.style.setProperty("--red", "red")
        document.documentElement.style.setProperty("--purple", "purple")
        document.documentElement.style.setProperty("--white", "white")
        document.documentElement.style.setProperty("--pink", "pink")
        document.documentElement.style.setProperty("--orange", "orange")
        document.documentElement.style.setProperty("--green", "green")
    }
    // else{
    //     console.log('Most kell választani.')
    // }
}

function toggleColorblindType(type) {

    if (colorblindMode) {
        switch (type){
            case 'protanopia':
                document.documentElement.style.setProperty("--blue", "blue")
                document.documentElement.style.setProperty("--yellow", "yellow")
                document.documentElement.style.setProperty("--red", "rgb(255, 100, 50)")
                document.documentElement.style.setProperty("--purple", "rgb(140, 50, 230)")
                document.documentElement.style.setProperty("--white", "white")
                document.documentElement.style.setProperty("--pink", "rgb(255, 150, 230)")
                document.documentElement.style.setProperty("--orange", "rgb(255, 170, 80)")
                document.documentElement.style.setProperty("--green", "rgb(0, 200, 150)")
                break;
            
            case 'deutranopia':
                document.documentElement.style.setProperty("--blue", "rgb(0, 0, 255)")
                document.documentElement.style.setProperty("--yellow", "rgb(255, 255, 0)")
                document.documentElement.style.setProperty("--red", "rgb(200, 50, 50)")
                document.documentElement.style.setProperty("--purple", "rgb(150, 0, 200)")
                document.documentElement.style.setProperty("--white", "rgb(255, 255, 255)")
                document.documentElement.style.setProperty("--pink", "rgb(255, 150, 200)")
                document.documentElement.style.setProperty("--orange", "rgb(255, 140, 0)")
                document.documentElement.style.setProperty("--green", "rgb(0, 170, 170)")
                break;
        
            case 'tritanopia':
                document.documentElement.style.setProperty("--blue", "rgb(140, 0, 255)")
                document.documentElement.style.setProperty("--yellow", "rgb(150, 200, 0)")
                document.documentElement.style.setProperty("--red", "rgb(255, 0, 0)")
                document.documentElement.style.setProperty("--purple", "rgb(200, 50, 200)")
                document.documentElement.style.setProperty("--white", "rgb(255, 255, 255)")
                document.documentElement.style.setProperty("--pink", "rgb(255, 120, 180)")
                document.documentElement.style.setProperty("--orange", "rgb(255, 100, 50)")
                document.documentElement.style.setProperty("--green", "rgb(0, 150, 100)")
                break;

            case 'achromatopsia':
                //TODO: acro
                break;
        }
            
    }
    else {
        console.error('Hiba: Érvénytelen konfiguráció. A "colorblindMode" ki van kapcsolva.')
    }
}












let isSpeechRecognition = false;
let Szinezes = '1v1'
let resultI = 0;
const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = 'hu-HU';
recognition.continuous = true;

recognition.onstart = function() {
    console.log("A beszédfelismerés elindult...");
};

recognition.onresult = (event) =>{
    
    const spokenText = event.results[resultI][0].transcript.toLowerCase().trim();
    console.log("Felismert szöveg:", spokenText);
    if (colors.includes(spokenText)) {
        console.log(`A felismert szín: ${spokenText} szerepel a színek között.`);
        felismertSzin(spokenText)
    }
    else if(magyarSzinek.includes(spokenText)){
        felismertSzin(colors[magyarSzinek.indexOf(szin)])
    }
    else if (spokenText == "remove" || spokenText == "Mégse"){
        megseSzin();
    }
    else {
        console.log(`A felismert szín: ${spokenText} nem szerepel a színek között.`);
    }
    resultI++;
    
};

recognition.onerror = function(event) {
    console.error("Hiba történt a beszédfelismerés során:", event.error);
};

function speechRecognition() {
    isSpeechRecognition = !isSpeechRecognition;
    if (isSpeechRecognition) {
        recognition.start();
    } else {
        recognition.stop();
        console.log("A beszédfelismerés leállt...")
    }
}

function felismertSzin(color){
    document.getElementById(Szinezes).style.backgroundColor = `var(--${color})`
    tippedColors[Number(Szinezes.substring(2, 3) - 1)] = color;
        if(Szinezes.substring(2,3) == 4){
            gameCheck(Szinezes.substring(0,1))
            Szinezes = `${Number(Szinezes.substring(0,1))+1}v1`;
        }
        else{
            Szinezes = `${Number(Szinezes.substring(0,1))}v${Number(Szinezes.substring(2,3))+1}`
        }
}

function megseSzin(){
    if(Szinezes != "1v1" && Szinezes.substring(2,3) != 1){
            Szinezes = `${Number(Szinezes.substring(0,1))}v${Number(Szinezes.substring(2,3))-1}`
    }
    document.getElementById(Szinezes).style.backgroundColor = "";

}