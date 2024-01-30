import {timer, stopTimer} from "./timers.js";

export function createField(numberHelpers, size) {
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
                cell.classList.add(`bg_cell`);
            } 
            if (i > numberHelpers - 1 && j <= numberHelpers - 1 ) {
                cell.dataset.cell = "left";
                cell.classList.add("clue");
                cell.classList.add(`text`);
                cell.classList.add(`clue_bg`);
            } 
            if (i <= numberHelpers - 1  && j > numberHelpers - 1 ) {
                cell.dataset.cell = "top";
                cell.classList.add("clue");
                cell.classList.add(`text`);
                cell.classList.add(`clue_bg`);
            } 
            if (i <= numberHelpers - 1 && j <= numberHelpers - 1) {
                cell.dataset.cell = "empty";
                cell.classList.add("cell_empty");
            }
            row.append(cell);
        }
        field.append(row);
    }
}

export function fullField(topNumbers, leftNumbers) {
    const topElements = [...document.querySelectorAll("[data-cell='top']")];
    topElements.forEach((item,index) => {
        item.textContent = topNumbers[index];
    });
    const leftElements = [...document.querySelectorAll("[data-cell='left']")];
    leftElements.forEach((item,index) => {
        item.textContent = leftNumbers[index];
    });
}

export function createWrapper() {
    const oldWrapper = document.querySelector(".wrapper");
    if(oldWrapper) oldWrapper.remove();
    const wrapper = document.createElement("DIV");
    wrapper.classList.add("wrapper");
    wrapper.classList.add(`bg`);
    wrapper.innerHTML = `
    <div class="theme"><img src="assets/sun.png" alt="sun"></div>
    <h1 class="title text">Welcome to Nonograms</h1>
    <h2 class="subtitle text">Nonograms are picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the edges of the grid to reveal a hidden picture.</h2>
    <div class="game">
        <div class="time text">Time: <span>00:00</span></div>
        <div class="clicks text">Clicks: <span id="counter">0</span></div>
    </div>
    <div class="field">
    </div>
    <div class="buttons">
        <div id="new" class="button btn">New game</div>
        <div id="reset" class="button btn">Reset</div>
        <div id="random" class="button btn">Random game</div>
        <div class="button btn">Continue</div>
        <div class="button btn">Solution</div>
        <div class="button btn">Save game</div>
        <div class="button btn">Results</div>
    </div>
    `
    document.body.append(wrapper);
}

function closeModal(event) {
    event.stopPropagation()
    const modal = document.querySelector(".modal");
    modal.remove();
    document.body.style.overflowY = "";
    timer();
}

export function createModalLevel(){
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal_inner modal_bg">
    <span>X</span>
    <div id="easy" class="button btn">Easy</div>
    <div id="medium" class="button btn">Medium</div>
    <div id="hard" class="button btn">Hard</div>
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";
    const cross = modal.querySelector("span");
    cross.addEventListener("click", closeModal);
}

export function createModalNonogram(levelID) {
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    let str = "";
    if(levelID ==="easy") {
        str = `
        <div id="tower" data-nonogram="true" class="button btn">Tower</div>
        <div id="cross" data-nonogram="true" class="button btn">Cross</div>
        <div id="skull" data-nonogram="true" class="button btn">Skull</div>
        <div id="bat" data-nonogram="true" class="button btn">Bat</div>
        <div id="tree" data-nonogram="true" class="button btn">Tree</div>
        `
    } else if(levelID === "medium") {
        str = `
        <div id="question" data-nonogram="true" class="button btn">Question</div>
        <div id="snail" data-nonogram="true" class="button btn">Snail</div>
        <div id="music" data-nonogram="true" class="button btn">Music</div>
        <div id="mouse" data-nonogram="true" class="button btn">Mouse</div>
        <div id="cherry" data-nonogram="true" class="button btn">Cherry</div>
        `
    } else {
        str = `
        <div id="home" data-nonogram="true" class="button btn">Home</div>
        <div id="clover" data-nonogram="true" class="button btn">Clover</div>
        <div id="spades"  data-nonogram="true" class="button btn">Spades</div>
        <div id="dolphin" data-nonogram="true" class="button btn">Dolphin</div>
        <div id="deer" data-nonogram="true" class="button btn">Deer</div>
        `
    }

    modal.innerHTML = `
    <div class="modal_inner modal_bg">
    <span>X</span>
    ${str}
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";
    const cross = modal.querySelector("span");
    cross.addEventListener("click", closeModal);
}

export function createModalWin() {
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    const span = document.querySelector(".time span");
    const text = span.textContent;
    const minutes = +text.slice(0,2);
    const seconds = +text.slice(3);
    const result = minutes * 60 + seconds;
    const name = localStorage.getItem("modelName");
    modal.innerHTML = `
    <div class="modal_inner modal_bg">
    <span>X</span>
    <p class="text_win">
    Great! You have solved the nonogram <span>${name}</span> in <span>${result}</span> seconds!
    </p>
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";
    modal.addEventListener("click", (event)=> {
        event.stopPropagation()
        const modal = document.querySelector(".modal");
        modal.remove();
        document.body.style.overflowY = "";
    });
}