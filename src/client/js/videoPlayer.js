const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currenttime = document.getElementById("currenttime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeTemp = 0.5;
video.volume = volumeTemp;

const handlePlay = (e) => {
    
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
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

const formatTime = (second) => {
    return new Date(second * 1000).toISOString().substring(11,19);
}
const handleTotalTime = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
}

const handleCurrentTime = () => {
    currenttime.innerText = formatTime(Math.ceil(video.currentTime));
    timeline.value = Math.ceil(video.currentTime);
}

const handleTimelineChange = (e) => {
    const { target: { value } } = e;
    video.currentTime = value;
}

const handleToggleFullScreen = () => {
    const fullScreenYn = document.fullscreenElement;
    if (fullScreenYn) {
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    }
}

const hideControls = () => {
    videoControls.classList.remove("showing");
}

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
}
const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000)
}

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleCurrentTime);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleToggleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
