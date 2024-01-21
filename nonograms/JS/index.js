import {plusModelHelper} from "./models.js";
import {plusModel} from "./models.js";

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
                cell.id = `${i - numberHelpers}-${j - numberHelpers}`;
                cell.dataset.isCell = true;
                cell.textContent = cell.id;
            } else {
                cell.id = `${i}-${j}h`;
                cell.dataset.isCell = false;
                const id = plusModelHelper.find(item => item.id === cell.id);
                if(id) {
                    cell.textContent = id.text;
                }
                // cell.textContent = cell.id;
            }

            if (j === numberHelpers) {
                cell.classList.add("cell_helper");
            }
            if ((j - numberHelpers) % 5 === 0 && j !== numberHelpers && j !== size) {
                cell.classList.add("cell_five");
            }
            if (i < numberHelpers + 1 && j < numberHelpers + 1) {
                cell.classList.add("cell_empty");
            }
            row.append(cell);
        }
        field.append(row);
    }
}
createField(3, 8);


function checkWin(arr) {
    return arr.every(item => item.isGuesed);
}

function checkGuesed(model, arr) {
    model.map((item) => {
        const element = arr.find(i => i.id === item.id);
        if(element.classList.contains("cell_click") && item.isFull ||
        !element.classList.contains("cell_click") && !item.isFull) {
            item.isGuesed = true;
        } else {
            item.isGuesed = false;
        }
    });
    // console.log(model);
}

function counter() {
    const counterElement = document.getElementById("counter");
    const newCounts = +counterElement.textContent + 1;
    counterElement.textContent = newCounts;
}

function onClick(event) {
    if(!event.target.dataset.isCell || event.target.dataset.isCell === "false") return;
    counter();

    if (event.target.classList.contains("cell_click")) {
        event.target.classList.remove("cell_click");
    } else {
        event.target.classList.add("cell_click");
    };

    checkGuesed(plusModel, [...document.querySelectorAll("[data-is-cell='true']")]);
    if(checkWin(plusModel)) console.log("Win")
}

function onContextMenu(event) {
    if(!event.target.dataset.isCell || event.target.dataset.isCell === "false") return;
    event.preventDefault();

    if (event.target.textContent === "X") {
        event.target.textContent = "";
    } else {
        event.target.textContent = "X";
    }

    checkGuesed(plusModel, [...document.querySelectorAll("[data-is-cell='true']")]);
    if(checkWin(plusModel)) console.log("Win")
}

document.body.addEventListener("click", onClick);
document.body.addEventListener("contextmenu", onContextMenu);