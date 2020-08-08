let inGame = true;
let colorGuessTextBox = document.getElementById("colorGuessPanel");
let scoreTextBox = document.getElementById("scoreCounter");
let score = 0;
let uiMessageTextBox = document.getElementById("uiOutputBox");
let diffButtons = document.querySelectorAll(".diffButton");
let choicesBox = document.getElementById("guessesPanel");
let choicesCount = 0;
let diff = "";
let answer = "";
let choicesLeft = 0;
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
    //Calc how many choices we'll need to generate
    switch (difficulty) {
        case "EZ":
            choicesCount = 4;
            diff = "easy";
            break;
        case "MD":
            choicesCount = 8;
            diff = "medium";
            break;
        case "HD":
            choicesCount = 12;
            diff = "hard";
            break;
        case "TOP":
            choicesCount = 20;
            diff = "top";
            break;
    }
    choicesLeft = choicesCount - 1;
    //Remove any diff classes from choices panel
    allDifs.forEach(function (d) {
        choicesBox.classList.remove(d);
    });
    //Add diff template
    choicesBox.classList.add(diff);
    //Remove existing elements
    for (let i = choicesBox.childNodes.length - 1; i >= 0; i--) {
        choicesBox.removeChild(choicesBox.childNodes[i]);
    }
    loop();
}
function loop() {
    //Generate new answer
    answer = generateHexColor();
    let choiceColorsArr = [];
    //Generate new choices
    for (let i = 0; i < choicesCount; i++) {
        choiceColorsArr.push(generateHexColor());
    }
    //Add answer to random choice
    choiceColorsArr[Math.floor(Math.random() * choicesCount)] = answer;
    //Print color out
    colorGuessTextBox.textContent = answer;
    console.log("shits");
    //Create all choices in dom
    console.log(choicesCount);

    for (let i = 0; i < choicesCount; i++) {
        let element = document.createElement("div");
        element.gameColor = choiceColorsArr[i];
        element.classList.add("guessItem");
        element.classList.add(diff); //easy medium hard top
        element.style.backgroundColor = element.gameColor;
        choicesBox.appendChild(element);
    }
    console.log("shits");
    //Add click logic to all choices
    document.querySelectorAll(".guessItem").forEach(function (el) {
        el.addEventListener("click", function () {
            console.log(el.gameColor);
            console.log(answer);
            if (el.gameColor == answer) {
                //Win
                guessCorrect(el);
                return;
            } else {
                //Remove element and continue
                guessWrong(el);
            }
        });
    });
    console.log("shits");
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
function gameOver() {
    uiMessageTextBox.textContent = "You lost!";
    setTimeout(() => {
        inGame = false;
        reset();
        play(diff);
    }, 3000);
}
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
function guessCorrect(choice) {
    //Make all choices answer color
    document.querySelectorAll(".guessItem").forEach(function (el) {
        el.style.backgroundColor = answer;
    });
    //Calculate score
    //On win add how many choices were left
    score += choicesLeft;
    scoreTextBox.textContent = score;
    //Output "Correct"
    uiMessageTextBox.textContent = "Correct!";
    //make choice invisible
    choice.style.position = "relative";
    choice.style.left = "-9999px";
    setTimeout(() => {
        inGame = false;
        play(diff);
    }, 1500);
}
function guessWrong(choice) {
    //make choice invisible
    choice.style.position = "relative";
    choice.style.left = "-9999px";

    //If last try
    if (choicesLeft < 2) {
        gameOver();
        return;
    }
    choicesLeft--;
}

setup();
