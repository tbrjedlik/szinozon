let SpeechRecognition = webkitSpeechRecognition;
// let Szinezes;
let resultI = 0;
const recognition = new SpeechRecognition();

recognition.lang = 'hu-HU';
recognition.continuous = true;

recognition.onstart = function() {
    console.log("A beszédfelismerés elindult...");
};

recognition.onresult = (event) =>{
    // console.log(event)
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
    alert("A beszédfelismerés nem használható. Lehetséges ok: engedély hiánya.")
};

function speechSetting(){
    console.log(speechSet)
    switch (speechSet){
        case '0':
            try{
                recognition.stop();
            }
            catch(error){
                break;
            }
            break;
        case '1':
            try{
                recognition.start();
            }
            catch(error){
                alert("A beszédfelismerés nem használható. Lehetséges ok: böngésző nem támogatott.")
                break;
            }
            break;
    }
}

function asdd(){
    console.log(Szinezes)
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