import {towerModelHelper, towerModel} from "./Models/Easy/tower.js";
import {cross, crossLeft, crossTop} from "./Models/Easy/cross.js";
import {skullModelHelper, skullModel} from "./Models/Easy/skull.js";
import {batModelHelper, batModel} from "./Models/Easy/bat.js";
import {treeModelHelper, treeModel} from "./Models/Easy/tree.js";
import {questionModelHelper, questionModel} from "./Models/Medium/question.js";
import {snailModelHelper, snailModel} from "./Models/Medium/snail.js";
import {musicModelHelper, musicModel} from "./Models/Medium/music.js";
import {mouseModelHelper, mouseModel} from "./Models/Medium/mouse.js";
import {cherryModelHelper, cherryModel} from "./Models/Medium/cherry.js";

const model = [...cross];
const topNumbers = [...crossTop];
const leftNumbers = [...crossLeft];

function createWrapper() {
    const wrapper = document.createElement("DIV");
    wrapper.classList.add("wrapper");
    wrapper.classList.add("bg_light");
    wrapper.innerHTML = `
    <div class="theme"><img src="assets/sun.png" alt="sun"></div>
    <h1 class="title text_light">Welcome to Nonograms</h1>
    <h2 class="subtitle text_light">Nonograms are picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the edges of the grid to reveal a hidden picture.</h2>
    <div class="game">
        <div class="time text_light">Time: <span>00:00</span></div>
        <div class="clicks text_light">Clicks: <span id="counter">0</span></div>
    </div>
    <div class="field">
    </div>
    <div class="buttons">
        <div class="button btn_light">New game</div>
        <div class="button btn_light">Random game</div>
        <div class="button btn_light">Continue</div>
        <div class="button btn_light">Solution</div>
        <div class="button btn_light">Save game</div>
    </div>
    `
    document.body.append(wrapper);
}

function fullField() {
    const topElements = [...document.querySelectorAll("[data-cell='top']")];
    topElements.forEach((item,index) => {
        item.textContent = topNumbers[index];
    });
    const leftElements = [...document.querySelectorAll("[data-cell='left']")];
    leftElements.forEach((item,index) => {
        item.textContent = leftNumbers[index];
    });
}

function createField(numberHelpers, size) {
    const field = document.querySelector(".field");
    for(let i = 1; i <= size; i++) {
        const row = document.createElement("DIV");
        row.classList.add("row");

        if (i === numberHelpers) {
            row.classList.add("row_helper");
        }
        if ((i - numberHelpers) % 5 === 0 && i !== size && i !== numberHelpers) {
            row.classList.add("row_five");
        }

        for (let j = 1; j <= size; j++) {
            const cell = document.createElement("DIV");
            cell.classList.add("cell");

            if (i>numberHelpers && j>numberHelpers) {
                cell.dataset.cell = "cell";
            } 
            if (i>=numberHelpers && j <=numberHelpers) {
                cell.dataset.cell = "left";
                cell.classList.add("clue");
            } 
            if (i<=numberHelpers && j>=numberHelpers) {
                cell.dataset.cell = "top";
                cell.classList.add("clue");
            } 
            if (i < numberHelpers + 1 && j < numberHelpers + 1) {
                cell.dataset.cell = "empty";
                cell.classList.add("cell_empty");
            }
            if (j === numberHelpers) {
                cell.classList.add("cell_helper");
            }
            if ((j - numberHelpers) % 5 === 0 && j !== numberHelpers && j !== size) {
                cell.classList.add("cell_five");
            }
            row.append(cell);
        }
        field.append(row);
        fullField();
    }
}

createWrapper();
createField(topNumbers.length / 5, topNumbers.length / 5 + 5);

function checkWin() {
    const cellElements = [...document.querySelectorAll("[data-cell='cell']")];
    const cellElementsMatrix = cellElements.map( item => item.classList.contains("cell_click"));
    return cellElementsMatrix.every((item, index) => {
        return item === model[index];
    })
}

function counter() {
    const counterElement = document.getElementById("counter");
    const newCounts = +counterElement.textContent + 1;
    counterElement.textContent = newCounts;
}

function onClick(event) {
    if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
    counter();

    if (event.target.classList.contains("cell_click")) {
        event.target.classList.remove("cell_click");
    } else {
        event.target.classList.add("cell_click");
    };
    if(checkWin()) console.log("Win")
}

function onContextMenu(event) {
    if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
    event.preventDefault();

    if (event.target.textContent === "X") {
        event.target.textContent = "";
    } else {
        event.target.textContent = "X";
    }
}

document.body.addEventListener("click", onClick);
document.body.addEventListener("contextmenu", onContextMenu);