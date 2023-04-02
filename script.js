const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");

// let songHtmlFormat = `<source src=${playlist[0].src} type="audio/mpeg" />`;

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

controlIcon.addEventListener("click", playPause);
function playPause() {
  if (controlIcon.classList.contains("bi-pause-circle")) {
    song.pause();
    controlIcon.classList.remove("bi-pause-circle");
    controlIcon.classList.add("bi-play-circle");
  } else {
    song.play();
    controlIcon.classList.add("bi-pause-circle");
    controlIcon.classList.remove("bi-play-circle");
  }
}
if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}
progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  controlIcon.classList.add("bi-pause-circle");
  controlIcon.classList.remove("bi-play-circle");
};

const playlist = [
  {
    src: "./media/Kol Dodi.mp3",
    name: "קול דודי",
    image: "./media/maxresdefault.jpg",
    Description: "קול דודי | קובי ברומר",
  },
  {
    src: "./media/Yehudi.mp3",
    name: "יהודי",
    image: "./media/Yehudimg.jpg",
    Description: "יהודי | קובי ברומר",
  },
  {
    src: "./media/Manginat Halev.mp3",
    name: "מנגינת הלב",
    image: "./media/hqdefault.jpg",
    Description: "מנגינת הלב | קובי ברומר",
  },
];
let currentSongIndex = 0;
const songTitle = document.getElementById("song-title");
const songDescription = document.getElementById("songDescription");

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
  }
  song.src = playlist[currentSongIndex].src;
  songTitle.innerText = playlist[currentSongIndex].name;
  sonGimg.setAttribute("src", playlist[currentSongIndex].image);
  songDescription.innerText = "";
  songDescription.innerText = playlist[currentSongIndex].Description;
  song.play();
}
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1;
  }
  song.src = playlist[currentSongIndex].src;
  songTitle.innerText = playlist[currentSongIndex].name;
  sonGimg.setAttribute("src", playlist[currentSongIndex].image);
  songDescription.innerText = "";
  songDescription.innerText = playlist[currentSongIndex].Description;
  song.play();
}
document.getElementById("next-button").addEventListener("click", nextSong);
document.getElementById("prev-button").addEventListener("click", prevSong);

/* <i class="bi bi-pause-circle"></i> */
