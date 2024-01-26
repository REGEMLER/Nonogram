export function createShema() {
    return {
        light : {
            bg : "bg_light",
            text : "text_light",
            button : "btn_light",
            cell : "bg_cell_light",
            cellClick : "cell_click_light",
            clue : "clue_light"
        },
        dark : {
            bg : "bg_dark",
            text : "text_dark",
            button : "btn_dark",
            cell : "bg_cell_dark",
            cellClick : "cell_click_dark",
            clue : "clue_dark"
        },
    }
}

export function createTheme() {
    let THEME = localStorage.getItem("THEME");
    if(THEME === "light") {
        THEME = "dark";
    } else {
        THEME = "light";
    }
    localStorage.setItem("THEME", THEME);
    return THEME
}

function toggleTheme(event) {
    if(!event.target.classList.contains("theme") && !event.target.parentElement.classList.contains("theme") ) return;
    alert("erger")
}