let colorblindMode = false;

let lastChecked = null;
let colorblindType = sessionStorage.getItem('colorblindType') || '';


document.querySelectorAll('.exclusive-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            if (lastChecked && lastChecked !== event.target) {
                lastChecked.checked = false;
            }
            lastChecked = event.target;
        } else {
            if (lastChecked === event.target) {
                event.target.checked = true;
            }
        }

        if (event.target.checked) {
            if (event.target.previousElementSibling.textContent.includes("Red blindness")) {
                toggleColorblindType('protanopia');
                sessionStorage.setItem('colorblindType', 'protanopia')
            } else if (event.target.previousElementSibling.textContent.includes("Green blindness")) {
                toggleColorblindType('deutranopia');
                sessionStorage.setItem('colorblindType', 'deutranopia')
            } else if (event.target.previousElementSibling.textContent.includes("Blue blindness")) {
                toggleColorblindType('tritanopia');
                sessionStorage.setItem('colorblindType', 'tritanopia')
            } else if (event.target.previousElementSibling.textContent.includes("Total color blindness")) {
                toggleColorblindType('achromatopsia');
                sessionStorage.setItem('colorblindType', 'achromatopsia')
            }
        }
    });
});



function toggleColorblindMode() {
    colorblindMode = !colorblindMode;

    console.log('cvd mode:' + colorblindMode);

    if (!colorblindMode) {
        resetToDefaultColors();
        document.querySelector('.color-pies').style.display = 'none';

        document.querySelectorAll('.exclusive-checkbox').forEach((checkbox) => {
            checkbox.checked = false;
        });

    } else {
        document.querySelector('.color-pies').style.display = 'flex';
    }
}

function toggleColorblindType(type) {
    if (colorblindMode && document.documentElement.style.getPropertyValue("--blue") === "black") {
        resetToDefaultColors();  
    }

    if (colorblindMode) {
        switch (type) {
            case 'protanopia':
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

function setColorblindColors(red, purple, pink, orange, green, blue, yellow, white) {
    document.documentElement.style.setProperty("--blue", blue);
    document.documentElement.style.setProperty("--yellow", yellow);
    document.documentElement.style.setProperty("--red", red);
    document.documentElement.style.setProperty("--purple", purple);
    document.documentElement.style.setProperty("--white", white);
    document.documentElement.style.setProperty("--pink", pink);
    document.documentElement.style.setProperty("--orange", orange);
    document.documentElement.style.setProperty("--green", green);
}

function setAchromatopsiaColors() {
    document.documentElement.style.setProperty("--blue", "black");
    document.documentElement.style.setProperty("--yellow", "black");
    document.documentElement.style.setProperty("--red", "black");
    document.documentElement.style.setProperty("--purple", "black");
    document.documentElement.style.setProperty("--white", "black");
    document.documentElement.style.setProperty("--pink", "black");
    document.documentElement.style.setProperty("--orange", "black");
    document.documentElement.style.setProperty("--green", "black");

    document.querySelectorAll('.szinkor').forEach((element) => {
        element.style.backgroundColor = "black";
        element.style.color = "white";
        element.style.textAlign = "center";
        element.style.fontSize = "20px";

        switch (element.id) {
            case 'piros': element.innerHTML = "R"; break;
            case 'sarga': element.innerHTML = "Y"; break;
            case 'kek': element.innerHTML = "B"; break;
            case 'zold': element.innerHTML = "G"; break;
            case 'lila': element.innerHTML = "P"; break;
            case 'feher': element.innerHTML = "W"; break;
            case 'narancs': element.innerHTML = "O"; break;
            case 'rozsaszin': element.innerHTML = "P"; break;
        }
    });

    document.querySelectorAll('.szin-kocka').forEach((element) => {
        element.style.backgroundColor = "black";
        element.style.color = "white";
        element.style.textAlign = "center";
        element.style.fontSize = "20px";

        switch (element.id) {
            case 'piros': element.innerHTML = "R"; break;
            case 'sarga': element.innerHTML = "Y"; break;
            case 'kek': element.innerHTML = "B"; break;
            case 'zold': element.innerHTML = "G"; break;
            case 'lila': element.innerHTML = "P"; break;
            case 'feher': element.innerHTML = "W"; break;
            case 'narancs': element.innerHTML = "O"; break;
            case 'rozsaszin': element.innerHTML = "P"; break;
        }
    });
}

function resetToDefaultColors() {
    const defaultColors = {
        blue: "blue",
        yellow: "yellow",
        red: "red",
        purple: "purple",
        white: "white",
        pink: "pink",
        orange: "orange",
        green: "green"
    };

    document.documentElement.style.setProperty("--blue", defaultColors.blue);
    document.documentElement.style.setProperty("--yellow", defaultColors.yellow);
    document.documentElement.style.setProperty("--red", defaultColors.red);
    document.documentElement.style.setProperty("--purple", defaultColors.purple);
    document.documentElement.style.setProperty("--white", defaultColors.white);
    document.documentElement.style.setProperty("--pink", defaultColors.pink);
    document.documentElement.style.setProperty("--orange", defaultColors.orange);
    document.documentElement.style.setProperty("--green", defaultColors.green);

    document.querySelectorAll('.szinkor').forEach((element) => {
        element.style.backgroundColor = "";
        element.style.color = "";
        element.innerHTML = ""; 
    });

    document.querySelectorAll('.szin-kocka').forEach((element) => {
        element.style.backgroundColor = "";
        element.style.color = "";
        element.innerHTML = ""; 
    });
}