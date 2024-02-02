import {timer, stopTimer} from "./timers.js";
import {createModalWin} from "./creators.js";
import {setResults} from "./results.js";

export function showSolution() {
    const cells = [...document.querySelectorAll("[data-cell='cell']")];
    const model = JSON.parse(localStorage.getItem("model"));
    cells.forEach((item, index) => {
        if(model[index]) {
            item.classList.add(`cell_click`);
        } else {
            item.classList.remove(`cell_click`);
        }
    });
}

export function sound(src){
    const audio = new Audio();
    audio.src = src;
    audio.play(); 
}

export function reset() {
    const cells = [...document.querySelectorAll("[data-cell='cell']")];
    cells.forEach(item => {
        item.classList.remove(`cell_click`);
    })
    const counterElement = document.getElementById("counter");
    counterElement.textContent = 0;
    stopTimer();
    const span = document.querySelector(".time span");
    span.textContent = "00:00";
}

export function random() {
    const levels = ["easy", "medium", "hard"];
    const levelID = levels.sort(() => Math.random() - 0.5)[0];
    let nonograms = null;
    if(levelID === "easy") {
        nonograms = ["tower", "cross", "skull", "bat", "tree"];
    } else if (levelID === "medium") {
        nonograms = ["question", "snail", "music", "mouse", "cherry"];
    } else {
        nonograms = ["home", "clover", "spades", "dolphin", "deer"];
    }
    const name = nonograms.sort(() => Math.random() - 0.5)[0];
    return {levelID, name};
}

export function onContextMenu(event) {
    if(!event.target.dataset.cell || 
        event.target.dataset.cell !== "cell" || 
        event.target.classList.contains("cell_click")) return;

    event.preventDefault();    
    sound("./assets/flag.mp3");

    if (event.target.textContent === "X") {
        event.target.textContent = "";
    } else {
        event.target.textContent = "X";
    }
}

export function onClick(event) {
    if(checkWin()) return;
    const clicks = document.getElementById("counter").textContent;
    if(clicks === "0") timer();
    event.target.textContent = "";
    counter();
    sound("./assets/click.mp3");

    if (event.target.classList.contains(`cell_click`)) {
        event.target.classList.remove(`cell_click`);
    } else {
        event.target.classList.add(`cell_click`);
    };
    if(checkWin()) {
        win();
    }
}

function checkWin() {
    const model = JSON.parse(localStorage.getItem("model"));
    const cellElements = [...document.querySelectorAll("[data-cell='cell']")];
    const cellElementsMatrix = cellElements.map( item => item.classList.contains(`cell_click`));
    return cellElementsMatrix.every((item, index) => {
        return item === model[index];
    })
}

function counter() {
    const counterElement = document.getElementById("counter");
    const newCounts = +counterElement.textContent + 1;
    counterElement.textContent = newCounts;
}

function win(){
    stopTimer();
    createModalWin();
    setResults();
    sound("./assets/win.mp3");
}