// Used https://www.youtube.com/watch?v=KndQpfPkOOY

const // image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
prevBtn = document.getElementById('prev'),
nextBtn= document.getElementById('next'),
pauseBtn = document.getElementById('pause'),
playBtn = document.getElementById('play'),
currentTimeEl = document.getElementById('curr-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
songNum = document.getElementById('song-num')
playerProgress = document.getElementById('music-progress');

const music  = new Audio();

const songs = [
    {
        path: 'resources/nicos nextbots ost - shop.mp3',
        displayName: 'shop',
        //cover: 'resources/nicopaddyshop.jpg',
        artist: 'Nicopaddy',
    },
    {
        path: 'resources/my thoughts are stored on a USB drive.mp3',
        displayName: 'my thoughts are stored on a USB drive',
        //cover: 'resources/usbDriveOverscorn.jpg',
        artist: 'Overscorn',
    },
    {
        path: 'resources/alpine racer.mp3',
        displayName: 'Alpine Racer',
        //cover: 'resources/alpineRacerProloxx.jpg',
        artist: 'Proloxx',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if(isPlaying){
        pauseMusic();
    }
    else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;

    // Replaces the fontawesome icons w/ the class names pause and play.
    playBtn.classList.replace('fa-play', 'fa-pause');
    
    // Cool hover
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;

    // Replaces the fontawesome icons w/ the class names pause and play.
    playBtn.classList.replace('fa-pause', 'fa-play'); // fa-play is a class and it's replaced with fa-pause which is just the other fontawesome icon.
    
    // Cool hover
    playBtn.setAttribute('title', 'Play'); //??? why do???
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    songNum.textContent = `${musicIndex + 1} of ${songs.length}`;
    //image.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length; // Make sure the index stays within the amt of songs.
    /* 
    if (direction = 1)
        musicIndex++;
    else if (direction = -1)
        musicIndex--;*/ 
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime } = music; 
    const progressPercent = (currentTime / duration) * 100; 
    progress.style.width = `${progressPercent}%`; // embed that thang cuzzo

    // Time is rounded down to nearest whole number then converted to a string and is given padding at the start 0 
    // if the string is shorter than 1 char long.
    const formatTime = (time) => String(Math.floor(time)).padStart(1, '0');

    // duration / 60 gives us the minutes (is also rounded down by Math.floor in formatTime fn) and the duration % 60 gives us the seconds.
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;  
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`
}

// Changes the time of the music depending on the click.
function setProgressbar(e) {
    const width = playerProgress.clientWidth; // returns playerProgress element's width excluding borders and margins.
    const clickX = e.offsetX; // xCoordinate of the event click.
    // Gives us the position of the click (ie a decimal between 0 and 1) which gives us decimal percentage of the song in decimal form.
    music.currentTime = (clickX / width) * music.duration;
}

loadMusic(songs[musicIndex]);

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressbar);

//console.log(musicIndex);
// console.log(songs[musicIndex].displayName);
//loadMusic(songs[musicIndex]);