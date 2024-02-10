// Sample song data with image and audio paths
const songs = [
  { name: "Yesterday Is Gone", artist: "Caleb Gordon", audio: "audio/Yesterday Is Gone.mp3", image: "image/Yesterday Is Gone.png" },
  { name: "Yes Indeed", artist: "Drake", audio: "audio/Yes Indeed.mp3", image: "image/Yes Indeed.png" },
  { name: "Thunderstruck", artist: "AC/DC", audio: "audio/Thunderstruck.mp3", image: "image/Thunderstruck.png" },
  { name: "Runaway", artist: "Kanye West", audio: "audio/Runaway.mp3", image: "image/Runaway.png" },
  { name: "Popular", artist: "The Weeknd", audio: "audio/Popular.mp3", image: "image/Popular.png" },
  { name: "Notice Me", artist: "PNB Rock", audio: "audio/Notice Me.mp3", image: "image/Notice Me.png" },
  { name: "Matt Hardy 999", artist: "Juice WRLD", audio: "audio/Matt Hardy 999.mp3", image: "image/Matt Hardy 999.png" },
  { name: "Jugaste y Sufri", artist: "Eslabon", audio: "audio/Jugaste y Sufri.mp3", image: "image/Jugaste y Sufri.png" },
  { name: "I Wouldn't Mind", artist: "He Is We", audio: "audio/I Wouldn't Mind.mp3", image: "image/I Wouldn't Mind.png" },
  { name: "I Miss You", artist: "Blink-182", audio: "audio/I Miss You.mp3", image: "image/I Miss You.png" },
  { name: "I Don't Like", artist: "Kanye West, Chief Keef, Pusha T, Big Sean & Jadakiss", audio: "audio/I Don't Like.mp3", image: "image/I Don't Like.png" },
  { name: "Hail to the King", artist: "Avenged Sevenfold", audio: "audio/Hail to the King.mp3", image: "image/Hail to the King.png" },
  { name: "Girls Need Love", artist: "Summer Walker", audio: "audio/Girls Need Love.mp3", image: "image/Girls Need Love.png" },
  { name: "Gang With Me", artist: "YoungBoy Never Broke Again", audio: "audio/Gang With Me.mp3", image: "image/Gang With Me.png" },
  { name: "Solo", artist: "Future", audio: "audio/Solo.mp3", image: "image/Solo.png" },
  { name: "Everybody", artist: "Nicki Minaj", audio: "audio/Everybody.mp3", image: "image/Everybody.png" },
  { name: "Drawing Symbols", artist: "NBA YoungBoy", audio: "audio/Drawing Symbols.mp3", image: "image/Drawing Symbols.png" },
  { name: "Dragula", artist: "Rob Zombie", audio: "audio/Dragula.mp3", image: "image/Dragula.png" },
  { name: "Cooler Than Me", artist: "Mike Posner", audio: "audio/Cooler Than Me.mp3", image: "image/Cooler Than Me.png" },
  { name: "Cha Cha", artist: "Zeddy Will", audio: "audio/Cha Cha.mp3", image: "image/Cha Cha.png" },
  { name: "Bring The Hook", artist: "YoungBoy Never Broke Again", audio: "audio/Bring The Hook.mp3", image: "image/Bring The Hook.png" },
  { name: "Brainstew", artist: "Green Day", audio: "audio/Brainstew.mp3", image: "image/Brainstew.png" }
];

// Global variables to track the currently playing audio and its controls
let currentAudio = null;
let playBtn = document.querySelector('.control-buttons button:nth-child(2)');
let progressBar = document.querySelector('.progress');
let volumeSlider = document.querySelector('.volume-slider');
let currentSongIndex = 0; // Keep track of the current song index

// Function to populate the song list
function populateSongList(songsToDisplay) {
  const songList = document.querySelector('.song-list');
  songList.innerHTML = '';
  songsToDisplay.forEach(song => {
    const songItem = document.createElement('div');
    songItem.classList.add('song');
    songItem.innerHTML = `
      <img src="${song.image}" alt="${song.name}">
      <div class="song-details">
        <strong>${song.name}</strong> - ${song.artist}
      </div>
    `;
    songItem.addEventListener('click', () => {
      // Play the audio associated with the clicked song
      playAudio(song.audio);
      currentSongIndex = songs.indexOf(song); // Update the current song index
    });
    songList.appendChild(songItem);
  });
}

// Function to filter songs based on search input
function filterSongs(searchTerm) {
  const filteredSongs = songs.filter(song => {
    const songName = song.name.toLowerCase();
    const artistName = song.artist.toLowerCase();
    return songName.includes(searchTerm) || artistName.includes(searchTerm);
  });

  populateSongList(filteredSongs);
}

// Event listener for search bar input
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  filterSongs(searchTerm);
});

// Function to play audio
function playAudio(audioSrc) {
  // Pause the current audio if it's playing
  if (currentAudio) {
    currentAudio.pause();
  }
  // Create and play the new audio
  currentAudio = new Audio(audioSrc);
  currentAudio.play();
  // Update controls
  updateControls();
}

// Function to update controls based on the current audio state
function updateControls() {
  if (currentAudio.paused) {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  currentAudio.ontimeupdate = () => {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.style.width = progress + '%';
  }
}

// Function to toggle play/pause
function togglePlay() {
  if (currentAudio.paused) {
    currentAudio.play();
  } else {
    currentAudio.pause();
  }
  updateControls();
}

// Function to skip backward
function skipBackward() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Move to the previous song
  playAudio(songs[currentSongIndex].audio);
}

// Function to skip forward
function skipForward() {
  currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song
  playAudio(songs[currentSongIndex].audio);
}

// Function to change volume
function changeVolume(value) {
  currentAudio.volume = value / 100;
}

// Function to handle scrubbing through the song
function handleScrubbing() {
  const scrubTime = (volumeSlider.value / 100) * currentAudio.duration;
  currentAudio.currentTime = scrubTime;
}

// Function to open the request form
function openRequestForm() {
  window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfASN8B8Aq2qtVJo_a7mzfPkaEejPEigo61zD9gaG_c2W0ihA/viewform?embedded=true";
}

// Call the function to populate the song list initially
populateSongList(songs);