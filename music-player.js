// music-player.js
class MusicPlayer {
  constructor() {
    this.audio = new Audio('image/background-music.mp3');
    this.audio.volume = 0.3;
    this.audio.loop = true;
    this.isPlaying = false;
    
    this.init();
  }

  init() {
    // Cek state dari localStorage
    const savedState = localStorage.getItem('musicState');
    if (savedState === 'playing') {
      this.play();
    }

    // Buat kontrol musik
    this.createControl();
    
    // Coba auto-play (bekerja di beberapa browser dengan kebijakan tertentu)
    this.tryAutoplay();
  }

  tryAutoplay() {
    const playPromise = this.audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Auto-play prevented, tunggu interaksi user
        this.enableInteractListener();
      });
    }
  }

  enableInteractListener() {
    const playOnInteract = () => {
      if (!this.isPlaying) {
        this.play();
      }
      document.removeEventListener('click', playOnInteract);
      document.removeEventListener('keydown', playOnInteract);
    };

    document.addEventListener('click', playOnInteract);
    document.addEventListener('keydown', playOnInteract);
  }

  createControl() {
    this.control = document.createElement('div');
    this.control.innerHTML = `
      <button id="music-toggle" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(27, 38, 59, 0.8);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 1000;
      ">
        <i class="fas fa-music"></i>
      </button>
    `;
    document.body.appendChild(this.control);
    
    document.getElementById('music-toggle').addEventListener('click', () => this.toggle());
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
    localStorage.setItem('musicState', 'playing');
    this.updateIcon();
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    localStorage.setItem('musicState', 'paused');
    this.updateIcon();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateIcon() {
    const icon = this.isPlaying ? 'fa-music' : 'fa-volume-mute';
    document.querySelector('#music-toggle i').className = `fas ${icon}`;
  }
}

// Inisialisasi ketika DOM siap
document.addEventListener('DOMContentLoaded', () => {
  window.musicPlayer = new MusicPlayer();
});