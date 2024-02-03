import {timer, stopTimer} from "./timers.js";
import {closeModal} from "./creators.js";

export function save() {
    const model = JSON.parse(localStorage.getItem("model"));
    const level = localStorage.getItem("levelID");
    const name = localStorage.getItem("modelName");
    const field = document.querySelector(".field").innerHTML;
    const game = document.querySelector(".game").innerHTML;
    localStorage.setItem("savedModel", JSON.stringify(model));
    localStorage.setItem("savedLevel", level);
    localStorage.setItem("savedName", name);
    localStorage.setItem("savedField", field);
    localStorage.setItem("savedGame", game);
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal_inner modal_bg">
    <span class="X">X</span>
    <ul class="list">
        <li class="list_item">The game was successfully saved!</li>
    </ul>
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";
    const cross = modal.querySelector("span");
    cross.addEventListener("click", closeModal);
}

export function load() {
    const model = JSON.parse(localStorage.getItem("savedModel"));
    if(!model) {
        const modal = document.createElement("DIV");
        modal.classList.add("modal");
        modal.innerHTML = `
        <div class="modal_inner modal_bg">
        <span class="X">X</span>
        <ul class="list">
            <li class="list_item">There are no saved games!</li>
        </ul>
        </div>
        `
        document.body.append(modal);
        document.body.style.overflowY = "hidden";
        const cross = modal.querySelector("span");
        cross.addEventListener("click", closeModal);
        return;
    }
    stopTimer();
    const savedLevel = localStorage.getItem("savedLevel");
    const savedName = localStorage.getItem("savedName");
    const innerField = localStorage.getItem("savedField");
    const innerGame = localStorage.getItem("savedGame");
    const field = document.querySelector(".field");
    const game = document.querySelector(".game");
    field.innerHTML = innerField;
    game.innerHTML = innerGame;
    localStorage.setItem("levelID", savedLevel);
    localStorage.setItem("modelName", savedName);
    localStorage.setItem("model", JSON.stringify(model));
    timer();
}