export function sound(src){
    const audio = new Audio();
    audio.src = src;
    audio.play(); 
}