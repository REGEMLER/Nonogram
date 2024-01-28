import {timer, stopTimer} from "./timers.js";
import {createModalWin} from "./creators.js";
import {sound} from "./sounds.js";

export function reset(themeShema, THEME) {
    const cells = [...document.querySelectorAll("[data-cell='cell']")];
    cells.forEach(item => {
        item.classList.remove(`${themeShema[THEME].cellClick}`);
    })
    const counterElement = document.getElementById("counter");
    counterElement.textContent = 0;
    stopTimer();
    const span = document.querySelector(".time span");
    span.textContent = "00:00";
}

export function onContextMenu(event) {
    event.preventDefault();
    if(!event.target.dataset.cell || 
        event.target.dataset.cell !== "cell" || 
        event.target.classList.contains("cell_click_light") ||
        event.target.classList.contains("cell_click_dark")) return;
    sound("./assets/flag.mp3");

    if (event.target.textContent === "X") {
        event.target.textContent = "";
    } else {
        event.target.textContent = "X";
    }
}

export function onClick(themeShema, THEME, event) {
    const clicks = document.getElementById("counter").textContent;
    if(clicks === "0") timer();
    event.target.textContent = "";
    counter();
    sound("./assets/click.mp3");

    if (event.target.classList.contains(`${themeShema[THEME].cellClick}`)) {
        event.target.classList.remove(`${themeShema[THEME].cellClick}`);
    } else {
        event.target.classList.add(`${themeShema[THEME].cellClick}`);
    };
    if(checkWin(themeShema, THEME)) {
        win(themeShema, THEME);
    }
}

function checkWin(themeShema, THEME) {
    const model = JSON.parse(localStorage.getItem("model"));
    const cellElements = [...document.querySelectorAll("[data-cell='cell']")];
    const cellElementsMatrix = cellElements.map( item => item.classList.contains(`${themeShema[THEME].cellClick}`));
    return cellElementsMatrix.every((item, index) => {
        return item === model[index];
    })
}

function counter() {
    const counterElement = document.getElementById("counter");
    const newCounts = +counterElement.textContent + 1;
    counterElement.textContent = newCounts;
}

function win(themeShema, THEME){
    stopTimer();
    createModalWin(themeShema, THEME);
    sound("./assets/win.mp3");
}