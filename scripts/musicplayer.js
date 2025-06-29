// Used https://www.youtube.com/watch?v=KndQpfPkOOY

const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
prevBtn = document.getElementById('prev'),
nextBtn= document.getElementById('next'),
pauseBtn = document.getElementById('pause'),
playBtn = document.getElementById('play'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),

const music  = new Audio();

const songs = [
    {
        path: 'resources/nicos nextbots ost - shop.mp3',
        displayName: 'shop',
        cover: 'resources/nicopaddyshop.jpg',
        artist: 'Nicopaddy',
    },
    {
        path: 'resources/my thoughts are stored on a USB drive.mp3',
        displayName: 'my thoughts are stored on a USB drive',
        cover: 'resources/usbDriveOverscorn.jpg',
        artist: 'Overscorn',
    },
    {
        path: 'resources/alpine racer.mp3',
        displayName: 'Alpine Racer',
        cover: 'resources/alpineRacerProloxx.jpg',
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
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;

    // Replaces the fontawesome icons w/ the class names pause and play.
    playBtn.classList.replace('fa-pause', 'fa-play'); // replaces fa-play with fa-pause?
    
    // Cool hover
    playBtn.setAttribute('title', 'pause');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length; // Make sure the index stays within the amt of songs. 
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music; 
    const progressPercent = (currentTime / duration) * 100; 
    progress.style.width = `${progressPercent}%`; // embed that thang cuzzo

    const formatTime = (time) => String(Math.floor(time)).padStart(1, '0');
    durationEl.textContent = `${duration/60}:${formatTime(duration % 60)}`; 
    currentTimeEl.textContent = `${currentTime/60}:${formatTime(currentTime % 60)}`; 
}

