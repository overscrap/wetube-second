const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volumeRange");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeTemp = 0.5;
video.volume = volumeTemp;

const handlePlayAndStop = (e) => {
    
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
    currentTime.innerText = formatTime(Math.ceil(video.currentTime));
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

const handleKeyUp = (event) => {
    const fullScreenYn = document.fullscreenElement;
  
    if (event.code === "Space") {
      handlePlayAndStop();
    } else if (event.code === "KeyF") {
      if (fullScreenYn === null) {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
      }
    } else if (event.code === "Escape") {
      if (fullScreenYn !== null) {
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen";
      }
    }

    if (event.code === "ArrowUp") {
        if(document.activeElement.id != "timeline"){
            if (video.volume < 1) {
                video.volume = (Math.floor(video.volume * 10) + 1) / 10;
                volumeRange.value = (Math.floor(volumeRange.value * 10) + 1) / 10;
            }
            if(video.muted){
                video.muted = false;
                muteBtn.innerText = "Mute"
            }
        }
    } else if (event.code === "ArrowDown") {
        if(document.activeElement.id != "timeline"){
            if (video.volume > 0) {
                video.volume = (Math.floor(video.volume * 10) - 1) / 10;
                volumeRange.value = (Math.floor(volumeRange.value * 10) - 1) / 10;
            }

            if(video.volume == 0){
                video.muted = true;
                muteBtn.innerText = "Unmute";
            }
        }
    }
    if (event.code === "ArrowRight") {
        if(document.activeElement.id != "volumeRange"){
            video.currentTime = video.currentTime + 5;
        }
    } else if (event.code === "ArrowLeft") {
        if(document.activeElement.id != "volumeRange"){
            video.currentTime = video.currentTime - 5;
        }
    }
};

playBtn.addEventListener("click", handlePlayAndStop);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleCurrentTime);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleToggleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keyup", handleKeyUp);
