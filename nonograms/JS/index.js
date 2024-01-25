import {tower, towerLeft, towerTop} from "./Models/Easy/tower.js";
import {cross, crossLeft, crossTop} from "./Models/Easy/cross.js";
import {skull, skullLeft, skullTop} from "./Models/Easy/skull.js";
import {bat, batLeft, batTop} from "./Models/Easy/bat.js";
import {tree, treeLeft, treerTop} from "./Models/Easy/tree.js";
import {question, questionLeft, questionTop} from "./Models/Medium/question.js";
import {snail, snailLeft, snailTop} from "./Models/Medium/snail.js";
import { music, musicLeft, musicTop} from "./Models/Medium/music.js";
import {mouse, mouseLeft, mouseTop} from "./Models/Medium/mouse.js";
import {cherry, cherryLeft, cherryTop} from "./Models/Medium/cherry.js";
import {home, homeLeft, homeTop} from "./Models/Hard/home.js";
import {clover, cloverLeft, cloverTop} from "./Models/Hard/clover.js";
import {spades, spadesLeft, spadesTop} from "./Models/Hard/spades.js";
import {dolphin, dolphinLeft, dolphinTop} from "./Models/Hard/dolphin.js";
import {deer, deerLeft, deerTop} from "./Models/Hard/deer.js";

const model = [...mouse];
const leftNumbers = [...mouseLeft];
const topNumbers = [...mouseTop];
const level = 10;

let THEME = "light";

const themeShema = {
    light : {
        bg : "bg_light",
        text : "text_light",
        button : "btn_light",
        cell : "bg_cell_light",
        cellClick : "cell_click_light",
        clue : "clue_light"
    },
    dark : {
        bg : "bg_dark",
        text : "text_dark",
        button : "btn_dark",
        cell : "bg_cell_dark",
        cellClick : "cell_click_dark",
        clue : "clue_dark"
    },
}

function toggleTheme(event) {
    if(!event.target.classList.contains("theme") && !event.target.parentElement.classList.contains("theme") ) return;
    alert("erger")
}
document.body.addEventListener("click", toggleTheme);

function createModal(){
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal_inner">
    <span>X</span>
    <div class="button ${themeShema[THEME].button}">New game</div>
    <div class="button ${themeShema[THEME].button}">Random game</div>
    <div class="button ${themeShema[THEME].button}">Continue</div>
    <div class="button ${themeShema[THEME].button}">Solution</div>
    <div class="button ${themeShema[THEME].button}">Save game</div>
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";
    const cross = modal.querySelector("span");
    cross.addEventListener("click", (e) => {
        e.stopPropagation()
        const modal = document.querySelector(".modal");
        modal.remove();
    });
}
document.body.addEventListener("click", createModal)

function createWrapper() {
    const wrapper = document.createElement("DIV");
    wrapper.classList.add("wrapper");
    wrapper.classList.add(`${themeShema[THEME].bg}`);
    wrapper.innerHTML = `
    <div class="theme"><img src="assets/sun.png" alt="sun"></div>
    <h1 class="title ${themeShema[THEME].text}">Welcome to Nonograms</h1>
    <h2 class="subtitle ${themeShema[THEME].text}">Nonograms are picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the edges of the grid to reveal a hidden picture.</h2>
    <div class="game">
        <div class="time ${themeShema[THEME].text}">Time: <span>00:00</span></div>
        <div class="clicks ${themeShema[THEME].text}">Clicks: <span id="counter">0</span></div>
    </div>
    <div class="field">
    </div>
    <div class="buttons">
        <div class="button ${themeShema[THEME].button}">New game</div>
        <div class="button ${themeShema[THEME].button}">Random game</div>
        <div class="button ${themeShema[THEME].button}">Continue</div>
        <div class="button ${themeShema[THEME].button}">Solution</div>
        <div class="button ${themeShema[THEME].button}">Save game</div>
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
    console.log(numberHelpers)
    console.log(size)
    const field = document.querySelector(".field");
    for(let i = 0; i < size; i++) {
        const row = document.createElement("DIV");
        row.classList.add("row");

        for (let j = 0; j < size; j++) {
            const cell = document.createElement("DIV");
            cell.classList.add("cell");

            if (i === numberHelpers - 1) {
                cell.classList.add("row_helper");
            }
            if (j === numberHelpers - 1) {
                cell.classList.add("cell_helper");
            }

            if ((i - numberHelpers + 1) % 5 === 0 && i !== size && i !== numberHelpers - 1) {
                cell.classList.add("row_five");
            }
            if ((j - numberHelpers + 1) % 5 === 0 && j !== numberHelpers - 1 && j !== size) {
                cell.classList.add("cell_five");
            }

            if (i>numberHelpers - 1 && j>numberHelpers - 1) {
                cell.dataset.cell = "cell";
                cell.classList.add(`${themeShema[THEME].cell}`);
            } 
            if (i > numberHelpers - 1 && j <= numberHelpers - 1 ) {
                cell.dataset.cell = "left";
                cell.classList.add("clue");
                cell.classList.add(`${themeShema[THEME].text}`);
                cell.classList.add(`${themeShema[THEME].clue}`);
            } 
            if (i <= numberHelpers - 1  && j > numberHelpers - 1 ) {
                cell.dataset.cell = "top";
                cell.classList.add("clue");
                cell.classList.add(`${themeShema[THEME].text}`);
                cell.classList.add(`${themeShema[THEME].clue}`);
            } 
            if (i <= numberHelpers - 1 && j <= numberHelpers - 1) {
                cell.dataset.cell = "empty";
                cell.classList.add("cell_empty");
            }
            row.append(cell);
        }
        field.append(row);
        fullField();
    }
}

createWrapper();
createField(topNumbers.length / level, topNumbers.length / level + level);

function checkWin() {
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

function onClick(event) {
    if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
    counter();

    if (event.target.classList.contains("cell_click_light")) {
        event.target.classList.remove("cell_click_light");
    } else {
        event.target.classList.add("cell_click_light");
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