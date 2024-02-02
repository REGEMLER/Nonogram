import {timer, stopTimer} from "./timers.js";

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
}

export function load() {
    stopTimer();
    const model = JSON.parse(localStorage.getItem("savedModel"));
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