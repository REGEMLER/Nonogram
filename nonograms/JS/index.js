import {createField, fullField, createWrapper, createModalLevel, createModalNonogram} from "./functions/creators.js";
import {createTheme, setTheme} from "./functions/themes.js";
import {setLevel, createModel} from "./functions/params.js";
import {onContextMenu, onClick, reset, random, sound, showSolution} from "./functions/events.js";
import {stopTimer} from "./functions/timers.js";
import {getResults} from "./functions/results.js";
import {save, load} from "./functions/save.js";



function startGame(levelID = "easy", nonogram = "tower"){
    stopTimer();
    const level = setLevel(levelID);
    const clues = createModel(nonogram);
    localStorage.setItem("levelID", levelID);

    const topNumbers = clues[0];
    const leftNumbers = clues[1];

    createWrapper();
    createField(topNumbers.length / level, topNumbers.length / level + level);
    fullField(topNumbers, leftNumbers);

    createTheme();

    const wrapper = document.querySelector(".wrapper");
    
    wrapper.addEventListener("contextmenu", onContextMenu);

    //game process
    wrapper.addEventListener("click", (event) => {
        if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
        onClick(event);
    });

    //start new game
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "new") return;
        event.stopPropagation();
        createModalLevel();
        sound("./assets/btn.mp3");
    });


    //select level and go to select picture
    document.body.addEventListener("click", (event) => {
        if(event.target.id !== "easy" && event.target.id !== "medium" && event.target.id !== "hard") return;
        event.stopPropagation();
        const oldModal = document.querySelector(".modal");
        if(oldModal) oldModal.remove();
        localStorage.setItem("levelID", event.target.id);
        createModalNonogram(event.target.id);
        sound("./assets/btn.mp3");
    });

    //select picture and start new game
    document.body.addEventListener("click", (event) => {
        if(!event.target.dataset.nonogram) return;
        event.stopPropagation();
        const oldModal = document.querySelector(".modal");
        if(oldModal) oldModal.remove();
        document.body.style.overflowY = "";
        const level = localStorage.getItem("levelID");
        sound("./assets/btn.mp3");
        startGame(level, event.target.id);
    });

    //reset
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "reset") return;
        event.stopPropagation();
        sound("./assets/btn.mp3");
        reset();
    });

    //random
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "random") return;
        event.stopPropagation();
        const {levelID, name} = random();
        localStorage.setItem("levelID", levelID);
        sound("./assets/btn.mp3");
        startGame(levelID, name);
    });

    //change theme
    wrapper.addEventListener("click", (event) => {
        if(!event.target.classList.contains("theme") &&
        !event.target.parentElement.classList.contains("theme")) return;
        sound("./assets/light.mp3");
        setTheme();
    });

    //show solution
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "solution") return;
        sound("./assets/sad.mp3");
        showSolution();
        stopTimer();
    });

    //show results
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "results") return;
        sound("./assets/fin.mp3");
        getResults()
    });

    //save game
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "save") return;
        sound("./assets/btn.mp3");
        save();
    });

    //load game
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "load") return;
        sound("./assets/btn.mp3");
        load();
    });
}
startGame("easy", "cross");

