const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currenttime = document.getElementById("currenttime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");

let volumeTemp = 0.5;
video.volume = volumeTemp;

const handlePlay = (e) => {
    handleBtnPlay();
    
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

const handleMute = (e) => {
    if(video.muted){
        video.muted = false;
    }else{
        volumeTemp = volumeRange.value;
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeTemp;
}

const handleVolumeChange = (e) => {
    const {target:{value}} = e;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute"
    }
    if(value == 0){
        video.muted = true;
        muteBtn.innerText = "Unmute";
    }
    volumeTemp = value;
    video.volume = volumeTemp;
}

const handleBtnPlay = (e) => {
    playBtn.innerText = video.paused ? "Pause" : "Play";
}

const formatTime = (second) => {
    return new Date(second * 1000).toISOString().substring(11,19);
}
const handleTotalTime = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
}

const handleCurrentTime = () => {
    currenttime.innerText = formatTime(Math.ceil(video.currentTime));
}

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("click", handleBtnPlay);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleCurrentTime);