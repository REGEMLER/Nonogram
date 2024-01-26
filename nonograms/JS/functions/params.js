import {tower, towerLeft, towerTop} from "../Models/Easy/tower.js";
import {cross, crossLeft, crossTop} from "../Models/Easy/cross.js";
import {skull, skullLeft, skullTop} from "../Models/Easy/skull.js";
import {bat, batLeft, batTop} from "../Models/Easy/bat.js";
import {tree, treeLeft, treerTop} from "../Models/Easy/tree.js";
import {question, questionLeft, questionTop} from "../Models/Medium/question.js";
import {snail, snailLeft, snailTop} from "../Models/Medium/snail.js";
import {music, musicLeft, musicTop} from "../Models/Medium/music.js";
import {mouse, mouseLeft, mouseTop} from "../Models/Medium/mouse.js";
import {cherry, cherryLeft, cherryTop} from "../Models/Medium/cherry.js";
import {home, homeLeft, homeTop} from "../Models/Hard/home.js";
import {clover, cloverLeft, cloverTop} from "../Models/Hard/clover.js";
import {spades, spadesLeft, spadesTop} from "../Models/Hard/spades.js";
import {dolphin, dolphinLeft, dolphinTop} from "../Models/Hard/dolphin.js";
import {deer, deerLeft, deerTop} from "../Models/Hard/deer.js";


export function setLevel(levelID) {
    let level = null;
    if(levelID === "hard") {
        level = 15;
    } else if (levelID === "medium") {
        level = 10;
    } else {
        level = 5;
    }
    localStorage.setItem("level", level);
    return level;
}

export function createModel(nonogram){
    let model = null;
    let numbersTop = null;
    let numbersLeft = null;
    switch (nonogram){
        case "tower":
            model = tower;
            numbersTop = towerTop;
            numbersLeft = towerLeft;
            break;
        case "cross":
            model = cross;
            numbersTop = crossTop;
            numbersLeft = crossLeft;
            break;
        case "skull":
            model = skull;
            numbersTop = skullTop;
            numbersLeft = skullLeft;
            break;
        case "bat":
            model = bat;
            numbersTop = batTop;
            numbersLeft = batLeft;
            break;
        case "tree":
            model = tree;
            numbersTop = treerTop;
            numbersLeft = treeLeft;
            break;
        case "question":
            model = question;
            numbersTop = questionTop;
            numbersLeft = questionLeft;
            break;
        case "snail":
            model = snail;
            numbersTop = snailTop;
            numbersLeft = snailLeft;
            break;
        case "music":
            model = music;
            numbersTop = musicTop;
            numbersLeft = musicLeft;
            break;
        case "mouse":
            model = mouse;
            numbersTop = mouseTop;
            numbersLeft = mouseLeft;
            break;
        case "cherry":
            model = cherry;
            numbersTop = cherryTop;
            numbersLeft = cherryLeft;
            break;
        case "home":
            model = home;
            numbersTop = homeTop;
            numbersLeft = homeLeft;
            break;
        case "clover":
            model = clover;
            numbersTop = cloverTop;
            numbersLeft = cloverLeft;
            break;
        case "spades":
            model = spades;
            numbersTop = spadesTop;
            numbersLeft = spadesLeft;
            break;
        case "dolphin":
            model = dolphin;
            numbersTop = dolphinTop;
            numbersLeft = dolphinLeft;
            break;
        case "deer":
            model = deer;
            numbersTop = deerTop;
            numbersLeft = deerLeft;
            break;
        default:
            model = tower;
            numbersTop = towerTop;
            numbersLeft = towerLeft;    
    }
    setModel(model);
    setModelTop(numbersTop);
    setModelLeft(numbersLeft);
}

function setModel(modelID){
    const model = modelID;
    const localModele = JSON.stringify(model);
    localStorage.setItem("model", localModele);
    return model;

}
function setModelTop(modelID){
    const model = modelID;
    const localModele = JSON.stringify(model);
    localStorage.setItem("topNumbers", localModele);
    return model;
}

function setModelLeft(modelID){
    const model = modelID;
    const localModele = JSON.stringify(model);
    localStorage.setItem("leftNumbers", localModele);
    return model;
}