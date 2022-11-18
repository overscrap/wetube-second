const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handleVideoPlay = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

const handleBtnPause = () => {
    playBtn.innerText = "Play";
}
const handleBtnPlay = () => {
    playBtn.innerText = "Pause";
}
const handleMute = (e) => {

}

playBtn.addEventListener("click", handleVideoPlay);
muteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handleBtnPause)
video.addEventListener("play", handleBtnPlay)
// time.addEventListener("click",)
// volume.addEventListener("click",)