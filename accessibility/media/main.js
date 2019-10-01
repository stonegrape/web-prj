var playPauseBtn = document.querySelector('.playpause');
var stopBtn = document.querySelector('.Stop');
var rwdBtn = document.querySelector('.Rwd');
var fwdBtn = document.querySelector('.fwd');
var timeLabel = document.querySelector('.time');
var player = document.querySelector('video');
console.log('this is rabbit');
player.removeAttribute('controls');
playPauseBtn.onclick = function () {
    if(player.pause) {
        player.play();
        playPauseBtn.textContent = 'Pause';
    }else {
        player.pause();
        playPauseBtn.textContent = 'Play';
    }
};
stopBtn.onclick = function () {
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = 'Play';    
};
rwdBtn.onclick = function () {
    player.currentTime -= 3;
};
fwdBtn.onclick = function () {
    player.currentTime += 3;
    if(player.currentTime >= player.duration || player.pause) {
        player.pause();
        player.currentTime = 0;
        playPauseBtn.textContent = 'Play';
    }
};
player.ontimeupdate = function () {
    var minutes = Math.floor(player.currentTime / 60);
    var seconds = Math.floor((player.currentTime - minutes) / 60);
    var minuteValue;
    var secondValue;
    var mediaTime;
    if (minutes < 10) {
        minuteValue = "0" + minutes;
    }else {
        minuteValue = minutes;
    }
    
    if (seconds < 10) {
        secondValue = "0" + seconds;
    }else {
        secondValue = seconds;
    }
    mediaTime = minuteValue + ":" + secondValue;
    timeLabel.textContent = mediaTime;
}