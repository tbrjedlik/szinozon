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