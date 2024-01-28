export function sound(src){
    const audio = new Audio();
    audio.src = src;
    console.log(src)
    audio.play(); 
}