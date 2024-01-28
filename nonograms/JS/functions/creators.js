export function createField(numberHelpers, size, themeShema, THEME) {
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

export function createWrapper(themeShema, THEME) {
    const oldWrapper = document.querySelector(".wrapper");
    if(oldWrapper) oldWrapper.remove();
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
        <div id="new" class="button ${themeShema[THEME].button}">New game</div>
        <div id="reset" class="button ${themeShema[THEME].button}">Reset</div>
        <div class="button ${themeShema[THEME].button}">Random game</div>
        <div class="button ${themeShema[THEME].button}">Continue</div>
        <div class="button ${themeShema[THEME].button}">Solution</div>
        <div class="button ${themeShema[THEME].button}">Save game</div>
        <div class="button ${themeShema[THEME].button}">Results</div>
    </div>
    `
    document.body.append(wrapper);
}

export function createModalLevel(themeShema, THEME){
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal_inner">
    <span>X</span>
    <div id="easy" class="button ${themeShema[THEME].button}">Easy</div>
    <div id="medium" class="button ${themeShema[THEME].button}">Medium</div>
    <div id="hard" class="button ${themeShema[THEME].button}">Hard</div>
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";
    const cross = modal.querySelector("span");
    cross.addEventListener("click", (e) => {
        e.stopPropagation()
        const modal = document.querySelector(".modal");
        modal.remove();
        document.body.style.overflowY = "";
    });
}

export function createModalNonogram(levelID, themeShema, THEME) {
    localStorage.setItem("levelID", levelID);
    const oldModal = document.querySelector(".modal");
    oldModal.remove();
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    let str = "";
    if(levelID ==="easy") {
        str = `
        <div id="tower" data-nonogram="true" class="button ${themeShema[THEME].button}">Tower</div>
        <div id="cross" data-nonogram="true" class="button ${themeShema[THEME].button}">Cross</div>
        <div id="skull" data-nonogram="true" class="button ${themeShema[THEME].button}">Skull</div>
        <div id="bat" data-nonogram="true" class="button ${themeShema[THEME].button}">Bat</div>
        <div id="tree" data-nonogram="true" class="button ${themeShema[THEME].button}">Tree</div>
        `
    } else if(levelID === "medium") {
        str = `
        <div id="question" data-nonogram="true" class="button ${themeShema[THEME].button}">Question</div>
        <div id="snail" data-nonogram="true" class="button ${themeShema[THEME].button}">Snail</div>
        <div id="music" data-nonogram="true" class="button ${themeShema[THEME].button}">Music</div>
        <div id="mouse" data-nonogram="true" class="button ${themeShema[THEME].button}">Mouse</div>
        <div id="cherry" data-nonogram="true" class="button ${themeShema[THEME].button}">Cherry</div>
        `
    } else {
        str = `
        <div id="home" data-nonogram="true" class="button ${themeShema[THEME].button}">Home</div>
        <div id="clover" data-nonogram="true" class="button ${themeShema[THEME].button}">Clover</div>
        <div id="spades"  data-nonogram="true" class="button ${themeShema[THEME].button}">Spades</div>
        <div id="dolphin" data-nonogram="true" class="button ${themeShema[THEME].button}">Dolphin</div>
        <div id="deer" data-nonogram="true" class="button ${themeShema[THEME].button}">Deer</div>
        `
    }

    modal.innerHTML = `
    <div class="modal_inner">
    <span>X</span>
    ${str}
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";
    const cross = modal.querySelector("span");
    cross.addEventListener("click", (e) => {
        e.stopPropagation()
        const modal = document.querySelector(".modal");
        modal.remove();
        document.body.style.overflowY = "";
    });
}