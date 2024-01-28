import {createField, fullField, createWrapper, createModalLevel, createModalNonogram} from "./functions/creators.js";
import {createShema, createTheme} from "./functions/themes.js";
import {setLevel, createModel} from "./functions/params.js";
import {onContextMenu, onClick, reset} from "./functions/events.js";
import {timer, stopTimer} from "./functions/timers.js";


function startGame(levelID = "easy", nonogram = "tower"){
    const level = setLevel(levelID);
    createModel(nonogram);

    const topNumbers = JSON.parse(localStorage.getItem("topNumbers"));
    const leftNumbers = JSON.parse(localStorage.getItem("leftNumbers"));

    const themeShema = createShema();
    const THEME = createTheme();

    createWrapper(themeShema, THEME);
    createField(topNumbers.length / level, topNumbers.length / level + level, themeShema, THEME);

    fullField(topNumbers, leftNumbers);

    const wrapper = document.querySelector(".wrapper");
    
    wrapper.addEventListener("contextmenu", onContextMenu);

    //game process
    wrapper.addEventListener("click", (event) => {
        if(!event.target.dataset.cell || event.target.dataset.cell !== "cell") return;
        onClick(themeShema, THEME, event)
    });

    //start new game
    wrapper.addEventListener("click", (event) => {
        if(event.target.id !== "new") return;
        event.stopPropagation();
        createModalLevel(themeShema, THEME);
        stopTimer();
    });


    //select level and go to select picture
    document.body.addEventListener("click", (event) => {
        if(event.target.id !== "easy" && event.target.id !== "medium" && event.target.id !== "hard") return;
        event.stopPropagation();
        createModalNonogram(event.target.id, themeShema, THEME);
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
        reset(themeShema, THEME);
    });
}

startGame("easy", "cross");


