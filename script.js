const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volume-value");
const muteIco = document.getElementById("muteIco");
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

setInterval(() => {
  progress.value = song.currentTime;
  document.getElementById("current-time").textContent = formatTime(
    song.currentTime
  );
}, 500);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

progress.onchange = function () {
  // song.play();
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
song.volume = 1;
volume.oninput = function () {
  song.volume = parseFloat(this.value);
  volume.style.backgroundSize = `${this.value * 100}% 100%`;
  volumeValue.innerText = Math.round(parseFloat(this.value) * 100);
};

function muteIcon() {
  if (song.volume > 0) {
    song.volume = 0;
    muteIco.classList.add("bi-volume-mute");
    muteIco.classList.remove("bi-volume-up");
  } else {
    song.volume = parseFloat(volume.value);
    muteIco.classList.add("bi-volume-up");
    muteIco.classList.remove("bi-volume-mute");
  }
}
muteIco.addEventListener("click", muteIcon);

document.getElementById("next-button").addEventListener("click", nextSong);
document.getElementById("prev-button").addEventListener("click", prevSong);

const playlistElement = document.querySelector(".playlist ul");

playlistElement.innerHTML = "";

// Populate the playlist
playlist.forEach((song, index) => {
  const listItem = document.createElement("li");
  listItem.textContent = song.name;

  // Highlight the currently playing song
  if (index === currentSongIndex) {
    listItem.classList.add("current-song");
  }

  listItem.addEventListener("click", () => {
    currentSongIndex = index;
    playSelectedSong();
  });

  playlistElement.appendChild(listItem);
});

// Function to play the selected song
function playSelectedSong() {
  // Update the audio source
  song.src = playlist[currentSongIndex].src;

  // Update the song title
  songTitle.innerText = playlist[currentSongIndex].name;

  songDescription.innerText = playlist[currentSongIndex].Description;

  song.play();

  const playlistItems = playlistElement.querySelectorAll("li");
  playlistItems.forEach((item, index) => {
    if (index === currentSongIndex) {
      item.classList.add("current-song");
    } else {
      item.classList.remove("current-song");
    }
  });
}
