export function createTheme() {
    let THEME = localStorage.getItem("THEME");
    const hours = new Date().getHours();
    if(hours < 21) {
        THEME = "dark";
    } else {
        THEME = "light";
    }
    localStorage.setItem("THEME", THEME);
    return THEME
}

export function setTheme() {
    let THEME = localStorage.getItem("THEME");
    const link = [...document.head.querySelectorAll("link")][1];
    const img = document.querySelector(".theme img");
    if(THEME === "light") {
        link.setAttribute("href", "styles/dark.css");
        img.src = "assets/moon.png";
        img.alt = "moon";
        THEME = "dark";
    } else {
        link.setAttribute("href", "styles/light.css");
        img.src = "assets/sun.png";
        img.alt = "sun";
        THEME = "light";
    }
    localStorage.setItem("THEME", THEME);
    return THEME;
}

