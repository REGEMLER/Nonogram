import {createField, fullField, createWrapper, createModalLevel, createModalNonogram} from "./functions/creators.js";
import {createTheme, setTheme} from "./functions/themes.js";
import {setLevel, createModel} from "./functions/params.js";
import {onContextMenu, onClick, reset, random, sound, showSolution} from "./functions/events.js";
import {timer, stopTimer} from "./functions/timers.js";
import {getResults} from "./functions/results.js";
import {save, load} from "./functions/save.js";



function startGame(levelID = "easy", nonogram = "tower"){
    const level = setLevel(levelID);
    createModel(nonogram);
    localStorage.setItem("levelID", levelID);


    // Know if i need it, or it is simpler return them from createmodal??????
    const topNumbers = JSON.parse(localStorage.getItem("topNumbers"));
    const leftNumbers = JSON.parse(localStorage.getItem("leftNumbers"));

    createWrapper();
    createField(topNumbers.length / level, topNumbers.length / level + level);
    fullField(topNumbers, leftNumbers);

    createTheme();
    // sound("./assets/start.mp3");

    const wrapper = document.querySelector(".wrapper");
    
    wrapper.addEventListener("contextmenu", onContextMenu);

    //game process
    wrapper.addEventListener("click", (event) => {
        if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
        onClick(event)
    });

    //start new game
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "new") return;
        event.stopPropagation();
        stopTimer();
        createModalLevel();
    });


    //select level and go to select picture
    document.body.addEventListener("click", (event) => {
        if(event.target.id !== "easy" && event.target.id !== "medium" && event.target.id !== "hard") return;
        event.stopPropagation();
        const oldModal = document.querySelector(".modal");
        if(oldModal) oldModal.remove();
        localStorage.setItem("levelID", event.target.id);
        createModalNonogram(event.target.id);
    });

    //select picture and start new game
    document.body.addEventListener("click", (event) => {
        if(!event.target.dataset.nonogram) return;
        event.stopPropagation();
        const oldModal = document.querySelector(".modal");
        if(oldModal) oldModal.remove();
        document.body.style.overflowY = "";
        const level = localStorage.getItem("levelID");
        startGame(level, event.target.id);
    });

    //reset
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "reset") return;
        event.stopPropagation();
        reset();
    });

    //random
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "random") return;
        event.stopPropagation();
        stopTimer();
        const {levelID, name} = random();
        localStorage.setItem("levelID", levelID);
        startGame(levelID, name);
    });

    //change theme
    wrapper.addEventListener("click", (event) => {
        if(!event.target.classList.contains("theme") &&
        !event.target.parentElement.classList.contains("theme")) return;
        setTheme();
    });

    //show solution
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "solution") return;
        showSolution();
        stopTimer();
    });

    //show results
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "results") return;
        getResults()
    });

    //save game
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "save") return;
        save();
    });

    //load game
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "load") return;
        load();
    });
}
startGame("easy", "cross");
