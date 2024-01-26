import {timer, stopTimer} from "./timers.js";

export function onContextMenu(event) {
    if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
    event.preventDefault();

    if (event.target.textContent === "X") {
        event.target.textContent = "";
    } else {
        event.target.textContent = "X";
    }
}

export function onClick(event) {
    if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
    timer();
    counter();

    if (event.target.classList.contains("cell_click_light")) {
        event.target.classList.remove("cell_click_light");
    } else {
        event.target.classList.add("cell_click_light");
    };
    if(checkWin()) {
        win();
    }
}

function checkWin() {
    const model = JSON.parse(localStorage.getItem("model"));
    const cellElements = [...document.querySelectorAll("[data-cell='cell']")];
    const cellElementsMatrix = cellElements.map( item => item.classList.contains("cell_click_light"));
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
    console.log("Win");
    document.body.removeEventListener("click", onClick);
}