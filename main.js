let inGame = true;
let colorGuessTextBox = document.getElementById("colorGuessPanel");
let scoreTextBox = document.getElementById("scoreCounter");
let score = 0;
let uiMessageTextBox = document.getElementById("uiOutputBox");
let diffButtons = document.querySelectorAll(".diffButton");
let choicesBox = document.getElementById("guessesPanel");
let choicesCount = 0;
let diff = "";
let allDifs = ["easy", "medium", "hard", "top"];
function setup() {
    //setup difficulty button event listeners
    console.log("setting up");
    diffButtons.forEach(function (el) {
        el.addEventListener("click", function () {
            play(el.textContent);
            console.log("clikced");
            console.dir(el);
        });
    });
}
// Diffs: EZ MD HD TOP
function play(difficulty) {
    if (inGame) reset(); //Reset if ingame
    inGame = true;
    choicesCount = 0;
    //Calc how many choices we'll need to generate
    switch (difficulty) {
        case "EZ":
            choicesCount = 4;
            diff = "easy";
            break;
        case "MD":
            choicesCount = 9;
            diff = "medium";
            break;
        case "HD":
            choicesCount = 16;
            diff = "hard";
            break;
        case "TOP":
            choicesCount = 25;
            diff = "top";
            break;
    }
    //Remove any diff classes from choices panel
    allDifs.forEach(function (d) {
        choicesBox.classList.remove(d);
    });
    //Add diff template
    choicesBox.classList.add(diff);
    loop();
    /////////////////////////////////////////////////while (inGame) loop();
}
function loop() {
    //Generate new answer
    let answer = generateHexColor();
    let choiceColorsArr = [];
    //Generate new choices
    for (let i = 0; i < choicesCount; i++) {
        choiceColorsArr.push(generateHexColor());
    }
    //Add answer to random choice
    choiceColorsArr[Math.random() * choicesCount] = answer;
    //Print color out
    colorGuessTextBox.textContent = answer;
    //Creates all choices in dom
    for (let i = 0; i < choicesCount; i++) {
        let element = document.createElement("div");
        element.gameColor = choiceColorsArr[i];
        element.classList.add("guessItem");
        element.classList.add(diff); //easy medium hard top
        element.style.backgroundColor = element.gameColor;
        choicesBox.appendChild(element);
    }
}
function reset() {
    uiMessageTextBox.textContent = "Resetting";
    score = 0;
    scoreTextBox.textContent = 0;
    //Clear choices off doc
    for (let i = choicesBox.childNodes.length - 1; i >= 0; i--) {
        choicesBox.removeChild(choicesBox.childNodes[i]);
    }
}
function gameOver() {}
function generateHexColor() {
    let hex = "#";
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    hex += r.toString(16).padStart(2, "0");
    hex += g.toString(16).padStart(2, "0");
    hex += b.toString(16).padStart(2, "0");
    return hex;
}

setup();
