import {createField, fullField, createWrapper, createModalLevel, createModalNonogram} from "./functions/creators.js";
import {createTheme, setTheme} from "./functions/themes.js";
import {setLevel, createModel} from "./functions/params.js";
import {onContextMenu, onClick, reset, random} from "./functions/events.js";
import {timer, stopTimer} from "./functions/timers.js";
import {sound} from "./functions/sounds.js";


function startGame(levelID = "easy", nonogram = "tower"){
    const level = setLevel(levelID);
    createModel(nonogram);

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
        createModalLevel();
        stopTimer();
    });


    //select level and go to select picture
    document.body.addEventListener("click", (event) => {
        if(event.target.id !== "easy" && event.target.id !== "medium" && event.target.id !== "hard") return;
        event.stopPropagation();
        createModalNonogram(event.target.id);
    });

    //select picture and start new game
    document.body.addEventListener("click", (event) => {
        if(!event.target.dataset.nonogram) return;
        event.stopPropagation();
        const oldModal = document.querySelector(".modal");
        oldModal.remove();
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
        startGame(levelID, name);
    });

    //change theme
    wrapper.addEventListener("click", (event) => {
        if(!event.target.classList.contains("theme") &&
        !event.target.parentElement.classList.contains("theme")) return;
        setTheme();
    });
}
startGame("easy", "cross");
