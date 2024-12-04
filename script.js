const colors = ["blue", "yellow", "red", "purple", "white", "pink", "orange", "green"];
let guessColors= ["", "", "", ""]
let tippedColors = []

let isProtanopiaMode = false;


function allowDrop(event){
    event.preventDefault();
}
function colorDragStart(event, color){
    // console.log(event);
    event.dataTransfer.setData("color", color);
    event.dataTransfer.setData("class", event.srcElement.classList[1])
}

function gameStartup(){
    for(let i = 0; i < 4; i++){
        guessColors[i] = colors[Math.floor(Math.random() * 4)]
        console.log(guessColors[i])
    }
    for(let i = 0; i < 4; i++){
        document.getElementById(`a${i+1}`).innerText = "?"
    }
}


function colorDropped(event){
    // console.log(event)
    const kockaid = event.toElement.id
    if (kockaid.substring(0,1) == "1"){
        if (kockaid.substring(2,3) == "1" || document.getElementById(`1v${Number(kockaid.substring(2,3))-1}`).style.backgroundColor != ""){
            if  (event.dataTransfer.getData("class") == "szin-kocka")
                document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
                tippedColors[Number(kockaid.substring(2,3)-1)] = event.dataTransfer.getData("color");
        }
    }
    else if(document.getElementById(`${Number(kockaid.substring(0,1))-1}v4`).style.backgroundColor != ""){
        if (kockaid.substring(2,3) == "1" || document.getElementById(`${kockaid.substring(0,1)}v${Number(kockaid.substring(2,3))-1}`).style.backgroundColor != ""){
            document.getElementById(kockaid).style.backgroundColor = `var(--${event.dataTransfer.getData("color")})`
            tippedColors[Number(kockaid.substring(2,3)-1)] = event.dataTransfer.getData("color");
        }
    }

    if(kockaid.substring(2,3) == 4){
        gameCheck(kockaid.substring(0,1))
    }
}


function gameCheck(sor) {
    let guessed = 0;

    for (let i = 0; i < 4; i++) {
        if (tippedColors[i] === guessColors[i]) {
            guessed++;
        }
        else if (guessColors.includes(tippedColors[i]))
        {
            console.log("Jó szín, rossz hely")      //TODO: Jó szín rossz hely lekezel
        }
    }

    if (guessed === 4) {
        for (let i = 0; i < 4; i++) {
            console.log(`var(--${guessColors[i]})`);
            document.getElementById(`a${i+1}`).style.backgroundColor = `var(--${guessColors[i]})`;
            document.getElementById(`a${i+1}`).innerText = ""
        }
    } else if (sor == 3) {
        for (let i = 0; i < 4; i++) {
            console.log(`var(--${guessColors[i]})`);
            document.getElementById(`a${i+1}`).style.backgroundColor = `var(--${guessColors[i]})`;
            document.getElementById(`a${i+1}`).innerText = ""
        }
    }
    tippedColors = []
}


function newGame(){
    let kockak = document.getElementsByClassName("kocka");
    for (let i = 0; i < kockak.length; i++) {
        kockak[i].style.backgroundColor = "";
    }
    gameStartup();

}


function toggleProtanopiaMode() {
    isProtanopiaMode = !isProtanopiaMode;

    // const szineselemek = document.querySelectorAll('#red, #blue, #yellow, #purple, #green, #yellow, #white, #pink');

    // szineselemek.forEach(element => {
    //     if (isProtanopiaMode) {
    //         element.classList.add('protanopia');
    //     } else {
    //         element.classList.remove('protanopia');
    //     }
    // });

    if(isProtanopiaMode){
        document.documentElement.style.setProperty("--blue", "blue")
        document.documentElement.style.setProperty("--yellow", "yellow")
        document.documentElement.style.setProperty("--red", "rgb(255, 100, 50)")
        document.documentElement.style.setProperty("--purple", "rgb(140, 50, 230)")
        document.documentElement.style.setProperty("--white", "white")
        document.documentElement.style.setProperty("--pink", "rgb(255, 150, 230)")
        document.documentElement.style.setProperty("--orange", "rgb(255, 170, 80)")
        document.documentElement.style.setProperty("--green", "rgb(0, 200, 150)")
    }
    else{
        document.documentElement.style.setProperty("--blue", "blue")
        document.documentElement.style.setProperty("--yellow", "yellow")
        document.documentElement.style.setProperty("--red", "red")
        document.documentElement.style.setProperty("--purple", "purple")
        document.documentElement.style.setProperty("--white", "white")
        document.documentElement.style.setProperty("--pink", "pink")
        document.documentElement.style.setProperty("--orange", "orange")
        document.documentElement.style.setProperty("--green", "green")
    }
}