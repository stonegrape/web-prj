var playPauseBtn = document.querySelector('.playpause');
var stopBtn = document.querySelector('.stop');
var rwdBtn = document.querySelector('.rwd');
var fwdBtn = document.querySelector('.fwd');
var timeLabel = document.querySelector('.time');
var player = document.querySelector('video');
player.removeAttribute('controls');
playPauseBtn.onclick = function () {
    if(player.paused) {
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
    if(player.currentTime >= player.duration) {
        player.pause();
        player.currentTime = 0;
        playPauseBtn.textContent = 'Play';
    }
};

player.ontimeupdate = function () {
    var minutes = Math.floor(player.currentTime / 60);
    var seconds = Math.floor(player.currentTime - minutes* 60);
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
//解决视频自动播放完成，视频停止playPauseBtn.textContent='pause'的问题 
//issue:此问题未解决
if (player.currentTime = player.duration) {
    playPauseBtn.textContent = 'Play';
}