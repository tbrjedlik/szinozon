const colors = ["red", "white", "blue", "pink", "orange", "purple", "yellow", "green"];
let guessColors= ["", "", "", ""]

function allowDrop(event){
    event.preventDefault();
}
function colorDragStart(event, color){
    event.dataTransfer.setData("color", color);
}

function gameStartup(){
    for(let i = 0; i < 4; i++){
        guessColors[i] = colors[Math.floor(Math.random() * 4)]
    }
    for(let i = 0; i < 4; i++){
        document.getElementById(`a${i+1}`).innerText = "?"
        }
}


function colorDropped(event){
    console.log(event)
    const kockaid = event.toElement.id
    if (kockaid.substring(0,1) == "1"){
        if (kockaid.substring(2,3) == "1" || document.getElementById(`1v${Number(kockaid.substring(2,3))-1}`).style.backgroundColor != ""){
            document.getElementById(kockaid).style.backgroundColor = event.dataTransfer.getData("color")
        }
    }
    else if(document.getElementById(`${Number(kockaid.substring(0,1))-1}v4`).style.backgroundColor != ""){
        if (kockaid.substring(2,3) == "1" || document.getElementById(`${kockaid.substring(0,1)}v${Number(kockaid.substring(2,3))-1}`).style.backgroundColor != ""){
            document.getElementById(kockaid).style.backgroundColor = event.dataTransfer.getData("color")
        }
    }

    if(kockaid.substring(2,3) == 4){
        gameCheck(kockaid.substring(0,1))
    }

}


function gameCheck(sor) {
    let tipColors = ["", "", "", ""];
    let guessed = 0;

    for (let i = 0; i < 4; i++) {
        tipColors[i] = document.getElementById(`${sor}v${i+1}`).style.backgroundColor || "";
    }

    if (tipColors.includes("")) {
        return;
    }

    for (let i = 0; i < 4; i++) {
        if (tipColors[i] === guessColors[i]) {
            guessed++;
        }
    }

    if (guessed === 4) {
        for (let i = 0; i < 4; i++) {
            document.getElementById(`a${i+1}`).style.backgroundColor = guessColors[i];
        }
    } else if (sor == 3) {
        for (let i = 0; i < 4; i++) {
            document.getElementById(`a${i+1}`).style.backgroundColor = guessColors[i];
        }
    }
}


function newGame(){
    let kockak = document.getElementsByClassName("kocka");
    for (let i = 0; i < kockak.length; i++) {
        kockak[i].style.backgroundColor = "";
    }
    gameStartup();

}