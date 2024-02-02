import {closeModal} from "./creators.js";

export function getResults() {
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal_inner modal_bg">
    <span class="X">X</span>
    <ul class="list">
    </ul>
    </div>
    `
    document.body.append(modal);
    document.body.style.overflowY = "hidden";

    const list = modal.querySelector(".list");
    let results = JSON.parse(localStorage.getItem("results"));
    if(!results || results.length === 0) {
        const li = document.createElement("LI");
        li.classList.add("list_item");
        li.textContent = "There are no victories! Play the game!";
        list.append(li);
    } else {
        results.forEach((item, index) => {
            const li = document.createElement("LI");
            li.classList.add("list_item");
            li.innerHTML = `${index + 1}) ${item}`;
            list.append(li);
        });
    }

    const cross = modal.querySelector("span");
    cross.addEventListener("click", closeModal);
}

export function setResults() {
    let results = JSON.parse(localStorage.getItem("results"));
    if(!results) results = [];
    const level = localStorage.getItem("levelID");
    const name = localStorage.getItem("modelName");
    const time = document.querySelector(".time span").textContent;
    const result = `You have solved <span>${level}</span> nonogram <span>${name}</span> in <span>${time}</span>`;
    results.push(result);
    const resultsSorted = results.sort((a,b) => {
        let secA = +a.slice(-9, -7);
        let secB = +b.slice(-9, -7);
        let minutesA = +a.slice(-12, -10);
        let minutesB = +b.slice(-12, -10);
        if(minutesA !== minutesB) return minutesA - minutesB;
        return secA - secB;

    });
    if(resultsSorted.length > 5) {
        resultsSorted.pop();
    }
    const resultsJSON = JSON.stringify(resultsSorted);
    localStorage.setItem("results", resultsJSON);
}