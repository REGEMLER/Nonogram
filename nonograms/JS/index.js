import {createField, fullField, createWrapper, createModalLevel} from "./functions/creators.js";
import {createShema, createTheme} from "./functions/themes.js";
import {setLevel, createModel} from "./functions/params.js";
import {onContextMenu, onClick} from "./functions/events.js";


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
    document.body.addEventListener("click", onClick);
    document.body.addEventListener("contextmenu", onContextMenu);
}

startGame("easy", "cross")

