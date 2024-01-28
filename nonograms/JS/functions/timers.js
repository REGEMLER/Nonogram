export function timer(){
    let timerID = null;
    timerID = setInterval( () => {
        let span = document.querySelector(".time span");
        let text = span.textContent;
        let minutes = +text.slice(0,2);
        let seconds = +text.slice(3);
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        if(newSeconds === 60) {
            newMinutes = minutes + 1;
            newSeconds = 0;
        }
        span.textContent = `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
    },1000)
    localStorage.setItem("timerID", timerID);
}
export function stopTimer() {
    const timerID = +localStorage.getItem("timerID");
    clearInterval(timerID);
}