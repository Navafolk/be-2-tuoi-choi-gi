/**
 * Bé 2 Tuổi Chơi Gì? - Interactive Platform Engine
 * 1. Web Audio Synthesizer Engine (Pop, Xylophone, Chimes, Animal calls, TTS)
 * 2. 4 Playable Toddler Games (Bubbles, Animals, Xylophone, Color Match)
 * 3. 50+ Real-life Montessori & Pediatric Game Directory
 * 4. 30-Second Smart Activity Finder, FAQ Accordion & Modals
 */

// ========================================================
// 1. TODDLER SOUND & SPEECH SYNTHESIS ENGINE (WEB AUDIO API)
// ========================================================
class ToddlerAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentVoiceAudio = null;
    this.currentInstrument = "xylo"; // "xylo" | "piano" | "cat"
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.currentVoiceAudio) {
        try {
          this.currentVoiceAudio.pause();
        } catch (e) {}
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
    return !this.isMuted;
  }

  // Bubble pop: rapid frequency upward slide
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 450 + Math.random() * 250;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.4, now + 0.08);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // Knocking door sound (woody percussive thud)
  playKnock() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      [0, 0.12, 0.24].forEach(offset => {
        const now = this.ctx.currentTime + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.06);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
      });
    } catch (e) {}
  }

  // Magnetic snap sound for puzzle
  playSnap() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.1);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  // Route note by active instrument
  playInstrumentNote(freq) {
    if (this.currentInstrument === "piano") {
      this.playPianoNote(freq);
    } else if (this.currentInstrument === "cat") {
      this.playCatMeow(freq);
    } else {
      this.playXyloNote(freq);
    }
  }

  // Xylophone Bell Note
  playXyloNote(freq) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2.76, now);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.95);
      osc2.stop(now + 0.95);
    } catch (e) {}
  }

  // Piano Note (multi-harmonic decay)
  playPianoNote(freq) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = "sine";
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 0.9);
      oscHarmonic.stop(now + 0.9);
    } catch (e) {}
  }

  // Cat Meow Note (frequency-modulated cute whine)
  playCatMeow(freq) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      // Meow glide: starts a bit lower, swoops up, then slopes down
      osc.frequency.setValueAtTime(freq * 0.9, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 0.42);

      // Lowpass filter to soften sawtooth sound like vocal tract
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.48);
    } catch (e) {}
  }

  // Animal calls (Natural Vietnamese onomatopoeia audio)
  playAnimalSound(type) {
    if (this.isMuted) return;
    const cryMap = {
      dog: "audio/sound_cry_dog.mp3",
      cat: "audio/sound_cry_cat.mp3",
      duck: "audio/sound_cry_duck.mp3",
      frog: "audio/sound_cry_frog.mp3",
      cow: "audio/sound_cry_cow.mp3",
      rooster: "audio/sound_cry_rooster.mp3"
    };
    if (cryMap[type]) {
      this.playVoice(cryMap[type], type);
    }
  }

  // Munch sound for eating
  playMunch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    [0, 0.14, 0.28].forEach(offset => {
      const now = this.ctx.currentTime + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(260 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    });
  }

  // Cheer chords
  playCheer() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;
    chords.forEach((freq, idx) => {
      const t = now + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.5);
    });
  }

  // Drum Kit Synthesizers
  playDrumKick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.16);
      gain.gain.setValueAtTime(0.75, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playDrumSnare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(800, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (e) {}
  }

  playDrumCymbal() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(4500, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (e) {}
  }

  playSplash() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [0, 0.05, 0.11].forEach(offset => {
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600 + Math.random() * 300, t);
        osc.frequency.exponentialRampToValueAtTime(250, t + 0.08);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
      });
    } catch (e) {}
  }

  playEggCrack() {
    this.playVoice("audio/egg_tap.mp3", "Cốc cốc!");
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playTrainWhistle() {
    this.playVoice("audio/train_whistle.mp3", "Tu tu xình xịch!");
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [587.33, 739.99].forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      });
    } catch (e) {}
  }

  playNeonChime(index = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
      const freq = pentatonic[Math.abs(index) % pentatonic.length];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {}
  }

  playBlockStack(level = 1) {
    this.playVoice("audio/block_stack.mp3", `Tầng ${level}!`);
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const baseFreq = 220 + level * 42;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.08);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  playTowerCrash() {
    this.playVoice("audio/tower_crash.mp3", "Rầm rụi! Tháp đổ rồi!");
    if (this.isMuted || !this.ctx) return;
    try {
      [0, 0.05, 0.11, 0.18, 0.25].forEach((offset, idx) => {
        const now = this.ctx.currentTime + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(340 - idx * 40, now);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      });
    } catch (e) {}
  }

  // Play Vietnamese voice audio file
  playVoice(audioPath, fallbackText = "") {
    if (this.isMuted) return;
    this.init();

    if (this.currentVoiceAudio) {
      try {
        this.currentVoiceAudio.pause();
        this.currentVoiceAudio.currentTime = 0;
      } catch (e) {}
    }

    if (audioPath) {
      const audio = new Audio(audioPath);
      this.currentVoiceAudio = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          // Fallback only to Vietnamese TTS if available
          this.speakVietnameseOnly(fallbackText);
        });
      }
    } else {
      this.speakVietnameseOnly(fallbackText);
    }
  }

  speakVietnameseOnly(text) {
    if (!text || this.isMuted || !window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang && v.lang.startsWith("vi"));
    if (!viVoice) {
      // Do NOT fallback to English OS voice to prevent broken accents
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = viVoice;
    utter.lang = "vi-VN";
    utter.rate = 0.92;
    utter.pitch = 1.15;
    window.speechSynthesis.speak(utter);
  }
}

const soundEngine = new ToddlerAudioEngine();

// Star praise counter
let babyStarsCount = 0;
function addBabyStars(count = 1, showCelebration = false) {
  babyStarsCount += count;
  const countEl = document.getElementById("kids-stars-count");
  if (countEl) {
    countEl.textContent = babyStarsCount;
    countEl.classList.add("scale-125");
    setTimeout(() => countEl.classList.remove("scale-125"), 250);
  }

  if (showCelebration) {
    if (typeof confetti === "function") {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    soundEngine.playVoice("audio/star_praise.mp3", "Hoan hô bé! Bé nhận được thêm sao vàng rồi!");
  }
}

// ========================================================
// 2. PLAYZONE GAMES CONTROLLERS (10 MASTER TODDLER GAMES)
// ========================================================

// --- A. MASTER PLAYZONE ROUTER ---
function initPlayzone() {
  const tabs = document.querySelectorAll(".kid-game-tab");
  const screens = {
    bubbles: document.getElementById("screen-bubbles"),
    animals: document.getElementById("screen-animals"),
    xylophone: document.getElementById("screen-xylophone"),
    colors: document.getElementById("screen-colors"),
    shadows: document.getElementById("screen-shadows"),
    bath: document.getElementById("screen-bath"),
    egg: document.getElementById("screen-egg"),
    train: document.getElementById("screen-train"),
    neon: document.getElementById("screen-neon"),
    tower: document.getElementById("screen-tower")
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      soundEngine.init();
      tabs.forEach(t => {
        t.classList.remove("active", "border-2", "border-orange-400", "shadow-md");
        t.classList.add("shadow-xs");
      });
      tab.classList.add("active", "border-2", "border-orange-400", "shadow-md");

      const targetGame = tab.getAttribute("data-game");
      Object.keys(screens).forEach(key => {
        if (screens[key]) {
          if (key === targetGame) {
            screens[key].classList.remove("hidden");
          } else {
            screens[key].classList.add("hidden");
          }
        }
      });

      // Special initializations and Vietnamese voice greetings
      if (targetGame === "bubbles") {
        initBubbleGame();
        soundEngine.playVoice("audio/bubble_hint.mp3", "Chạm vào bóng để nổ bốp!");
      } else if (targetGame === "animals") {
        initAnimalGame();
        soundEngine.playVoice("audio/welcome.mp3", "Chào mừng bé đến với nông trại ú òa!");
      } else if (targetGame === "xylophone") {
        initXylophoneGame();
        soundEngine.playVoice("audio/xylo_intro.mp3", "Bé hãy gõ vào các phím đàn cầu vồng nhé!");
      } else if (targetGame === "colors") {
        initColorGame();
      } else if (targetGame === "shadows") {
        initShadowGame();
        soundEngine.playVoice("audio/shadow_intro.mp3", "Bé hãy ghép đồ vật vào đúng bóng đen nhé!");
      } else if (targetGame === "bath") {
        initBathGame();
        soundEngine.playVoice("audio/soap_scrub.mp3", "Bé hãy lấy bọt biển kì cọ sạch cho bạn thú nhé!");
      } else if (targetGame === "egg") {
        initEggGame();
        soundEngine.playVoice("audio/egg_surprise.mp3", "Bé chạm gõ 3 lần vào quả trứng để mở quà nhé!");
      } else if (targetGame === "train") {
        initTrainGame();
        soundEngine.playVoice("audio/train_ready.mp3", "Bé hãy xếp các thùng hàng vào toa tàu cùng màu nhé!");
      } else if (targetGame === "neon") {
        initNeonGame();
        soundEngine.playVoice("audio/sparkle_magic.mp3", "Bé hãy vẽ những vệt sáng cầu vồng rực rỡ nhé!");
      } else if (targetGame === "tower") {
        initTowerGame();
        soundEngine.playVoice("audio/block_stack.mp3", "Bé chạm để xây tháp gỗ thật cao rồi đập đổ nhé!");
      }
    });
  });

  // Audio Mute/Unmute Toggle
  const audioToggleBtn = document.getElementById("playzone-audio-toggle");
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener("click", () => {
      const isAudible = soundEngine.toggleMute();
      const audioIcon = document.getElementById("audio-icon");
      const audioText = document.getElementById("audio-text");
      if (isAudible) {
        audioIcon.innerHTML = `<i class="fa-solid fa-volume-high text-emerald-600 text-base"></i>`;
        audioText.textContent = "Âm Thanh: BẬT";
        audioToggleBtn.classList.replace("bg-rose-100", "bg-amber-100");
        soundEngine.playPop();
        soundEngine.playVoice("audio/sound_on.mp3", "Đã bật âm thanh tiếng Việt!");
      } else {
        audioIcon.innerHTML = `<i class="fa-solid fa-volume-xmark text-rose-600 text-base"></i>`;
        audioText.textContent = "Âm Thanh: TẮT";
        audioToggleBtn.classList.replace("bg-amber-100", "bg-rose-100");
      }
    });
  }

  // Fullscreen Kids Mode Toggle
  const fullscreenBtn = document.getElementById("playzone-fullscreen-btn");
  const stage = document.getElementById("playzone-stage");
  if (fullscreenBtn && stage) {
    fullscreenBtn.addEventListener("click", () => {
      stage.classList.toggle("fullscreen-kids");
      if (stage.classList.contains("fullscreen-kids")) {
        fullscreenBtn.innerHTML = `<i class="fa-solid fa-compress text-yellow-300"></i><span>Thu Nhỏ Lại</span>`;
      } else {
        fullscreenBtn.innerHTML = `<i class="fa-solid fa-expand text-yellow-300"></i><span>Mở Rộng Màn Hình</span>`;
      }
    });
  }

  // Initialize initial game
  initBubbleGame();
}

// --- B. GAME 1: MAGIC BUBBLE POP, COUNTING (1-5) & PARACHUTE GIFTS ---
let bubbleInterval = null;
let bubbleComboCount = 0;
let bubbleComboTimer = null;
let bubbleSpawnCounter = 0;
let currentBubbleTheme = "candy"; // "candy" | "ocean" | "neon"

const BUBBLE_THEMES = {
  candy: {
    bgColors: [
      "radial-gradient(circle at 35% 35%, #fbcfe8, #f43f5e)",
      "radial-gradient(circle at 35% 35%, #fed7aa, #ea580c)",
      "radial-gradient(circle at 35% 35%, #fef08a, #eab308)",
      "radial-gradient(circle at 35% 35%, #ddd6fe, #7c3aed)",
      "radial-gradient(circle at 35% 35%, #bbf7d0, #16a34a)"
    ],
    symbols: ["🍬", "🍭", "🧁", "🍩", "⭐", "🍓", "🍉", "🍒", "1", "2", "3"]
  },
  ocean: {
    bgColors: [
      "radial-gradient(circle at 35% 35%, #bae6fd, #0284c7)",
      "radial-gradient(circle at 35% 35%, #a5f3fc, #0891b2)",
      "radial-gradient(circle at 35% 35%, #99f6e4, #0d9488)",
      "radial-gradient(circle at 35% 35%, #c7d2fe, #4f46e5)"
    ],
    symbols: ["🐠", "🐟", "🐬", "🦀", "🐙", "🐚", "⭐", "🌊", "1", "2", "3"]
  },
  neon: {
    bgColors: [
      "radial-gradient(circle at 35% 35%, #f43f5e, #881337)",
      "radial-gradient(circle at 35% 35%, #22d3ee, #0e7490)",
      "radial-gradient(circle at 35% 35%, #34d399, #065f46)",
      "radial-gradient(circle at 35% 35%, #facc15, #854d0e)",
      "radial-gradient(circle at 35% 35%, #c084fc, #581c87)"
    ],
    symbols: ["✨", "⚡", "🌟", "💫", "🔮", "💎", "⭐", "1", "2", "3"]
  }
};

function initBubbleGame() {
  const container = document.getElementById("bubbles-container");
  const arena = document.getElementById("bubble-sky-arena");
  const spawnBtn = document.getElementById("spawn-more-bubbles-btn");

  // Theme buttons
  const candyBtn = document.getElementById("bubble-theme-candy");
  const oceanBtn = document.getElementById("bubble-theme-ocean");
  const neonBtn = document.getElementById("bubble-theme-neon");

  if (candyBtn && oceanBtn && neonBtn) {
    const setBubbleTheme = (theme, activeBtn) => {
      currentBubbleTheme = theme;
      [candyBtn, oceanBtn, neonBtn].forEach(b => {
        b.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
        b.classList.add("text-slate-600");
      });
      activeBtn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
      activeBtn.classList.remove("text-slate-600");
      soundEngine.playPop();
      if (theme === "candy") arena.style.background = "linear-gradient(to bottom, #fce7f3, #fed7aa 60%, #fef3c7)";
      else if (theme === "ocean") arena.style.background = "linear-gradient(to bottom, #bae6fd, #a5f3fc 60%, #cffafe)";
      else if (theme === "neon") arena.style.background = "linear-gradient(to bottom, #1e1b4b, #0f172a 60%, #020617)";
    };
    candyBtn.onclick = () => setBubbleTheme("candy", candyBtn);
    oceanBtn.onclick = () => setBubbleTheme("ocean", oceanBtn);
    neonBtn.onclick = () => setBubbleTheme("neon", neonBtn);
  }

  if (!container || !arena) return;
  if (bubbleInterval) clearInterval(bubbleInterval);

  container.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    createBubble(container, arena, true);
  }

  bubbleInterval = setInterval(() => {
    if (container.children.length < 10) {
      createBubble(container, arena, false);
    }
  }, 2200);

  if (spawnBtn) {
    spawnBtn.onclick = () => {
      soundEngine.init();
      soundEngine.playPop();
      for (let i = 0; i < 4; i++) {
        createBubble(container, arena, false);
      }
    };
  }
}

function updateBubbleComboUI() {
  const countEl = document.getElementById("bubble-combo-count");
  const starsEl = document.getElementById("bubble-combo-stars");
  if (!countEl || !starsEl) return;

  countEl.textContent = `${bubbleComboCount}/5`;
  const starIcons = starsEl.querySelectorAll("span");
  starIcons.forEach((star, idx) => {
    if (idx < bubbleComboCount) {
      star.className = "text-amber-500 scale-125 transition transform";
    } else {
      star.className = "opacity-30";
    }
  });
}

function triggerBubbleCombo() {
  bubbleComboCount++;
  if (bubbleComboTimer) clearTimeout(bubbleComboTimer);
  updateBubbleComboUI();

  const countAudio = `audio/count_${bubbleComboCount}.mp3`;
  soundEngine.playVoice(countAudio, `${bubbleComboCount}!`);

  if (bubbleComboCount >= 5) {
    if (typeof confetti === "function") {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
    addBabyStars(2, false);
    bubbleComboCount = 0;
    setTimeout(() => updateBubbleComboUI(), 1200);
  } else {
    bubbleComboTimer = setTimeout(() => {
      bubbleComboCount = 0;
      updateBubbleComboUI();
    }, 2800);
  }
}

function spawnParachuteSurprise(arena) {
  const container = document.getElementById("bubble-parachute-container");
  if (!container) return;

  const chute = document.createElement("div");
  chute.className = "bubble-parachute";
  chute.style.left = `${Math.floor(20 + Math.random() * 60)}%`;
  chute.innerHTML = `
    <div class="text-4xl animate-bounce">🪂</div>
    <div class="text-3xl -mt-2">🎁</div>
  `;
  container.appendChild(chute);

  chute.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    soundEngine.playCheer();
    soundEngine.playVoice("audio/star_praise.mp3", "Hoan hô bé! Bé nhận được món quà bí mật!");
    if (typeof confetti === "function") {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    }
    addBabyStars(3, true);
    chute.remove();
  });

  setTimeout(() => {
    if (chute.parentElement) chute.remove();
  }, 11000);
}

function createBubble(container, arena, isInitial = false, isMother = false) {
  const bubble = document.createElement("div");
  bubble.className = "game-bubble";

  bubbleSpawnCounter++;
  if (!isMother && bubbleSpawnCounter % 8 === 0) {
    isMother = true;
  }
  if (bubbleSpawnCounter % 14 === 0) {
    spawnParachuteSurprise(arena);
  }

  const themeData = BUBBLE_THEMES[currentBubbleTheme] || BUBBLE_THEMES.candy;
  let size = isMother ? 125 : Math.floor(75 + Math.random() * 30);
  let color = isMother 
    ? "radial-gradient(circle at 35% 35%, #fed7aa, #ec4899 50%, #8b5cf6 100%)"
    : themeData.bgColors[Math.floor(Math.random() * themeData.bgColors.length)];
  let symbol = isMother ? "👑" : themeData.symbols[Math.floor(Math.random() * themeData.symbols.length)];
  let leftPercent = Math.floor(6 + Math.random() * 80);

  if (isMother) bubble.classList.add("mother-bubble");

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.background = color;
  bubble.style.left = `${leftPercent}%`;
  bubble.style.fontSize = `${Math.floor(size * (isMother ? 0.45 : 0.38))}px`;
  bubble.innerHTML = `<span class="drop-shadow-sm text-white">${symbol}</span>`;

  const duration = isMother ? 12 : (6 + Math.random() * 4).toFixed(1);
  bubble.style.animation = isMother 
    ? `bubbleFloatUp ${duration}s ease-in-out infinite, motherPulse 2s ease-in-out infinite`
    : `bubbleFloatUp ${duration}s ease-in-out infinite`;

  if (isInitial) {
    bubble.style.bottom = `${Math.floor(10 + Math.random() * 65)}%`;
  } else {
    bubble.style.bottom = "-130px";
  }

  const popAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    soundEngine.init();
    soundEngine.playPop();

    const rect = bubble.getBoundingClientRect();
    const arenaRect = arena.getBoundingClientRect();
    const x = rect.left - arenaRect.left + rect.width / 2;
    const y = rect.top - arenaRect.top + rect.height / 2;

    createPopSparkle(arena, x, y, symbol);
    bubble.remove();

    if (isMother) {
      soundEngine.playVoice("audio/bubble_mother.mp3", "Bong bóng khổng lồ xuất hiện!");
      soundEngine.playCheer();
      addBabyStars(3, true);
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createBabyBurstBubble(container, arena, x, y), i * 60);
      }
    } else {
      triggerBubbleCombo();
      addBabyStars(1, false);
    }

    const hint = document.getElementById("bubble-hint");
    if (hint) hint.style.display = "none";

    setTimeout(() => {
      if (container.children.length < 8) {
        createBubble(container, arena, false);
      }
    }, 900);
  };

  bubble.addEventListener("pointerdown", popAction);
  container.appendChild(bubble);
}

function createBabyBurstBubble(container, arena, startX, startY) {
  const mini = document.createElement("div");
  mini.className = "game-bubble";
  const size = 65;
  const themeData = BUBBLE_THEMES[currentBubbleTheme] || BUBBLE_THEMES.candy;
  const color = themeData.bgColors[Math.floor(Math.random() * themeData.bgColors.length)];

  mini.style.width = `${size}px`;
  mini.style.height = `${size}px`;
  mini.style.background = color;
  mini.style.left = `${Math.max(10, Math.min(arena.clientWidth - 70, startX + (Math.random() - 0.5) * 140))}px`;
  mini.style.top = `${Math.max(10, Math.min(arena.clientHeight - 70, startY + (Math.random() - 0.5) * 120))}px`;
  mini.style.fontSize = "22px";
  mini.innerHTML = `<span class="drop-shadow-sm text-white">✨</span>`;
  mini.style.animation = "bubbleFloatUp 7s ease-in-out infinite";

  const popMini = (e) => {
    e.stopPropagation();
    e.preventDefault();
    soundEngine.playPop();
    createPopSparkle(arena, parseFloat(mini.style.left) + 30, parseFloat(mini.style.top) + 30, "⭐");
    mini.remove();
    addBabyStars(1, false);
  };

  mini.addEventListener("pointerdown", popMini);
  container.appendChild(mini);
}

function createPopSparkle(arena, x, y, symbol) {
  const burst = document.createElement("div");
  burst.className = "bubble-pop-burst font-display font-black text-amber-500 flex flex-col items-center justify-center";
  burst.style.left = `${x - 40}px`;
  burst.style.top = `${y - 40}px`;
  burst.style.width = "80px";
  burst.style.height = "80px";
  burst.innerHTML = `
    <span class="text-2xl">${symbol}</span>
    <span class="text-xs font-black bg-white/90 text-orange-600 px-2 py-0.5 rounded-full shadow-xs">BỐP! ✨</span>
  `;
  arena.appendChild(burst);
  setTimeout(() => burst.remove(), 420);
}

// --- C. GAME 2: 3D BARN PEEK-A-BOO (FARM, SAFARI, OCEAN) ---
let currentAnimalMode = "free";
let currentAnimalHabitat = "farm";
let currentQuizAnimal = null;

const HABITAT_ANIMALS = {
  farm: [
    { id: "dog", name: "Chú Cún Con", soundName: "Gâu gâu", icon: "🐶", color: "#FBBF24", voiceFile: "audio/animal_dog.mp3", cryFile: "audio/sound_cry_dog.mp3", guessVoiceFile: "audio/sound_guess_dog.mp3" },
    { id: "cat", name: "Bạn Mèo Con", soundName: "Meo meo", icon: "🐱", color: "#F97316", voiceFile: "audio/animal_cat.mp3", cryFile: "audio/sound_cry_cat.mp3", guessVoiceFile: "audio/sound_guess_cat.mp3" },
    { id: "duck", name: "Chú Vịt Vàng", soundName: "Quạc quạc", icon: "🦆", color: "#FDE047", voiceFile: "audio/animal_duck.mp3", cryFile: "audio/sound_cry_duck.mp3", guessVoiceFile: "audio/sound_guess_duck.mp3" },
    { id: "frog", name: "Chú Ếch Cốm", soundName: "Ộp ộp", icon: "🐸", color: "#4ADE80", voiceFile: "audio/animal_frog.mp3", cryFile: "audio/sound_cry_frog.mp3", guessVoiceFile: "audio/sound_guess_frog.mp3" },
    { id: "cow", name: "Bác Bò Sữa", soundName: "Ùm bòooo", icon: "🐮", color: "#CBD5E1", voiceFile: "audio/animal_cow.mp3", cryFile: "audio/sound_cry_cow.mp3", guessVoiceFile: "audio/sound_guess_cow.mp3" },
    { id: "rooster", name: "Chú Gà Trống", soundName: "Ò ó o o", icon: "🐓", color: "#EF4444", voiceFile: "audio/animal_rooster.mp3", cryFile: "audio/sound_cry_rooster.mp3", guessVoiceFile: "audio/sound_guess_rooster.mp3" }
  ],
  safari: [
    { id: "lion", name: "Vua Sư Tử", soundName: "Gầm gừ", icon: "🦁", color: "#F59E0B", voiceFile: "audio/animal_lion.mp3", cryFile: "audio/sound_cry_lion.mp3", guessVoiceFile: "audio/sound_guess_lion.mp3" },
    { id: "elephant", name: "Bác Voi Con", soundName: "Phùuuu", icon: "🐘", color: "#94A3B8", voiceFile: "audio/animal_elephant.mp3", cryFile: "audio/sound_cry_elephant.mp3", guessVoiceFile: "audio/sound_guess_elephant.mp3" },
    { id: "monkey", name: "Chú Khỉ Nâu", soundName: "Khẹc khẹc", icon: "🐵", color: "#B45309", voiceFile: "audio/animal_monkey.mp3", cryFile: "audio/sound_cry_monkey.mp3", guessVoiceFile: "audio/sound_guess_monkey.mp3" },
    { id: "giraffe", name: "Hươu Cao Cổ", soundName: "Hươu hiền", icon: "🦒", color: "#FDE047", voiceFile: "audio/animal_giraffe.mp3", cryFile: "audio/sound_cry_giraffe.mp3", guessVoiceFile: "audio/sound_guess_giraffe.mp3" },
    { id: "tiger", name: "Bạn Hổ Vằn", soundName: "Gầm gào", icon: "🐯", color: "#FB923C", voiceFile: "audio/animal_lion.mp3", cryFile: "audio/sound_cry_lion.mp3", guessVoiceFile: "audio/sound_guess_lion.mp3" },
    { id: "panda", name: "Gấu Trúc Con", soundName: "Hừ hừ", icon: "🐼", color: "#E2E8F0", voiceFile: "audio/animal_dog.mp3", cryFile: "audio/sound_cry_dog.mp3", guessVoiceFile: "audio/sound_guess_dog.mp3" }
  ],
  ocean: [
    { id: "whale", name: "Cá Voi Xanh", soundName: "Ùu ùu", icon: "🐳", color: "#38BDF8", voiceFile: "audio/animal_whale.mp3", cryFile: "audio/sound_cry_whale.mp3", guessVoiceFile: "audio/sound_guess_whale.mp3" },
    { id: "dolphin", name: "Cá Heo Vui", soundName: "Chít chít", icon: "🐬", color: "#0EA5E9", voiceFile: "audio/animal_dolphin.mp3", cryFile: "audio/sound_cry_dolphin.mp3", guessVoiceFile: "audio/sound_guess_dolphin.mp3" },
    { id: "crab", name: "Chú Cua Đỏ", soundName: "Lách cách", icon: "🦀", color: "#F43F5E", voiceFile: "audio/animal_crab.mp3", cryFile: "audio/sound_cry_crab.mp3", guessVoiceFile: "audio/sound_guess_crab.mp3" },
    { id: "turtle", name: "Bác Rùa Biển", soundName: "Bập bõm", icon: "🐢", color: "#10B981", voiceFile: "audio/animal_whale.mp3", cryFile: "audio/sound_cry_whale.mp3", guessVoiceFile: "audio/sound_guess_whale.mp3" },
    { id: "octopus", name: "Bạch Tuộc Nhỏ", soundName: "Xì xụt", icon: "🐙", color: "#EC4899", voiceFile: "audio/animal_crab.mp3", cryFile: "audio/sound_cry_crab.mp3", guessVoiceFile: "audio/sound_guess_crab.mp3" },
    { id: "penguin", name: "Chim Cánh Cụt", soundName: "Cục cục", icon: "🐧", color: "#64748B", voiceFile: "audio/animal_duck.mp3", cryFile: "audio/sound_cry_duck.mp3", guessVoiceFile: "audio/sound_guess_duck.mp3" }
  ]
};

function initAnimalGame() {
  const freeBtn = document.getElementById("animal-mode-free");
  const quizBtn = document.getElementById("animal-mode-quiz");
  const quizBox = document.getElementById("animal-quiz-box");
  const replayBtn = document.getElementById("quiz-replay-audio-btn");

  const farmBtn = document.getElementById("animal-habitat-farm");
  const safariBtn = document.getElementById("animal-habitat-safari");
  const oceanBtn = document.getElementById("animal-habitat-ocean");

  if (farmBtn && safariBtn && oceanBtn) {
    const setHabitat = (habitat, btn) => {
      currentAnimalHabitat = habitat;
      [farmBtn, safariBtn, oceanBtn].forEach(b => {
        b.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
        b.classList.add("text-slate-600");
      });
      btn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
      btn.classList.remove("text-slate-600");
      soundEngine.playPop();
      renderHabitatBarns();
    };
    farmBtn.onclick = () => setHabitat("farm", farmBtn);
    safariBtn.onclick = () => setHabitat("safari", safariBtn);
    oceanBtn.onclick = () => setHabitat("ocean", oceanBtn);
  }

  if (freeBtn && quizBtn) {
    freeBtn.onclick = () => {
      currentAnimalMode = "free";
      freeBtn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
      freeBtn.classList.remove("text-slate-600");
      quizBtn.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
      quizBtn.classList.add("text-slate-600");
      if (quizBox) quizBox.classList.add("hidden");
      soundEngine.playVoice("audio/free_mode.mp3", "Chế độ gõ cửa tự do! Bé bấm vào ngôi nhà nào cũng được nhé!");
    };

    quizBtn.onclick = () => {
      currentAnimalMode = "quiz";
      quizBtn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
      quizBtn.classList.remove("text-slate-600");
      freeBtn.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
      freeBtn.classList.add("text-slate-600");
      if (quizBox) quizBox.classList.remove("hidden");
      document.querySelectorAll(".barn-box").forEach(box => box.classList.remove("door-open"));
      startNewAnimalQuiz();
    };
  }

  if (replayBtn) {
    replayBtn.onclick = () => {
      if (currentQuizAnimal) {
        soundEngine.playVoice(currentQuizAnimal.guessVoiceFile, `Ai đang kêu ${currentQuizAnimal.soundName} thế nhỉ?`);
      }
    };
  }

  renderHabitatBarns();
}

function renderHabitatBarns() {
  const grid = document.getElementById("animals-grid");
  if (!grid) return;

  const animals = HABITAT_ANIMALS[currentAnimalHabitat] || HABITAT_ANIMALS.farm;
  grid.innerHTML = animals.map(animal => `
    <div class="barn-card cursor-pointer" data-animal="${animal.id}">
      <div class="barn-box border-4 border-amber-300">
        <div class="barn-door barn-door-left"><span class="text-amber-200 text-xs font-black">🚪</span></div>
        <div class="barn-door barn-door-right"><span class="text-amber-200 text-xs font-black">🚪</span></div>
        <div class="barn-interior">
          <div class="animal-avatar text-5xl sm:text-6xl mb-1">${animal.icon}</div>
          <div class="font-display font-black text-xs sm:text-sm text-slate-800">${animal.name}</div>
          <div class="text-[10px] sm:text-[11px] font-bold text-amber-600">"${animal.soundName}"</div>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".barn-card").forEach(card => {
    card.addEventListener("click", () => {
      soundEngine.init();
      const animalId = card.getAttribute("data-animal");
      const animal = animals.find(a => a.id === animalId);
      const box = card.querySelector(".barn-box");
      if (!animal || !box) return;

      soundEngine.playKnock();
      box.classList.add("door-open");

      if (currentAnimalMode === "free") {
        setTimeout(() => {
          soundEngine.playVoice(animal.voiceFile, `${animal.soundName}! ${animal.name}!`);
        }, 350);
        addBabyStars(1, false);
      } else if (currentAnimalMode === "quiz") {
        if (currentQuizAnimal && animalId === currentQuizAnimal.id) {
          setTimeout(() => {
            soundEngine.playVoice(animal.voiceFile, `${animal.soundName}! ${animal.name}!`);
          }, 350);

          setTimeout(() => {
            soundEngine.playCheer();
            soundEngine.playVoice("audio/quiz_correct.mp3", "Đúng rồi! Bé giỏi quá!");
          }, 1300);

          if (typeof confetti === "function") {
            confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
          }
          addBabyStars(2, true);

          setTimeout(() => {
            if (currentAnimalMode === "quiz") {
              document.querySelectorAll(".barn-box").forEach(b => b.classList.remove("door-open"));
              setTimeout(() => startNewAnimalQuiz(), 700);
            }
          }, 3500);
        } else {
          setTimeout(() => {
            soundEngine.playVoice(animal.voiceFile, `${animal.soundName}! ${animal.name}!`);
          }, 350);

          setTimeout(() => {
            soundEngine.playVoice("audio/quiz_wrong.mp3", "Chưa đúng rồi! Bé thử lại lần nữa nhé!");
          }, 1300);

          setTimeout(() => {
            if (currentAnimalMode === "quiz") box.classList.remove("door-open");
          }, 2600);
        }
      }
    });
  });
}

function startNewAnimalQuiz() {
  const quizText = document.getElementById("quiz-question-text");
  const animals = HABITAT_ANIMALS[currentAnimalHabitat] || HABITAT_ANIMALS.farm;
  const randomIndex = Math.floor(Math.random() * animals.length);
  currentQuizAnimal = animals[randomIndex];

  if (quizText) {
    quizText.textContent = `Ai đang kêu "${currentQuizAnimal.soundName}" thế nhỉ? Bé hãy gõ cửa tìm bạn ấy nhé!`;
  }
  soundEngine.playVoice(currentQuizAnimal.guessVoiceFile, `Ai đang kêu ${currentQuizAnimal.soundName} thế nhỉ?`);
}

// --- D. GAME 3: RAINBOW XYLOPHONE & DRUM KIT ---
const SONGS_LIBRARY = {
  butterfly: {
    name: "Kìa Con Bướm Vàng",
    audio: "audio/song_complete.mp3",
    notes: ["C4", "D4", "E4", "C4", "C4", "D4", "E4", "C4", "E4", "F4", "G4", "E4", "F4", "G4", "G4", "A4", "G4", "F4", "E4", "C4"]
  },
  duck: {
    name: "Một Con Vịt",
    audio: "audio/song_duck.mp3",
    notes: ["G4", "G4", "E4", "E4", "G4", "A4", "G4", "E4", "F4", "F4", "D4", "D4", "F4", "G4", "F4", "D4", "C4"]
  },
  kindergarten: {
    name: "Cháu Lên Ba",
    audio: "audio/song_kindergarten.mp3",
    notes: ["C4", "C4", "D4", "E4", "E4", "G4", "E4", "D4", "C4", "D4", "E4", "D4", "C4"]
  }
};

let currentSongKey = "butterfly";
let fireflyStep = 0;
let isFireflyActive = true;

function initXylophoneGame() {
  const keys = document.querySelectorAll(".xylo-key");
  const demoBtn = document.getElementById("xylo-demo-song-btn");
  const fireflyBtn = document.getElementById("toggle-firefly-btn");
  const instBtns = document.querySelectorAll(".sound-mode-btn");
  const songChoices = document.querySelectorAll(".xylo-song-choice");
  const xyloRack = document.getElementById("xylo-keys-rack");
  const drumRack = document.getElementById("drum-kit-rack");

  // Multi-Instrument switch
  instBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      instBtns.forEach(b => {
        b.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
        b.classList.add("text-slate-600");
      });
      btn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
      btn.classList.remove("text-slate-600");
      const inst = btn.getAttribute("data-inst");
      soundEngine.currentInstrument = inst;
      soundEngine.playPop();

      if (inst === "drum") {
        if (xyloRack) xyloRack.classList.add("hidden");
        if (drumRack) drumRack.classList.remove("hidden");
        const guide = document.getElementById("firefly-guide");
        if (guide) guide.classList.add("hidden");
        soundEngine.playVoice("audio/drum_intro.mp3", "Bộ trống vui nhộn! Bé hãy gõ bùm chát nhé!");
      } else {
        if (xyloRack) xyloRack.classList.remove("hidden");
        if (drumRack) drumRack.classList.add("hidden");
        positionFireflyGuide();
      }
    });
  });

  // Song choice buttons
  songChoices.forEach(btn => {
    btn.addEventListener("click", () => {
      songChoices.forEach(b => {
        b.classList.remove("active", "bg-sky-600", "text-white");
        b.classList.add("bg-white", "text-sky-800");
      });
      btn.classList.add("active", "bg-sky-600", "text-white");
      btn.classList.remove("bg-white", "text-sky-800");
      currentSongKey = btn.getAttribute("data-song");
      fireflyStep = 0;
      positionFireflyGuide();
      soundEngine.playPop();
    });
  });

  // Drum Pads click
  document.querySelectorAll(".drum-pad").forEach(pad => {
    pad.addEventListener("pointerdown", () => {
      soundEngine.init();
      const drumType = pad.getAttribute("data-drum");
      pad.classList.add("scale-90");
      setTimeout(() => pad.classList.remove("scale-90"), 120);

      if (drumType === "kick") soundEngine.playDrumKick();
      else if (drumType === "snare") soundEngine.playDrumSnare();
      else if (drumType === "cymbal") soundEngine.playDrumCymbal();

      addBabyStars(1, false);
    });
  });

  // Key press
  keys.forEach(key => {
    key.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      soundEngine.init();
      const freq = parseFloat(key.getAttribute("data-freq"));
      const note = key.getAttribute("data-note");

      soundEngine.playInstrumentNote(freq);
      key.classList.add("pressed");
      setTimeout(() => key.classList.remove("pressed"), 180);

      createMusicNoteSparkle(key);
      addBabyStars(1, false);

      if (isFireflyActive && soundEngine.currentInstrument !== "drum") {
        const songData = SONGS_LIBRARY[currentSongKey] || SONGS_LIBRARY.butterfly;
        const targetNote = songData.notes[fireflyStep];
        if (note === targetNote) {
          fireflyStep++;
          if (fireflyStep >= songData.notes.length) {
            fireflyStep = 0;
            soundEngine.playCheer();
            soundEngine.playVoice(songData.audio, "Bé đánh đàn hay tuyệt vời!");
            if (typeof confetti === "function") {
              confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
            }
            addBabyStars(3, true);
          }
          positionFireflyGuide();
        }
      }
    });
  });

  if (demoBtn) demoBtn.onclick = () => playDemoSong();

  if (fireflyBtn) {
    fireflyBtn.onclick = () => {
      isFireflyActive = !isFireflyActive;
      const guide = document.getElementById("firefly-guide");
      const btnText = document.getElementById("firefly-btn-text");
      const statusText = document.getElementById("firefly-status-text");

      if (isFireflyActive) {
        if (guide) guide.classList.remove("hidden");
        if (btnText) btnText.textContent = "Tắt Đom Đóm";
        if (statusText) statusText.textContent = "Bé gõ theo bạn Đom Đóm phát sáng nhé!";
        fireflyStep = 0;
        positionFireflyGuide();
        soundEngine.playVoice("audio/firefly_guide.mp3", "Bé gõ theo bạn Đom Đóm phát sáng nhé!");
      } else {
        if (guide) guide.classList.add("hidden");
        document.querySelectorAll(".xylo-key").forEach(k => k.classList.remove("guided-target"));
        if (btnText) btnText.textContent = "Bật Đom Đóm";
        if (statusText) statusText.textContent = "Chế độ gõ phím tự do theo sở thích của bé!";
      }
    };
  }

  setTimeout(() => positionFireflyGuide(), 400);
}

function positionFireflyGuide() {
  const guide = document.getElementById("firefly-guide");
  if (!guide || !isFireflyActive || soundEngine.currentInstrument === "drum") {
    if (guide) guide.classList.add("hidden");
    return;
  }

  const songData = SONGS_LIBRARY[currentSongKey] || SONGS_LIBRARY.butterfly;
  const targetNote = songData.notes[fireflyStep];
  const targetKey = document.querySelector(`.xylo-key[data-note="${targetNote}"]`);

  document.querySelectorAll(".xylo-key").forEach(k => k.classList.remove("guided-target"));

  if (targetKey) {
    targetKey.classList.add("guided-target");
    guide.classList.remove("hidden");
    const leftOffset = targetKey.offsetLeft + targetKey.offsetWidth / 2 - 20;
    guide.style.left = `${leftOffset}px`;
  }
}

function createMusicNoteSparkle(key) {
  const notes = ["🎵", "🎶", "🎼", "⭐", "✨"];
  const sparkle = document.createElement("div");
  sparkle.className = "music-note-sparkle";
  sparkle.textContent = notes[Math.floor(Math.random() * notes.length)];

  const rect = key.getBoundingClientRect();
  sparkle.style.left = `${rect.left + rect.width / 2 - 14}px`;
  sparkle.style.top = `${rect.top}px`;
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
}

function playDemoSong() {
  soundEngine.init();
  const songData = SONGS_LIBRARY[currentSongKey] || SONGS_LIBRARY.butterfly;
  const noteFreqs = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
    G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
  };

  songData.notes.slice(0, 10).forEach((note, idx) => {
    setTimeout(() => {
      const key = document.querySelector(`.xylo-key[data-note="${note}"]`);
      if (key) {
        soundEngine.playInstrumentNote(noteFreqs[note] || 261.63);
        key.classList.add("pressed");
        createMusicNoteSparkle(key);
        setTimeout(() => key.classList.remove("pressed"), 220);
      }
    }, idx * 420);
  });
}

// --- E. GAME 4: CHO GẤU MISA ĂN (COLORS, SHAPES, ICE CREAM & SIZES) ---
let currentBearMode = "colors"; // "colors" | "shapes" | "icecream" | "sizes"
let bearFullness = 0;

const BEAR_MODES_DATA = {
  colors: [
    { id: "red", name: "ĐỎ", label: "Quả Táo ĐỎ", icon: "🍎", audioFile: "audio/bear_red.mp3", bgStyle: "bg-rose-50 border-rose-300 text-rose-600" },
    { id: "yellow", name: "VÀNG", label: "Quả Chuối VÀNG", icon: "🍌", audioFile: "audio/bear_yellow.mp3", bgStyle: "bg-amber-50 border-amber-300 text-amber-600" },
    { id: "green", name: "XANH", label: "Quả Nho XANH", icon: "🍇", audioFile: "audio/bear_green.mp3", bgStyle: "bg-emerald-50 border-emerald-300 text-emerald-600" }
  ],
  shapes: [
    { id: "circle", name: "TRÒN", label: "Bánh hình Tròn", icon: "🍪", audioFile: "audio/shape_circle.mp3", bgStyle: "bg-amber-50 border-amber-400 text-amber-700" },
    { id: "square", name: "VUÔNG", label: "Bánh hình Vuông", icon: "🧇", audioFile: "audio/shape_square.mp3", bgStyle: "bg-orange-50 border-orange-400 text-orange-700" },
    { id: "triangle", name: "TAM GIÁC", label: "Bánh hình Tam Giác", icon: "🥪", audioFile: "audio/shape_triangle.mp3", bgStyle: "bg-rose-50 border-rose-400 text-rose-700" },
    { id: "star", name: "NGÔI SAO", label: "Bánh hình Ngôi Sao", icon: "⭐", audioFile: "audio/shape_star.mp3", bgStyle: "bg-yellow-50 border-yellow-400 text-yellow-600" }
  ],
  icecream: [
    { id: "lemon", name: "CHUA CHUA", label: "Kem Chanh Vàng", icon: "🍋", audioFile: "audio/bear_sour.mp3", bgStyle: "bg-yellow-50 border-yellow-300 text-yellow-600", reaction: "sour" },
    { id: "freeze", name: "LẠNH BUỐT", label: "Kem Băng Tuyết", icon: "🍧", audioFile: "audio/bear_freeze.mp3", bgStyle: "bg-cyan-50 border-cyan-300 text-cyan-600", reaction: "freeze" },
    { id: "sweet", name: "NGỌT LỊM", label: "Kem Dâu Tây", icon: "🍓", audioFile: "audio/bear_yummy.mp3", bgStyle: "bg-pink-50 border-pink-300 text-pink-600", reaction: "sweet" }
  ],
  sizes: [
    { id: "big", name: "TO KHỔNG LỒ", label: "Bánh Quy To", icon: "🍪", audioFile: "audio/bear_size_big.mp3", bgStyle: "bg-amber-100 border-amber-500 text-amber-900 text-3xl", sizeClass: "scale-125" },
    { id: "small", name: "TÍ HON", label: "Bánh Quy Nhỏ", icon: "🍘", audioFile: "audio/bear_size_small.mp3", bgStyle: "bg-amber-50 border-amber-300 text-amber-700 text-sm", sizeClass: "scale-90" }
  ]
};

let currentTargetItem = null;

function initColorGame() {
  const modeColorsBtn = document.getElementById("bear-mode-colors");
  const modeShapesBtn = document.getElementById("bear-mode-shapes");
  const modeIcecreamBtn = document.getElementById("bear-mode-icecream");
  const modeSizesBtn = document.getElementById("bear-mode-sizes");
  const replayBtn = document.getElementById("color-replay-audio-btn");

  const setBearMode = (mode, btn) => {
    currentBearMode = mode;
    [modeColorsBtn, modeShapesBtn, modeIcecreamBtn, modeSizesBtn].forEach(b => {
      if (b) {
        b.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
        b.classList.add("text-slate-600");
      }
    });
    if (btn) {
      btn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
      btn.classList.remove("text-slate-600");
    }
    pickNewBearTarget();
  };

  if (modeColorsBtn) modeColorsBtn.onclick = () => setBearMode("colors", modeColorsBtn);
  if (modeShapesBtn) modeShapesBtn.onclick = () => setBearMode("shapes", modeShapesBtn);
  if (modeIcecreamBtn) modeIcecreamBtn.onclick = () => setBearMode("icecream", modeIcecreamBtn);
  if (modeSizesBtn) modeSizesBtn.onclick = () => setBearMode("sizes", modeSizesBtn);

  if (replayBtn) {
    replayBtn.onclick = () => {
      if (currentTargetItem) {
        soundEngine.playVoice(currentTargetItem.audioFile, `Bé ơi, cho Gấu ăn ${currentTargetItem.label} nhé!`);
      }
    };
  }

  pickNewBearTarget();
}

function updateBearFullnessUI() {
  const fill = document.getElementById("bear-tummy-fill");
  const count = document.getElementById("bear-tummy-count");
  if (fill) fill.style.width = `${(bearFullness / 3) * 100}%`;
  if (count) count.textContent = `${bearFullness}/3 món`;
}

function pickNewBearTarget() {
  const demandText = document.getElementById("bear-demand-text");
  const container = document.getElementById("food-plates-container");
  const pool = BEAR_MODES_DATA[currentBearMode] || BEAR_MODES_DATA.colors;

  const randomIndex = Math.floor(Math.random() * pool.length);
  currentTargetItem = pool[randomIndex];

  if (demandText) {
    if (currentBearMode === "colors") {
      demandText.innerHTML = `Bé ơi, cho Gấu ăn quả màu <span class="${currentTargetItem.bgStyle.split(' ').pop()} underline font-black text-lg">${currentTargetItem.name}</span> nhé!`;
    } else if (currentBearMode === "shapes") {
      demandText.innerHTML = `Bé ơi, cho Gấu ăn bánh hình <span class="${currentTargetItem.bgStyle.split(' ').pop()} underline font-black text-lg">${currentTargetItem.name}</span> nhé!`;
    } else if (currentBearMode === "icecream") {
      demandText.innerHTML = `Bé ơi, cho Gấu ăn món kem có vị <span class="${currentTargetItem.bgStyle.split(' ').pop()} underline font-black text-lg">${currentTargetItem.name}</span> nhé!`;
    } else {
      demandText.innerHTML = `Bé ơi, cho Gấu ăn chiếc bánh <span class="${currentTargetItem.bgStyle.split(' ').pop()} underline font-black text-lg">${currentTargetItem.name}</span> nhé!`;
    }
  }

  soundEngine.playVoice(currentTargetItem.audioFile, `Bé ơi, cho Gấu ăn ${currentTargetItem.label} nhé!`);

  if (container) {
    container.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-${pool.length} gap-3 max-w-lg mx-auto">
        ${pool.map(item => `
          <div class="food-plate ${item.bgStyle} border-4 rounded-3xl p-3 sm:p-4 text-center cursor-pointer select-none transition transform hover:scale-105 active:scale-95 shadow-md ${item.sizeClass || ''}" data-item-id="${item.id}">
            <div class="text-4xl mb-1">${item.icon}</div>
            <div class="font-display font-black text-xs sm:text-sm text-slate-800">${item.label}</div>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll(".food-plate").forEach(plate => {
      plate.onclick = () => {
        soundEngine.init();
        const pickedId = plate.getAttribute("data-item-id");
        handleBearFeedingChoice(pickedId, plate);
      };
    });
  }
}

function handleBearFeedingChoice(pickedId, plateEl) {
  const bear = document.getElementById("bear-character");
  const bearMouth = document.getElementById("bear-mouth");
  const feedbackMsg = document.getElementById("color-feedback-msg");

  if (pickedId === currentTargetItem.id) {
    plateEl.classList.add("fruit-flying");
    setTimeout(() => plateEl.classList.remove("fruit-flying"), 650);

    if (bearMouth) {
      bearMouth.setAttribute("d", "M 48 70 Q 60 90 72 70 Z");
      bearMouth.setAttribute("fill", "#78350F");
    }
    if (bear) bear.classList.add("bear-chewing");
    soundEngine.playMunch();

    setTimeout(() => {
      if (bearMouth) {
        bearMouth.setAttribute("d", "M 52 74 Q 60 80 68 74");
        bearMouth.setAttribute("fill", "none");
      }
      if (bear) bear.classList.remove("bear-chewing");

      // Special reaction for ice cream
      if (currentBearMode === "icecream" && currentTargetItem.reaction === "sour") {
        soundEngine.playVoice("audio/bear_sour.mp3", "Chua quá! Chua lè luôn!");
        if (bear) bear.classList.add("scale-90", "rotate-6");
        setTimeout(() => bear && bear.classList.remove("scale-90", "rotate-6"), 1200);
      } else if (currentBearMode === "icecream" && currentTargetItem.reaction === "freeze") {
        soundEngine.playVoice("audio/bear_freeze.mp3", "Ui da lạnh buốt răng quá!");
        if (bear) bear.classList.add("animate-pulse");
        setTimeout(() => bear && bear.classList.remove("animate-pulse"), 1200);
      }

      bearFullness++;
      updateBearFullnessUI();

      if (bearFullness >= 3) {
        if (bear) bear.classList.add("bear-happy-pat");
        setTimeout(() => bear && bear.classList.remove("bear-happy-pat"), 2500);

        soundEngine.playVoice("audio/bear_full.mp3", "Ủ uôi no căng bụng rồi! Misa cảm ơn bé nhé!");
        if (typeof confetti === "function") {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
        addBabyStars(3, true);

        if (feedbackMsg) {
          feedbackMsg.textContent = `🎉 Hoan hô! Bụng Gấu đã no tròn rồi! Bé thật chu đáo!`;
          feedbackMsg.classList.remove("opacity-0");
          setTimeout(() => feedbackMsg.classList.add("opacity-0"), 3000);
        }

        setTimeout(() => {
          bearFullness = 0;
          updateBearFullnessUI();
          pickNewBearTarget();
        }, 3600);
      } else {
        addBabyStars(1, false);
        soundEngine.playVoice("audio/bear_yummy.mp3", `Chóp chép! Ngon quá! Cảm ơn bé yêu!`);
        if (feedbackMsg) {
          feedbackMsg.textContent = `🎉 Chóp chép ngon quá! Cảm ơn bé đã cho Gấu ăn ${currentTargetItem.label}!`;
          feedbackMsg.classList.remove("opacity-0");
          setTimeout(() => feedbackMsg.classList.add("opacity-0"), 2000);
        }
        setTimeout(() => pickNewBearTarget(), 2500);
      }
    }, 600);

  } else {
    soundEngine.playPop();
    soundEngine.playVoice("audio/bear_wrong.mp3", "Chưa đúng rồi bé ơi! Bé chọn lại cho Gấu nhé!");
    if (feedbackMsg) {
      feedbackMsg.textContent = `Gấu đang thèm ${currentTargetItem.label} cơ, bé chọn lại giúp Gấu nhé!`;
      feedbackMsg.classList.remove("opacity-0");
      setTimeout(() => feedbackMsg.classList.add("opacity-0"), 2200);
    }
  }
}

// --- F. GAME 5: MONTESSORI SHADOW MATCHING ---
const SHADOW_PACKS = {
  toys: [
    { id: "car", name: "Chiếc Ô Tô", icon: "🚗", bg: "bg-red-50 border-red-300" },
    { id: "duck", name: "Chú Vịt Vàng", icon: "🦆", bg: "bg-yellow-50 border-yellow-300" },
    { id: "apple", name: "Quả Táo Đỏ", icon: "🍎", bg: "bg-rose-50 border-rose-300" },
    { id: "star", name: "Ngôi Sao Vàng", icon: "⭐", bg: "bg-amber-50 border-amber-300" }
  ],
  animals: [
    { id: "puppy", name: "Chú Cún Con", icon: "🐶", bg: "bg-amber-50 border-amber-300" },
    { id: "kitty", name: "Mèo Con", icon: "🐱", bg: "bg-orange-50 border-orange-300" },
    { id: "bear", name: "Gấu Misa", icon: "🐻", bg: "bg-yellow-50 border-yellow-300" },
    { id: "froggy", name: "Ếch Cốm", icon: "🐸", bg: "bg-emerald-50 border-emerald-300" }
  ],
  fruits: [
    { id: "banana", name: "Quả Chuối", icon: "🍌", bg: "bg-amber-50 border-amber-300" },
    { id: "grape", name: "Chùm Nho", icon: "🍇", bg: "bg-purple-50 border-purple-300" },
    { id: "melon", name: "Dưa Hấu", icon: "🍉", bg: "bg-rose-50 border-rose-300" },
    { id: "orange", name: "Quả Cam", icon: "🍊", bg: "bg-orange-50 border-orange-300" }
  ]
};

let currentShadowPack = "toys";
let matchedShadows = new Set();

function initShadowGame() {
  const slotsContainer = document.getElementById("shadow-slots-container");
  const toysContainer = document.getElementById("shadow-toys-container");
  const resetBtn = document.getElementById("shadow-reset-btn");
  const celebration = document.getElementById("shadow-celebration");
  const themeBtns = document.querySelectorAll(".shadow-theme-btn");

  if (!slotsContainer || !toysContainer) return;

  themeBtns.forEach(btn => {
    btn.onclick = () => {
      themeBtns.forEach(b => {
        b.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
        b.classList.add("text-slate-600");
      });
      btn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
      btn.classList.remove("text-slate-600");
      currentShadowPack = btn.getAttribute("data-pack");
      soundEngine.playPop();
      initShadowGame();
    };
  });

  matchedShadows.clear();
  if (celebration) celebration.classList.add("hidden");

  const items = SHADOW_PACKS[currentShadowPack] || SHADOW_PACKS.toys;

  slotsContainer.innerHTML = items.map(item => `
    <div class="shadow-slot" data-slot-id="${item.id}">
      <div class="silhouette-mask text-4xl sm:text-5xl mb-1">${item.icon}</div>
      <div class="text-[10px] font-bold text-slate-400">Bóng ${item.name}</div>
    </div>
  `).join("");

  const shuffled = [...items].sort(() => Math.random() - 0.5);

  toysContainer.innerHTML = shuffled.map(item => `
    <div class="shadow-toy-card ${item.bg} border-4 rounded-2xl p-2.5 sm:p-3.5 text-center shadow-md cursor-pointer select-none transition transform hover:scale-105 active:scale-95" data-toy-id="${item.id}">
      <div class="text-4xl mb-1">${item.icon}</div>
      <div class="font-display font-black text-xs text-slate-800">${item.name}</div>
      <div class="text-[9px] text-purple-600 font-bold mt-0.5">Bấm để ghép!</div>
    </div>
  `).join("");

  toysContainer.querySelectorAll(".shadow-toy-card").forEach(toyCard => {
    toyCard.addEventListener("click", () => {
      soundEngine.init();
      const toyId = toyCard.getAttribute("data-toy-id");
      if (matchedShadows.has(toyId)) return;

      const targetSlot = slotsContainer.querySelector(`.shadow-slot[data-slot-id="${toyId}"]`);
      if (targetSlot) {
        snapToyIntoSlot(toyCard, targetSlot, toyId, items);
      }
    });
  });

  if (resetBtn) {
    resetBtn.onclick = () => {
      soundEngine.playPop();
      initShadowGame();
    };
  }
}

function snapToyIntoSlot(toyCard, slotEl, toyId, items) {
  matchedShadows.add(toyId);
  soundEngine.playSnap();

  toyCard.style.opacity = "0.2";
  toyCard.style.pointerEvents = "none";

  const item = items.find(i => i.id === toyId);
  slotEl.classList.add("matched");
  slotEl.innerHTML = `
    <div class="shadow-toy-card snapped text-4xl sm:text-5xl mb-1">${item.icon}</div>
    <div class="font-display font-black text-xs text-emerald-700">Đã Khớp! ✓</div>
  `;

  soundEngine.playVoice("audio/shadow_match.mp3", "Đúng rồi! Bé giỏi quá!");
  addBabyStars(1, false);

  if (matchedShadows.size === items.length) {
    const celebration = document.getElementById("shadow-celebration");
    if (celebration) celebration.classList.remove("hidden");
    soundEngine.playCheer();
    soundEngine.playVoice("audio/shadow_complete.mp3", "Hoan hô! Bé đã ghép đúng hết rồi!");
    if (typeof confetti === "function") {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
    addBabyStars(3, true);
  }
}

// --- G. GAME 6: TẮM RỬA BẠN THÚ LẤM LEM ---
const BATH_PETS = {
  pig: { name: "Chú Heo", icon: "🐷", color: "#F472B6", voice: "audio/pet_clean.mp3" },
  dog: { name: "Cún Con", icon: "🐶", color: "#FBBF24", voice: "audio/pet_clean.mp3" },
  cat: { name: "Bé Mèo", icon: "🐱", color: "#FB923C", voice: "audio/pet_clean.mp3" }
};

let currentBathPet = "pig";
let bathCleanProgress = 0; // 0..4
const TOTAL_MUD_SPOTS = 4;

function initBathGame() {
  const graphic = document.getElementById("bath-animal-graphic");
  const petBtns = document.querySelectorAll(".bath-pet-btn");
  const resetBtn = document.getElementById("bath-reset-btn");
  const showerHead = document.getElementById("bath-shower-head");
  const celebration = document.getElementById("bath-celebration");
  const nextBtn = document.getElementById("bath-celebrate-next-btn");

  if (petBtns) {
    petBtns.forEach(btn => {
      btn.onclick = () => {
        petBtns.forEach(b => {
          b.classList.remove("active", "bg-white", "text-slate-800", "shadow-xs");
          b.classList.add("text-slate-600");
        });
        btn.classList.add("active", "bg-white", "text-slate-800", "shadow-xs");
        btn.classList.remove("text-slate-600");
        currentBathPet = btn.getAttribute("data-pet");
        soundEngine.playPop();
        resetBathStage();
      };
    });
  }

  if (showerHead) {
    showerHead.onclick = () => {
      triggerShowerRain();
    };
  }

  if (resetBtn) resetBtn.onclick = () => resetBathStage();
  if (nextBtn) {
    nextBtn.onclick = () => {
      const petKeys = Object.keys(BATH_PETS);
      const nextIdx = (petKeys.indexOf(currentBathPet) + 1) % petKeys.length;
      const nextKey = petKeys[nextIdx];
      const targetBtn = document.querySelector(`.bath-pet-btn[data-pet="${nextKey}"]`);
      if (targetBtn) targetBtn.click();
    };
  }

  resetBathStage();
}

function resetBathStage() {
  bathCleanProgress = 0;
  updateBathCleanUI();

  const graphic = document.getElementById("bath-animal-graphic");
  const celebration = document.getElementById("bath-celebration");
  if (celebration) celebration.classList.add("hidden");

  const petData = BATH_PETS[currentBathPet] || BATH_PETS.pig;

  if (graphic) {
    graphic.innerHTML = `
      <div class="relative w-full h-full flex flex-col items-center justify-center">
        <div id="bath-pet-body" class="text-7xl sm:text-8xl select-none transition-transform duration-300 drop-shadow-lg">
          ${petData.icon}
        </div>
        
        <!-- 4 Mud spots positioned over body -->
        <div class="bath-mud-spot absolute top-6 left-8" data-spot="1">💩</div>
        <div class="bath-mud-spot absolute top-10 right-8" data-spot="2">💩</div>
        <div class="bath-mud-spot absolute bottom-8 left-12" data-spot="3">💩</div>
        <div class="bath-mud-spot absolute bottom-10 right-12" data-spot="4">💩</div>
      </div>
    `;

    graphic.querySelectorAll(".bath-mud-spot").forEach(spot => {
      spot.addEventListener("pointerdown", () => {
        soundEngine.init();
        scrubMudSpot(spot);
      });
    });
  }
}

function scrubMudSpot(spotEl) {
  if (spotEl.classList.contains("scrubbed")) return;
  spotEl.classList.add("scrubbed");
  spotEl.innerHTML = "🧼";
  spotEl.style.animation = "bubbleFloatUp 2s ease-in-out infinite";

  soundEngine.playVoice("audio/soap_scrub.mp3", "Xoạt xoạt!");
  soundEngine.playSplash();

  bathCleanProgress++;
  updateBathCleanUI();

  if (bathCleanProgress >= TOTAL_MUD_SPOTS) {
    setTimeout(() => {
      triggerShowerRain();
    }, 600);
  }
}

function triggerShowerRain() {
  const rainContainer = document.getElementById("bath-water-rain");
  if (!rainContainer) return;

  rainContainer.classList.remove("hidden");
  rainContainer.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    const drop = document.createElement("div");
    drop.className = "bath-water-drop";
    drop.style.left = `${Math.floor(10 + Math.random() * 80)}%`;
    drop.style.top = `${Math.floor(Math.random() * 40)}px`;
    drop.style.animation = `waterFall ${0.6 + Math.random() * 0.4}s linear infinite`;
    drop.innerHTML = "💧";
    rainContainer.appendChild(drop);
  }

  soundEngine.playVoice("audio/pet_clean.mp3", "Rào rào! Nước mát quá!");

  setTimeout(() => {
    rainContainer.classList.add("hidden");
    document.querySelectorAll(".bath-mud-spot").forEach(spot => spot.remove());

    const body = document.getElementById("bath-pet-body");
    if (body) {
      body.classList.add("scale-125");
      setTimeout(() => body.classList.remove("scale-125"), 500);
    }

    if (bathCleanProgress >= TOTAL_MUD_SPOTS) {
      const celebration = document.getElementById("bath-celebration");
      if (celebration) celebration.classList.remove("hidden");
      soundEngine.playCheer();
      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      addBabyStars(3, true);
    }
  }, 1600);
}

function updateBathCleanUI() {
  const fill = document.getElementById("bath-clean-fill");
  const text = document.getElementById("bath-clean-text");
  const pct = Math.round((bathCleanProgress / TOTAL_MUD_SPOTS) * 100);
  if (fill) fill.style.width = `${pct}%`;
  if (text) text.textContent = `${pct}%`;
}

// --- H. GAME 7: BÓC TRỨNG BẤT NGỜ & SỔ HÌNH DÁN ---
const SURPRISE_TOYS = [
  { id: "dino", name: "Khủng Long Tí Hon", icon: "🦖" },
  { id: "car", name: "Siêu Xe Đua", icon: "🏎️" },
  { id: "rocket", name: "Tàu Vũ Trụ", icon: "🚀" },
  { id: "bear", name: "Gấu Bông Nhỏ", icon: "🧸" },
  { id: "unicorn", name: "Ngựa Một Sừng", icon: "🦄" },
  { id: "plane", name: "Máy Bay Đỏ", icon: "✈️" },
  { id: "crown", name: "Vương Miện", icon: "👑" },
  { id: "robot", name: "Bạn Người Máy", icon: "🤖" },
  { id: "fire", name: "Xe Cứu Hỏa", icon: "🚒" },
  { id: "wand", name: "Đũa Phép Thuật", icon: "🪄" },
  { id: "dolphin", name: "Cá Heo Xanh", icon: "🐬" },
  { id: "cat", name: "Mèo Búp Bê", icon: "🐱" }
];

let eggTapsCount = 0;
let eggCollectedStickers = [];
let currentRevealedToy = null;

function initEggGame() {
  const eggStage = document.getElementById("surprise-egg-stage");
  const newEggBtn = document.getElementById("egg-new-btn");
  const saveStickerBtn = document.getElementById("egg-save-sticker-btn");

  if (eggStage) {
    eggStage.onclick = (e) => {
      if (e.target.closest("#egg-revealed-toy")) return;
      handleEggTap();
    };
  }

  if (newEggBtn) newEggBtn.onclick = () => resetSurpriseEgg();
  if (saveStickerBtn) saveStickerBtn.onclick = () => saveCurrentToyToAlbum();

  resetSurpriseEgg();
  renderStickerAlbum();
}

function resetSurpriseEgg() {
  eggTapsCount = 0;
  currentRevealedToy = null;

  const egg = document.getElementById("giant-surprise-egg");
  const badge = document.getElementById("egg-tap-badge");
  const tapsLeft = document.getElementById("egg-taps-left");
  const revealed = document.getElementById("egg-revealed-toy");
  const crack1 = document.getElementById("egg-crack-1");
  const crack2 = document.getElementById("egg-crack-2");

  if (egg) {
    egg.classList.remove("hidden");
    egg.style.transform = "scale(1)";
  }
  if (badge) badge.classList.remove("hidden");
  if (tapsLeft) tapsLeft.textContent = "Còn 3 lần";
  if (revealed) revealed.classList.add("hidden");
  if (crack1) crack1.classList.add("opacity-0");
  if (crack2) crack2.classList.add("opacity-0");
}

function handleEggTap() {
  if (eggTapsCount >= 3) return;

  eggTapsCount++;
  soundEngine.init();
  soundEngine.playEggCrack();

  const egg = document.getElementById("giant-surprise-egg");
  const tapsLeft = document.getElementById("egg-taps-left");
  const crack1 = document.getElementById("egg-crack-1");
  const crack2 = document.getElementById("egg-crack-2");

  if (egg) {
    egg.classList.add("rotate-3", "scale-105");
    setTimeout(() => egg.classList.remove("rotate-3", "scale-105"), 180);
  }

  if (eggTapsCount === 1) {
    if (crack1) crack1.classList.remove("opacity-0");
    if (tapsLeft) tapsLeft.textContent = "Còn 2 lần gõ";
  } else if (eggTapsCount === 2) {
    if (crack2) crack2.classList.remove("opacity-0");
    if (tapsLeft) tapsLeft.textContent = "Sắp nở rồi! Còn 1 lần!";
  } else if (eggTapsCount === 3) {
    // Egg Burst!
    soundEngine.playVoice("audio/egg_surprise.mp3", "Ồ! Quả trứng mở ra món quà bí mật rồi!");
    soundEngine.playCheer();

    if (egg) egg.classList.add("hidden");
    const badge = document.getElementById("egg-tap-badge");
    if (badge) badge.classList.add("hidden");

    const revealed = document.getElementById("egg-revealed-toy");
    const toyIcon = document.getElementById("revealed-toy-icon");
    const toyName = document.getElementById("revealed-toy-name");

    const randomIndex = Math.floor(Math.random() * SURPRISE_TOYS.length);
    currentRevealedToy = SURPRISE_TOYS[randomIndex];

    if (toyIcon) toyIcon.textContent = currentRevealedToy.icon;
    if (toyName) toyName.textContent = currentRevealedToy.name;
    if (revealed) revealed.classList.remove("hidden");

    if (typeof confetti === "function") {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }
    addBabyStars(2, false);
  }
}

function saveCurrentToyToAlbum() {
  if (!currentRevealedToy) return;
  eggCollectedStickers.push(currentRevealedToy);
  renderStickerAlbum();

  soundEngine.playVoice("audio/sticker_add.mp3", "Đã dán vào sổ hình dán!");
  addBabyStars(2, true);

  const countBadge = document.getElementById("egg-collection-count");
  if (countBadge) countBadge.textContent = eggCollectedStickers.length;

  setTimeout(() => resetSurpriseEgg(), 1200);
}

function renderStickerAlbum() {
  const grid = document.getElementById("sticker-album-grid");
  if (!grid) return;

  if (eggCollectedStickers.length === 0) {
    grid.innerHTML = `
      <div class="col-span-6 py-4 text-center text-xs text-slate-400 font-bold">
        Bé hãy gõ trứng để mở món hình dán đầu tiên nhé! 🥚
      </div>
    `;
    return;
  }

  grid.innerHTML = eggCollectedStickers.map(toy => `
    <div class="p-2 bg-pink-50 rounded-xl border border-pink-200 text-center shadow-xs animate-pulse-subtle">
      <div class="text-2xl">${toy.icon}</div>
      <div class="text-[9px] font-bold text-slate-700 truncate mt-0.5">${toy.name}</div>
    </div>
  `).join("");
}

// --- I. GAME 8: ĐOÀN TÀU MÀU SẮC & XẾP TOA HÀNG ---
const CARGO_CRATES = [
  { id: "crate-red", color: "red", name: "Táo Đỏ", icon: "🍎", bg: "bg-rose-100 border-rose-500 text-rose-800" },
  { id: "crate-yellow", color: "yellow", name: "Chuối Vàng", icon: "🍌", bg: "bg-amber-100 border-amber-500 text-amber-800" },
  { id: "crate-blue", color: "blue", name: "Bóng Xanh", icon: "⚽", bg: "bg-sky-100 border-sky-500 text-sky-800" }
];

let loadedTrainWagons = new Set();

function initTrainGame() {
  const whistleBtn = document.getElementById("train-whistle-btn");
  if (whistleBtn) {
    whistleBtn.onclick = () => soundEngine.playTrainWhistle();
  }
  resetTrainGame();
}

function resetTrainGame() {
  loadedTrainWagons.clear();
  updateTrainCargoCount();

  const cheerBanner = document.getElementById("train-cheer-banner");
  if (cheerBanner) cheerBanner.classList.add("hidden");

  const train = document.getElementById("choo-choo-train");
  if (train) {
    train.style.transform = "translateX(0px)";
  }

  ["red", "yellow", "blue"].forEach(color => {
    const wagon = document.getElementById(`wagon-${color}`);
    if (wagon) {
      const slot = wagon.querySelector(".wagon-cargo-slot");
      if (slot) slot.textContent = "❓";
    }
  });

  renderCargoDock();
}

function renderCargoDock() {
  const dock = document.getElementById("train-cargo-dock");
  if (!dock) return;

  const shuffled = [...CARGO_CRATES].sort(() => Math.random() - 0.5);

  dock.innerHTML = shuffled.map(crate => `
    <div class="cargo-crate-item ${crate.bg} border-3 rounded-2xl p-2.5 text-center shadow-md cursor-pointer select-none transform transition hover:scale-105 active:scale-95" data-color="${crate.color}">
      <div class="text-3xl mb-1">${crate.icon}</div>
      <div class="font-display font-black text-xs">${crate.name}</div>
    </div>
  `).join("");

  dock.querySelectorAll(".cargo-crate-item").forEach(item => {
    item.addEventListener("click", () => {
      soundEngine.init();
      const color = item.getAttribute("data-color");
      loadCargoIntoWagon(color, item);
    });
  });
}

function loadCargoIntoWagon(color, crateEl) {
  if (loadedTrainWagons.has(color)) return;

  loadedTrainWagons.add(color);
  soundEngine.playVoice("audio/train_cargo_match.mp3", "Đã xếp đúng toa rồi!");
  addBabyStars(1, false);

  crateEl.style.opacity = "0.2";
  crateEl.style.pointerEvents = "none";

  const wagon = document.getElementById(`wagon-${color}`);
  const crateData = CARGO_CRATES.find(c => c.color === color);
  if (wagon && crateData) {
    const slot = wagon.querySelector(".wagon-cargo-slot");
    if (slot) {
      slot.textContent = crateData.icon;
      slot.classList.add("scale-125");
      setTimeout(() => slot.classList.remove("scale-125"), 300);
    }
  }

  updateTrainCargoCount();

  if (loadedTrainWagons.size === 3) {
    soundEngine.playTrainWhistle();
    soundEngine.playCheer();

    const train = document.getElementById("choo-choo-train");
    if (train) {
      train.style.transform = "translateX(250px)";
    }

    const cheerBanner = document.getElementById("train-cheer-banner");
    if (cheerBanner) cheerBanner.classList.remove("hidden");

    if (typeof confetti === "function") {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
    addBabyStars(3, true);

    setTimeout(() => resetTrainGame(), 4500);
  }
}

function updateTrainCargoCount() {
  const countBadge = document.getElementById("train-cargo-count");
  if (countBadge) countBadge.textContent = `${loadedTrainWagons.size}/3`;
}

// --- J. GAME 9: VẼ CẦU VỒNG DẠ QUANG & PHÁO HOA ---
let neonCtx = null;
let isNeonDrawing = false;
let currentNeonColor = "#f43f5e";
let currentNeonStamp = "brush";
let neonChimeCounter = 0;

function initNeonGame() {
  const canvas = document.getElementById("neon-drawing-canvas");
  const wrapper = document.getElementById("neon-canvas-wrapper");
  const clearBtn = document.getElementById("neon-clear-btn");
  const colorPills = document.querySelectorAll(".neon-color-pill");
  const stampBtns = document.querySelectorAll(".neon-stamp-btn");

  if (!canvas || !wrapper) return;

  // Set real canvas size
  canvas.width = wrapper.clientWidth || 600;
  canvas.height = wrapper.clientHeight || 380;
  neonCtx = canvas.getContext("2d");

  colorPills.forEach(pill => {
    pill.onclick = () => {
      colorPills.forEach(p => p.classList.remove("border-white", "border-2"));
      pill.classList.add("border-white", "border-2");
      currentNeonColor = pill.getAttribute("data-color");
      soundEngine.playPop();
    };
  });

  stampBtns.forEach(btn => {
    btn.onclick = () => {
      stampBtns.forEach(b => b.classList.remove("active", "border-violet-400"));
      btn.classList.add("active", "border-violet-400");
      currentNeonStamp = btn.getAttribute("data-stamp");
      soundEngine.playPop();
    };
  });

  if (clearBtn) {
    clearBtn.onclick = () => {
      if (neonCtx) {
        neonCtx.clearRect(0, 0, canvas.width, canvas.height);
        soundEngine.playPop();
      }
    };
  }

  // Pointer / Touch drawing handlers
  const startDraw = (x, y) => {
    isNeonDrawing = true;
    soundEngine.init();

    const hint = document.getElementById("neon-hint-text");
    if (hint) hint.classList.add("hidden");

    if (currentNeonStamp === "butterfly") {
      drawNeonButterfly(x, y);
      return;
    } else if (currentNeonStamp === "firework") {
      drawNeonFirework(x, y);
      return;
    }

    neonCtx.beginPath();
    neonCtx.moveTo(x, y);
  };

  const moveDraw = (x, y) => {
    if (!isNeonDrawing || currentNeonStamp !== "brush") return;
    neonCtx.lineTo(x, y);

    let drawColor = currentNeonColor;
    if (drawColor === "rainbow") {
      const rainbowColors = ["#f43f5e", "#facc15", "#34d399", "#22d3ee", "#c084fc"];
      drawColor = rainbowColors[neonChimeCounter % rainbowColors.length];
    }

    neonCtx.strokeStyle = drawColor;
    neonCtx.shadowColor = drawColor;
    neonCtx.shadowBlur = 18;
    neonCtx.lineWidth = 14;
    neonCtx.lineCap = "round";
    neonCtx.lineJoin = "round";
    neonCtx.stroke();

    neonChimeCounter++;
    if (neonChimeCounter % 4 === 0) {
      soundEngine.playNeonChime(neonChimeCounter);
    }
  };

  const endDraw = () => {
    isNeonDrawing = false;
  };

  // Mouse events
  canvas.onmousedown = (e) => {
    const rect = canvas.getBoundingClientRect();
    startDraw(e.clientX - rect.left, e.clientY - rect.top);
  };
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    moveDraw(e.clientX - rect.left, e.clientY - rect.top);
  };
  window.onmouseup = endDraw;

  // Touch events for tablets / mobile
  canvas.ontouchstart = (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    startDraw(touch.clientX - rect.left, touch.clientY - rect.top);
  };
  canvas.ontouchmove = (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    moveDraw(touch.clientX - rect.left, touch.clientY - rect.top);
  };
  canvas.ontouchend = endDraw;
}

function drawNeonButterfly(x, y) {
  if (!neonCtx) return;
  neonCtx.font = "40px sans-serif";
  neonCtx.shadowColor = "#38bdf8";
  neonCtx.shadowBlur = 20;
  neonCtx.fillText("🦋", x - 20, y + 15);
  soundEngine.playVoice("audio/sparkle_magic.mp3", "Bươm bướm phát sáng!");
  addBabyStars(1, false);
}

function drawNeonFirework(x, y) {
  if (!neonCtx) return;
  neonCtx.font = "45px sans-serif";
  neonCtx.shadowColor = "#facc15";
  neonCtx.shadowBlur = 25;
  neonCtx.fillText("🎆", x - 22, y + 18);
  soundEngine.playVoice("audio/firework_cheer.mp3", "Bùm chíu! Pháo hoa rực rỡ!");
  if (typeof confetti === "function") {
    confetti({ particleCount: 50, spread: 60, origin: { x: x / window.innerWidth, y: y / window.innerHeight } });
  }
  addBabyStars(2, false);
}

// --- K. GAME 10: XẾP THÁP KHỐI GỖ & ĐẬP ĐỔ VUI NHỘN ---
let towerHeight = 0; // 0..6
const MAX_TOWER_HEIGHT = 6;
const TOWER_BLOCKS_DATA = [
  { level: 1, name: "Khối Đỏ Chắc Chắn", bg: "bg-rose-500 border-rose-700", width: "w-48", height: "h-11", icon: "🟥" },
  { level: 2, name: "Khối Vàng Tầng 2", bg: "bg-amber-400 border-amber-600", width: "w-40", height: "h-11", icon: "🟨" },
  { level: 3, name: "Khối Xanh Lá Cây", bg: "bg-emerald-500 border-emerald-700", width: "w-32", height: "h-11", icon: "🟩" },
  { level: 4, name: "Khối Lam Nhẹ Nhàng", bg: "bg-sky-500 border-sky-700", width: "w-28", height: "h-11", icon: "🟦" },
  { level: 5, name: "Mái Nhà Tím", bg: "bg-purple-500 border-purple-700", width: "w-20", height: "h-11", icon: "🟪" },
  { level: 6, name: "Ngôi Sao Đỉnh Tháp", bg: "bg-yellow-300 border-yellow-500", width: "w-14", height: "h-11", icon: "⭐" }
];

function initTowerGame() {
  const addBtn = document.getElementById("tower-add-block-btn");
  const toppleBtn = document.getElementById("tower-topple-btn");
  const yard = document.getElementById("tower-yard");

  if (addBtn) addBtn.onclick = (e) => { e.stopPropagation(); addTowerBlock(); };
  if (toppleBtn) toppleBtn.onclick = (e) => { e.stopPropagation(); toppleTower(); };

  if (yard) {
    yard.onclick = () => {
      if (towerHeight >= MAX_TOWER_HEIGHT) {
        toppleTower();
      } else {
        addTowerBlock();
      }
    };
  }

  resetTower();
}

function resetTower() {
  towerHeight = 0;
  updateTowerCountBadge();

  const stack = document.getElementById("tower-blocks-stack");
  const bird = document.getElementById("tower-bird");

  if (stack) stack.innerHTML = "";
  if (bird) bird.classList.add("hidden");
}

function addTowerBlock() {
  if (towerHeight >= MAX_TOWER_HEIGHT) return;

  towerHeight++;
  soundEngine.init();
  soundEngine.playBlockStack(towerHeight);
  addBabyStars(1, false);
  updateTowerCountBadge();

  const stack = document.getElementById("tower-blocks-stack");
  const blockData = TOWER_BLOCKS_DATA[towerHeight - 1];

  if (stack && blockData) {
    const block = document.createElement("div");
    block.className = `tower-block ${blockData.bg} ${blockData.width} ${blockData.height} border-3 rounded-xl shadow-md flex items-center justify-center text-white text-xs font-black transition-transform duration-300`;
    block.innerHTML = `<span>${blockData.icon}</span>`;
    stack.appendChild(block);
  }

  if (towerHeight >= MAX_TOWER_HEIGHT) {
    // Little bird perches on top!
    const bird = document.getElementById("tower-bird");
    if (bird) {
      bird.classList.remove("hidden");
      bird.style.top = "100px";
    }

    soundEngine.playVoice("audio/sound_cry_duck.mp3", "Cúc cu! Tháp cao quá!");
    if (stack) stack.classList.add("animate-pulse");
  }
}

function toppleTower() {
  if (towerHeight === 0) return;

  soundEngine.init();
  soundEngine.playTowerCrash();
  soundEngine.playCheer();

  const stack = document.getElementById("tower-blocks-stack");
  const yard = document.getElementById("tower-yard");
  const bird = document.getElementById("tower-bird");

  if (bird) bird.classList.add("hidden");

  if (yard) {
    yard.classList.add("animate-bounce");
    setTimeout(() => yard.classList.remove("animate-bounce"), 600);
  }

  if (stack) {
    stack.querySelectorAll(".tower-block").forEach((block, idx) => {
      block.classList.add("tower-toppled");
      block.style.transform = `translate(${(idx % 2 === 0 ? 1 : -1) * (60 + idx * 25)}px, ${30 + idx * 10}px) rotate(${(idx % 2 === 0 ? 45 : -45) * idx}deg)`;
      block.style.opacity = "0.4";
    });
  }

  if (typeof confetti === "function") {
    confetti({ particleCount: 85, spread: 80, origin: { y: 0.6 } });
  }
  addBabyStars(3, true);

  setTimeout(() => resetTower(), 2500);
}

function updateTowerCountBadge() {
  const badge = document.getElementById("tower-count-badge");
  if (badge) badge.textContent = `${towerHeight}/${MAX_TOWER_HEIGHT}`;
}


// ========================================================
// 3. MONTESSORI 50+ GAMES DIRECTORY & FILTERS
// ========================================================
const GAMES_DATA = [
  // --- NHÓM 1: VẬN ĐỘNG THÔ (GROSS MOTOR) ---
  {
    id: "gm-1",
    title: "Thao Trường Vượt Núi Gối Đệm",
    category: "gross-motor",
    categoryLabel: "Vận Động Thô",
    categoryBadgeBg: "bg-amber-100 text-amber-800",
    time: "medium",
    timeText: "15 - 20 phút",
    space: "living-room",
    mood: "hyper",
    materials: "none",
    prepTime: "2 phút",
    summary: "Xếp các gối ôm, chăn đệm thành dãy chướng ngại vật để bé bò, trèo, lăn và nhảy qua an toàn.",
    materialsList: ["3-5 chiếc gối ôm, gối ngủ", "1 tấm chăn cuộn tròn", "Thảm xốp hoặc sàn nhà sạch"],
    steps: [
      "Đặt gối nối tiếp nhau tạo thành dãy 'núi nhỏ' từ ghế sofa ra giữa phòng.",
      "Làm mẫu trước: Mẹ hô 'Leo núi nào!' rồi bước qua hoặc bò qua gối với vẻ mặt hào hứng.",
      "Khuyến khích bé bò qua, bước cao đùi hoặc trườn qua khe giữa hai chiếc gối.",
      "Ở đích đến, mẹ dang tay chờ sẵn để ôm và đập tay (High-five) chúc mừng bé."
    ],
    benefits: ["Phát triển cảm thụ bản thể (Proprioception)", "Tăng trương lực cơ chân và thăng bằng", "Giải phóng năng lượng dư thừa cực tốt"],
    safetyNote: "Đảm bảo khu vực xung quanh không có cạnh bàn sắt nhọn hoặc sàn trơn trượt."
  },
  {
    id: "gm-2",
    title: "Đá Bóng Vào Khung Thành Thùng Carton",
    category: "gross-motor",
    categoryLabel: "Vận Động Thô",
    categoryBadgeBg: "bg-amber-100 text-amber-800",
    time: "quick",
    timeText: "10 - 15 phút",
    space: "living-room",
    mood: "hyper",
    materials: "cardboard",
    prepTime: "3 phút",
    summary: "Khoét một lỗ tròn to ở đáy thùng carton, biến thành khung thành để bé tập co chân đá bóng hoặc ném bóng.",
    materialsList: ["1 thùng carton cũ (thùng mì tôm, hộp bánh)", "Quả bóng nhựa mềm hoặc bóng cuộn từ tất vớ", "Kéo cắt"],
    steps: [
      "Khoét một ô cửa vòm to ở mặt bên của thùng carton.",
      "Đặt thùng dựa sát vào tường.",
      "Đưa bóng cho bé cách thùng 1 - 1.5 mét, làm mẫu co một chân ra sau và sút bóng vào cửa vòm.",
      "Mỗi khi bóng vào hộp, tạo tiếng động vui nhộn 'VÀOOOO!' để kích thích bé hào hứng."
    ],
    benefits: ["Luyện thăng bằng trên 1 chân khi vung chân sút", "Phát triển định hướng không gian và phối hợp mắt - chân"],
    safetyNote: "Dùng bóng mềm hoặc bóng vải để tránh va đập mạnh vào đồ đạc trong phòng."
  },
  {
    id: "gm-3",
    title: "Cây Cầu Băng Dính Thần Kỳ",
    category: "gross-motor",
    categoryLabel: "Vận Động Thô",
    categoryBadgeBg: "bg-amber-100 text-amber-800",
    time: "quick",
    timeText: "10 phút",
    space: "small-corner",
    mood: "hyper",
    materials: "tape",
    prepTime: "2 phút",
    summary: "Dán một đường băng dính thẳng hoặc ngoằn ngoèo trên sàn nhà. Bé hóa thân thành chú mèo đi khéo léo trên cầu.",
    materialsList: ["1 cuộn băng dính giấy (băng keo giấy dễ bóc không để lại vết keo)"],
    steps: [
      "Dán 1 đường thẳng dài khoảng 2 - 3 mét trên sàn nhà.",
      "Thách thức bé: 'Đây là cây cầu bắc qua sông cá sấu, con hãy đi từng bước trên vạch kẻ không được rơi xuống nước nhé!'.",
      "Khi bé quen, có thể dán đường zig-zag hoặc đường tròn uốn lượn.",
      "Tăng độ khó: Vừa đi vừa bê 1 quả bóng nhỏ trên hai tay."
    ],
    benefits: ["Cải thiện dáng đi thăng bằng", "Tập trung chú ý vào tọa độ bước chân"],
    safetyNote: "Nên cho bé đi chân trần để lòng bàn chân bám dính tốt vào mặt sàn."
  },

  // --- NHÓM 2: GIÁC QUAN & VẬN ĐỘNG TINH (SENSORY & FINE MOTOR) ---
  {
    id: "sf-1",
    title: "Giải Cứu Thú Cưng Mắc Kẹt",
    category: "sensory-fine",
    categoryLabel: "Giác Quan & Tinh",
    categoryBadgeBg: "bg-emerald-100 text-emerald-800",
    time: "medium",
    timeText: "15 phút",
    space: "small-corner",
    mood: "calm",
    materials: "tape",
    prepTime: "3 phút",
    summary: "Dán cố định các con thú đồ chơi nhỏ lên mặt bàn hoặc đáy khay bằng băng dính, bé dùng ngón tay bóc gỡ giải cứu.",
    materialsList: ["Băng dính giấy (Masking tape)", "3-5 con thú nhựa nhỏ hoặc ô tô đồ chơi", "Mặt bàn ăn hoặc khay phẳng"],
    steps: [
      "Đặt thú bông hoặc ô tô lên mặt phẳng.",
      "Dán chằng chịt 2-3 dải băng dính đè lên đồ chơi.",
      "Kể chuyện: 'Ôi bạn gấu bị vướng vào lưới rồi, bác cứu hộ tí hon ơi giúp bạn với!'.",
      "Hướng dẫn bé dùng móng ngón trỏ và ngón cái cậy mép băng dính rồi kéo dứt khoát ra."
    ],
    benefits: ["Rèn luyện tuyệt đỉnh khớp ngón tay kìm (Pincer Grasp)", "Rèn tính kiên trì và giải quyết vấn đề"],
    safetyNote: "Thu gom băng dính sau khi chơi xong, không để bé ngậm vào miệng."
  },
  {
    id: "sf-2",
    title: "Hộp Báu Vật Giác Quan Gạo Nhuộm Màu",
    category: "sensory-fine",
    categoryLabel: "Giác Quan & Tinh",
    categoryBadgeBg: "bg-emerald-100 text-emerald-800",
    time: "long",
    timeText: "25 - 30 phút",
    space: "small-corner",
    mood: "calm",
    materials: "cups",
    prepTime: "5 phút",
    summary: "Khay chứa gạo hoặc mì nui khô giấu các món đồ chơi nhỏ. Bé dùng thìa xúc, xới và tìm kho báu.",
    materialsList: ["1 chậu nhựa hoặc khay lớn", "1 bát gạo khô hoặc ngũ cốc", "Cốc nhựa, thìa múc canh", "Vài quả bóng nhỏ hoặc đồ chơi giấu bên dưới"],
    steps: [
      "Đổ gạo vào chậu, chôn giấu các món đồ chơi nhỏ dưới lớp gạo.",
      "Cho bé dùng tay luồn sâu vào gạo cảm nhận cảm giác mát mịn của từng hạt gạo.",
      "Đưa thìa cho bé xúc gạo sang cốc nhựa, lắng nghe tiếng hạt rơi lạo xạo vui tai.",
      "Khi bé xúc thấy món đồ chơi hé ra, cùng hô to 'A, tìm thấy kho báu rồi!'."
    ],
    benefits: ["Kích thích xúc giác đa tầng", "Phát triển vận động xoay cổ tay khi xúc thìa", "Giúp bé tĩnh tâm, giảm hẳn quấy khóc"],
    safetyNote: "Luôn ngồi cạnh bé để đảm bảo bé không cho gạo sống vào mũi hoặc miệng."
  },
  {
    id: "sf-3",
    title: "Bóc Vỏ Trứng Luộc / Bóc Vỏ Chuối",
    category: "sensory-fine",
    categoryLabel: "Giác Quan & Tinh",
    categoryBadgeBg: "bg-emerald-100 text-emerald-800",
    time: "quick",
    timeText: "10 phút",
    space: "small-corner",
    mood: "calm",
    materials: "none",
    prepTime: "1 phút",
    summary: "Hoạt động thực hành cuộc sống chuẩn Montessori: Bé tự tay bóc vỏ chuối hoặc vỏ trứng gà luộc chín.",
    materialsList: ["1 quả chuối chín (khía nhẹ đầu) hoặc 1 quả trứng luộc đã gõ nứt vỏ", "1 đĩa nhỏ đựng vỏ"],
    steps: [
      "Khía nhẹ một chút vỏ chuối để lộ phần cuống dễ cầm.",
      "Mẫu cho bé: Dùng 2 ngón tay túm dải vỏ kéo xuôi xuống dưới.",
      "Với trứng luộc: Hướng dẫn bé nhặt từng mảnh vỏ vỡ bỏ vào đĩa nhỏ bên cạnh.",
      "Sau khi bóc xong, cùng bé thưởng thức thành quả ngon lành!"
    ],
    benefits: ["Xây dựng sự tự tin 'Con tự làm được'", "Điều chỉnh lực bóp của các đầu ngón tay không làm nát ruột"],
    safetyNote: "Đảm bảo trứng đã nguội hẳn trước khi đưa cho bé."
  },

  // --- NHÓM 3: NGÔN NGỮ & NHẠC CẢM (LANGUAGE & MUSIC) ---
  {
    id: "lg-1",
    title: "Chiếc Túi Bí Mật: Thò Tay Đoán Vật",
    category: "language",
    categoryLabel: "Ngôn Ngữ & Nhạc",
    categoryBadgeBg: "bg-sky-100 text-sky-800",
    time: "medium",
    timeText: "15 phút",
    space: "small-corner",
    mood: "calm",
    materials: "socks",
    prepTime: "2 phút",
    summary: "Cho các đồ vật quen thuộc vào túi vải hoặc vỏ gối. Bé thò tay sờ, mô tả và đoán tên đồ vật.",
    materialsList: ["1 túi vải rút hoặc 1 chiếc tất to / vỏ gối sạch", "Các vật quen thuộc: Quả bóng tròn, chiếc thìa lạnh, con vịt cao su, chiếc bàn chải"],
    steps: [
      "Cho từng món đồ vào túi mà không để bé nhìn thấy.",
      "Bảo bé nhắm mắt hoặc chỉ thò tay vào bên trong sờ nắn.",
      "Mẹ gợi ý từ ngữ mô tả: 'Nó tròn hay dài?', 'Nó mềm hay cứng?', 'Lạnh hay ấm?'.",
      "Bé đoán xong thì rút ra kiểm tra kết quả và gọi tên chính xác đồ vật."
    ],
    benefits: ["Bùng nổ vốn tính từ mô tả (tròn, méo, mềm, nhẵn, ráp)", "Liên kết giữa xúc giác và tư duy ngôn ngữ trừu tượng"],
    safetyNote: "Không để vật sắc nhọn hoặc vật có góc cạnh nguy hiểm vào túi."
  },
  {
    id: "lg-2",
    title: "Ban Nhạc Xoong Nồi & Gõ Nhịp Đồng Dao",
    category: "language",
    categoryLabel: "Ngôn Ngữ & Nhạc",
    categoryBadgeBg: "bg-sky-100 text-sky-800",
    time: "quick",
    timeText: "10 - 15 phút",
    space: "living-room",
    mood: "hyper",
    materials: "none",
    prepTime: "2 phút",
    summary: "Lật úp nồi nhôm, hộp bánh quy và dùng thìa gỗ gõ nhịp theo các bài hát thiếu nhi quen thuộc.",
    materialsList: ["2 chiếc xoong nồi nhỏ lật úp", "2 chiếc thìa gỗ hoặc thìa silicon", "Các bài đồng dao: Dung dăng dung dẻ, Con cào cào..."],
    steps: [
      "Xếp các nồi có kích thước khác nhau tạo thành 'bộ trống'.",
      "Mẹ gõ thử thìa vào từng đáy nồi để bé nhận biết âm thanh: 'Cái này kêu boong boong trầm, cái này kêu keng keng thanh'.",
      "Vừa gõ vừa hát: 'Dung dăng dung dẻ / Dắt trẻ đi chơi...', ngừng lại ở chữ cuối để bé gõ 1 nhịp chốt.",
      "Tập nhịp độ: Gõ thật nhanh (mưa rào) rồi gõ thật chậm (mưa phùn)."
    ],
    benefits: ["Cảm thụ nhịp điệu và âm lượng (to - nhỏ, nhanh - chậm)", "Phát triển vùng não xử lý ngữ điệu và phát âm"],
    safetyNote: "Nên dùng thìa gỗ/silicon để âm thanh không quá chói tai."
  },
  {
    id: "lg-3",
    title: "Trò Chơi 'Mẹ Bảo Làm Gì' (Simon Says Bản 2 Tuổi)",
    category: "language",
    categoryLabel: "Ngôn Ngữ & Nhạc",
    categoryBadgeBg: "bg-sky-100 text-sky-800",
    time: "quick",
    timeText: "5 - 10 phút",
    space: "small-corner",
    mood: "hyper",
    materials: "none",
    prepTime: "0 phút",
    summary: "Ra hiệu lệnh 1-2 bước kèm điệu bộ hài hước để rèn khả năng nghe hiểu ngôn ngữ chỉ huy của bé.",
    materialsList: ["Không cần dụng cụ"],
    steps: [
      "Mẹ đứng đối diện bé, cười tươi và nói to: 'Mẹ bảo: Sờ vào cái mũi xinh!' -> Mẹ sờ mũi mình.",
      "Tiếp tục: 'Mẹ bảo: Vỗ tay 3 cái!', 'Mẹ bảo: Xoay một vòng!', 'Mẹ bảo: Vuốt bụng no căng!'.",
      "Đan xen các lệnh ngộ nghĩnh: 'Mẹ bảo: Kêu gâu gâu như cún con!'.",
      "Đổi vai: Bảo bé ra lệnh để mẹ làm theo."
    ],
    benefits: ["Tăng khả năng xử lý thông tin thính giác", "Phát triển vốn từ vựng về bộ phận cơ thể và động từ hành động"],
    safetyNote: "Không ra các lệnh có nguy cơ ngã (như nhảy lò cò trên sàn trơn)."
  },

  // --- NHÓM 4: NHẬP VAI ĐẦU ĐỜI & TƯỞNG TƯỢNG (PRETEND PLAY) ---
  {
    id: "pr-1",
    title: "Bác Sĩ Khám Bệnh Cho Gấu Bông",
    category: "pretend",
    categoryLabel: "Nhập Vai",
    categoryBadgeBg: "bg-rose-100 text-rose-800",
    time: "medium",
    timeText: "15 - 20 phút",
    space: "small-corner",
    mood: "calm",
    materials: "socks",
    prepTime: "2 phút",
    summary: "Dạy bé đồng cảm và yêu thương qua việc đóng vai bác sĩ chăm sóc người bạn gấu bị 'sốt'.",
    materialsList: ["1 chú gấu bông hoặc búp bê", "1 chiếc thìa nhựa (làm nhiệt kế)", "1 chiếc khăn nhỏ (đắp trán hạ sốt)"],
    steps: [
      "Đặt gấu bông nằm trên giường: 'Ôi bạn Gấu bị hắt xì hơi rồi, trán bạn nóng quá!'.",
      "Đưa thìa nhựa cho bé kẹp vào nách gấu: 'Bác sĩ đo nhiệt độ cho bạn xem nào'.",
      "Hướng dẫn bé lấy khăn ấp lên trán gấu, xoa lưng và dỗ dành 'Mau khỏe nhé Gấu ơi'.",
      "Cho gấu 'uống thuốc' bằng cách đút nước thìa."
    ],
    benefits: ["Nuôi dưỡng lòng trắc ẩn và trí tuệ cảm xúc (EQ)", "Giảm bớt nỗi sợ hãi của chính bé khi phải đi gặp bác sĩ thật"],
    safetyNote: "Đồ chơi vải sạch sẽ, không bụi bặm."
  },
  {
    id: "pr-2",
    title: "Chuyến Tàu Hỏa Thùng Carton",
    category: "pretend",
    categoryLabel: "Nhập Vai",
    categoryBadgeBg: "bg-rose-100 text-rose-800",
    time: "long",
    timeText: "20 - 30 phút",
    space: "living-room",
    mood: "hyper",
    materials: "cardboard",
    prepTime: "3 phút",
    summary: "Biến thùng carton to thành toa tàu. Bé ngồi bên trong làm bác lái tàu xình xịch khắp nhà.",
    materialsList: ["1 thùng carton đủ to để bé ngồi vào", "1 chiếc nắp hộp tròn hoặc đĩa giấy làm vô lăng lái", "1 đoạn dây dù chắc chắn buộc kéo thùng (nếu có)"],
    steps: [
      "Mở nắp thùng carton, đặt một tấm gối êm dưới đáy thùng.",
      "Mời bé bước vào ngồi, đưa đĩa giấy làm vô lăng.",
      "Mẹ vừa giả tiếng còi tàu: 'Tu tu xình xịch! Tàu hỏa rời ga nào!' vừa từ từ đẩy hoặc kéo thùng trượt nhẹ trên sàn.",
      "Tàu dừng ở các 'ga': Ga Phòng Bếp, Ga Ghế Sofa để đón khách (búp bê/thú bông)."
    ],
    benefits: ["Thỏa mãn cảm giác ôm ấp an toàn trong không gian hẹp (Sensory nest)", "Kích hoạt trí tưởng tượng không gian sống động"],
    safetyNote: "Kiểm tra kỹ ghim bấm kim loại trên mép thùng carton và loại bỏ sạch sẽ trước khi cho bé ngồi."
  },
  {
    id: "pr-3",
    title: "Tiệm Cơm / Tiệm Bánh Tí Hon",
    category: "pretend",
    categoryLabel: "Nhập Vai",
    categoryBadgeBg: "bg-rose-100 text-rose-800",
    time: "medium",
    timeText: "15 - 20 phút",
    space: "small-corner",
    mood: "calm",
    materials: "cups",
    prepTime: "2 phút",
    summary: "Bé đóng vai đầu bếp dùng bát nhựa, thìa múc các mẩu giấy vụn hoặc khối gỗ mời bố mẹ thưởng thức.",
    materialsList: ["Bát nhựa, thìa nhựa gia đình", "Vài chiếc lá cây sạch hoặc các khối xốp/giấy màu vo viên làm thức ăn"],
    steps: [
      "Bày các bát nhựa lên bàn con.",
      "Bố mẹ đóng vai khách hàng đói bụng: 'Bác đầu bếp ơi, cho tôi gọi một bát phở/một cốc sinh tố nhé!'.",
      "Bé sẽ dùng thìa khuấy tròn trong bát, gắp từng 'món ăn' bỏ vào đĩa và bê ra mời bố mẹ.",
      "Bố mẹ ăn giả vờ ngon lành: 'Ngon tuyệt cú mèo! Cảm ơn bác đầu bếp!'. Bày tỏ niềm vui để khích lệ bé."
    ],
    benefits: ["Tái hiện kinh nghiệm xã hội thường ngày", "Thực hành quy tắc giao tiếp lịch sự (mời chào, cảm ơn)"],
    safetyNote: "Không dùng vật nhỏ dễ nuốt làm thức ăn giả nếu bé còn thói quen cho đồ vào miệng."
  },

  // --- NHÓM 5: TƯ DUY & PHÂN LOẠI MÀU SẮC (COGNITIVE & SORTING) ---
  {
    id: "cg-1",
    title: "Ghép Đôi Tất Vớ Cùng Màu",
    category: "cognitive",
    categoryLabel: "Tư Duy & Logic",
    categoryBadgeBg: "bg-indigo-100 text-indigo-800",
    time: "quick",
    timeText: "10 phút",
    space: "small-corner",
    mood: "calm",
    materials: "socks",
    prepTime: "1 phút",
    summary: "Đổ 4-5 đôi tất vớ nhiều màu sắc ra sàn, bé tìm chiếc tất giống hệt để ghép thành cặp.",
    materialsList: ["4 - 6 đôi tất của bé và bố mẹ với màu sắc/họa tiết tương phản rõ rệt (đỏ, vàng, sọc...)"],
    steps: [
      "Trộn lẫn các chiếc tất thành một đống nhỏ.",
      "Mẹ cầm 1 chiếc tất màu vàng lên: 'Chiếc tất vàng của bạn thỏ đâu rồi nhỉ? Bé tìm chiếc giống hệt cho mẹ với!'.",
      "Bé quan sát màu sắc, tìm kiếm và so sánh đối chiếu.",
      "Khi tìm được, hướng dẫn bé cuộn hai chiếc lại thành một quả bóng tròn xinh xắn."
    ],
    benefits: ["Rèn kỹ năng nhận biết thị giác và đối chiếu hình dạng/màu sắc (Visual Discrimination)", "Tạo thói quen phụ giúp mẹ gấp quần áo"],
    safetyNote: "Tất sạch, không bám bụi."
  },
  {
    id: "cg-2",
    title: "Tìm Nắp Vừa Vặn Cho Hộp",
    category: "cognitive",
    categoryLabel: "Tư Duy & Logic",
    categoryBadgeBg: "bg-indigo-100 text-indigo-800",
    time: "quick",
    timeText: "10 - 15 phút",
    space: "small-corner",
    mood: "calm",
    materials: "cups",
    prepTime: "2 phút",
    summary: "Thu thập 4-5 chiếc hộp nhựa đựng thực phẩm đủ kích cỡ to nhỏ, tháo rời nắp và để bé thử đậy nắp đúng.",
    materialsList: ["4 - 5 hộp nhựa thực phẩm (hộp tròn to, hộp vuông nhỏ, hộp chữ nhật...)", "Nắp hộp tương ứng"],
    steps: [
      "Bày các hộp ra sàn, đặt các nắp lẫn lộn bên cạnh.",
      "Bé cầm 1 chiếc nắp thử đặt lên các hộp.",
      "Nếu nắp quá nhỏ hoặc quá to, mẹ chỉ dẫn: 'Ôi chưa vừa rồi, nắp này to hơn cái hộp này. Thử hộp khác xem sao con?'.",
      "Bé dùng lòng bàn tay ấn mạnh 'tách' một cái khi nắp khớp vào miệng hộp."
    ],
    benefits: ["Hiểu khái niệm kích thước không gian: To hơn - Nhỏ hơn - Bằng nhau", "Phối hợp 2 tay: Một tay giữ hộp, một tay ấn nắp"],
    safetyNote: "Dùng hộp nhựa an toàn không có cạnh sắc bén."
  },
  {
    id: "cg-3",
    title: "Thả Que Màu Vào Khe Hộp Bí Ẩn",
    category: "cognitive",
    categoryLabel: "Tư Duy & Logic",
    categoryBadgeBg: "bg-indigo-100 text-indigo-800",
    time: "medium",
    timeText: "15 phút",
    space: "small-corner",
    mood: "calm",
    materials: "cardboard",
    prepTime: "3 phút",
    summary: "Rạch các khe hẹp trên nắp hộp carton, tô viền màu quanh khe. Bé phân loại que kem hoặc nắp chai thả vào đúng lỗ.",
    materialsList: ["1 hộp carton nhỏ hoặc hộp sữa bột rỗng", "Vài que kem gỗ hoặc nắp chai nhựa có màu", "Bút dạ màu (đỏ, xanh lá, vàng)"],
    steps: [
      "Dùng dao rạch 3 khe hẹp trên nắp hộp.",
      "Tô viền 1 khe màu Đỏ, 1 khe màu Xanh, 1 khe màu Vàng.",
      "Đưa cho bé chiếc que đỏ: 'Que màu đỏ sẽ chui vào nhà màu đỏ nhé!'.",
      "Bé khéo léo xoay dọc chiếc que để đút lọt qua khe và nghe tiếng rơi 'cạch' thích thú bên trong hộp."
    ],
    benefits: ["Hiểu sự tồn tại của vật thể (Object Permanence) - vật rơi vào trong vẫn còn đó", "Phân loại màu sắc chính xác", "Khéo léo điều khiển hướng que"],
    safetyNote: "Que kem nhẵn mịn không có dằm gỗ."
  }
];

// ========================================================
// 4. GENERAL PAGE LOGIC
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Global Audio Unlock on first user gesture
  const unlockAudio = () => {
    soundEngine.init();
  };
  window.addEventListener("click", unlockAudio, { passive: true });
  window.addEventListener("touchstart", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });

  // Initialize Kids Playzone Interactive Features
  initPlayzone();

  // Initialize Game Catalog & UI
  renderGames("all");
  setupFilterButtons();
  setupSearchInput();
  setupGenerator();
  setupFaqAccordion();
  setupLeadForm();
  setupModal();
  setupMobileMenu();
});

// Render Catalog Cards
function renderGames(filterCategory = "all", searchTerm = "") {
  const grid = document.getElementById("games-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = GAMES_DATA.filter(game => {
    const matchesCategory = (filterCategory === "all" || game.category === filterCategory);
    const matchesSearch = !searchTerm || 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      game.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.materialsList.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500">
        <div class="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mx-auto mb-4">
          <i class="fa-solid fa-face-meh"></i>
        </div>
        <h4 class="font-display font-bold text-lg text-slate-800">Không tìm thấy trò chơi phù hợp</h4>
        <p class="text-sm text-slate-500 mt-1">Hãy thử tìm từ khóa khác hoặc bấm nút "Tất Cả Trò Chơi" nhé ba mẹ!</p>
      </div>
    `;
    return;
  }

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card bg-white rounded-3xl p-6 border border-amber-100/90 shadow-sm flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${game.categoryBadgeBg}">
            ${game.categoryLabel}
          </span>
          <span class="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <i class="fa-regular fa-clock text-amber-500"></i> ${game.timeText}
          </span>
        </div>

        <h3 class="font-display font-extrabold text-lg text-slate-900 leading-snug group-hover:text-orange-600 transition">
          ${game.title}
        </h3>

        <p class="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
          ${game.summary}
        </p>

        <div class="mt-4 pt-4 border-t border-slate-100">
          <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Dụng cụ 0đ cần có:</div>
          <div class="flex flex-wrap gap-1.5">
            ${game.materialsList.map(mat => `<span class="inline-block bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-lg font-medium">${mat}</span>`).join("")}
          </div>
        </div>
      </div>

      <div class="mt-6 pt-3 flex items-center justify-between border-t border-slate-100">
        <button onclick="openGameModal('${game.id}')" class="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition">
          <span>Xem hướng dẫn chi tiết</span>
          <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </button>

        <button onclick="bookmarkGame(this, '${game.id}')" class="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 flex items-center justify-center text-xs transition" title="Lưu trò chơi yêu thích">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setupFilterButtons() {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      soundEngine.init();
      soundEngine.playPop();
      buttons.forEach(b => {
        b.classList.remove("active");
        b.classList.add("bg-white", "text-slate-600");
      });
      btn.classList.add("active");
      btn.classList.remove("bg-white", "text-slate-600");

      const category = btn.getAttribute("data-category");
      const searchVal = document.getElementById("game-search-input").value;
      renderGames(category, searchVal);
    });
  });
}

function setupSearchInput() {
  const input = document.getElementById("game-search-input");
  if (!input) return;

  input.addEventListener("input", (e) => {
    const activeBtn = document.querySelector(".category-btn.active");
    const category = activeBtn ? activeBtn.getAttribute("data-category") : "all";
    renderGames(category, e.target.value);
  });
}

// 30-Second Activity Picker
function setupGenerator() {
  const btn = document.getElementById("generate-game-btn");
  const resultContainer = document.getElementById("generator-result");

  if (!btn || !resultContainer) return;

  btn.addEventListener("click", () => {
    soundEngine.init();
    soundEngine.playPop();

    const timeVal = document.getElementById("select-time").value;
    const spaceVal = document.getElementById("select-space").value;
    const moodVal = document.getElementById("select-mood").value;
    const matVal = document.getElementById("select-material").value;

    let candidates = GAMES_DATA.filter(g => {
      let match = true;
      if (timeVal !== "any" && g.time !== timeVal) match = false;
      if (spaceVal !== "any" && g.space !== spaceVal) match = false;
      if (moodVal !== "any" && g.mood !== moodVal) match = false;
      if (matVal !== "any" && g.materials !== matVal && g.materials !== "none") match = false;
      return match;
    });

    if (candidates.length === 0) {
      candidates = GAMES_DATA.filter(g => {
        return (moodVal === "any" || g.mood === moodVal) || (timeVal === "any" || g.time === timeVal);
      });
    }

    if (candidates.length === 0) {
      candidates = GAMES_DATA;
    }

    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    if (typeof confetti === "function") {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }

    soundEngine.playCheer();

    resultContainer.classList.remove("hidden");
    resultContainer.innerHTML = `
      <div class="bg-gradient-to-br from-amber-50 via-orange-50/50 to-white rounded-2xl p-6 border border-orange-200 shadow-sm animate-pulse-subtle">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-black uppercase px-3 py-1 rounded-full ${selected.categoryBadgeBg}">
              ${selected.categoryLabel}
            </span>
            <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              <i class="fa-solid fa-thumbs-up text-[10px]"></i> Phù hợp nhất cho bé lúc này
            </span>
          </div>
          <span class="text-xs text-slate-500 font-bold">Chuẩn bị: ${selected.prepTime}</span>
        </div>

        <h3 class="font-display font-black text-xl sm:text-2xl text-slate-900 mt-2">
          ${selected.title}
        </h3>

        <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          ${selected.summary}
        </p>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-amber-100">
          <div>
            <strong class="text-slate-800 block mb-1">📦 Dụng cụ cần chuẩn bị:</strong>
            <span class="text-slate-600">${selected.materialsList.join(", ")}</span>
          </div>
          <div>
            <strong class="text-slate-800 block mb-1">🎯 Lợi ích then chốt:</strong>
            <span class="text-slate-600">${selected.benefits[0]}</span>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-3">
          <button onclick="openGameModal('${selected.id}')" class="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition">
            Xem Hướng Dẫn Từng Bước &rarr;
          </button>
          <button onclick="document.getElementById('generate-game-btn').click()" class="px-4 py-2.5 bg-white hover:bg-amber-50 text-slate-700 text-xs sm:text-sm font-bold rounded-xl border border-amber-200 transition">
            <i class="fa-solid fa-arrows-rotate mr-1"></i> Gợi ý trò khác
          </button>
        </div>
      </div>
    `;

    resultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

// Modal Detail View
function setupModal() {
  const modal = document.getElementById("game-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function openGameModal(gameId) {
  const game = GAMES_DATA.find(g => g.id === gameId);
  if (!game) return;

  const modal = document.getElementById("game-modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-xs font-black uppercase px-3 py-1 rounded-full ${game.categoryBadgeBg}">
          ${game.categoryLabel}
        </span>
        <span class="text-xs text-slate-500 font-semibold"><i class="fa-regular fa-clock"></i> ${game.timeText}</span>
      </div>

      <h2 class="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
        ${game.title}
      </h2>

      <p class="text-sm text-slate-600 leading-relaxed italic border-l-4 border-orange-400 pl-3 py-1 bg-amber-50/50 rounded-r-lg">
        ${game.summary}
      </p>

      <div>
        <h4 class="font-display font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <i class="fa-solid fa-boxes-stacked text-orange-500"></i> Dụng Cụ Cần Chuẩn Bị (0đ Có Sẵn):
        </h4>
        <ul class="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          ${game.materialsList.map(m => `<li>${m}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h4 class="font-display font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <i class="fa-solid fa-list-check text-emerald-500"></i> Hướng Dẫn Từng Bước Cùng Bé:
        </h4>
        <div class="space-y-2.5">
          ${game.steps.map((step, idx) => `
            <div class="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <span class="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ${idx + 1}
              </span>
              <span class="leading-relaxed">${step}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div>
        <h4 class="font-display font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <i class="fa-solid fa-brain text-sky-500"></i> Lợi Ích Phát Triển Não Bộ & Thể Chất:
        </h4>
        <div class="flex flex-wrap gap-2">
          ${game.benefits.map(b => `
            <span class="inline-flex items-center gap-1.5 text-xs bg-sky-50 text-sky-800 border border-sky-100 px-3 py-1.5 rounded-lg font-medium">
              <i class="fa-solid fa-check text-[10px] text-sky-600"></i> ${b}
            </span>
          `).join("")}
        </div>
      </div>

      <div class="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800 flex items-start gap-2.5">
        <i class="fa-solid fa-triangle-exclamation text-rose-500 text-sm mt-0.5 shrink-0"></i>
        <span><strong>Lưu ý an toàn:</strong> ${game.safetyNote}</span>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button onclick="closeModal()" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition">
          Đã hiểu & Bắt đầu chơi!
        </button>
        <button onclick="bookmarkGame(this, '${game.id}')" class="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 transition flex items-center gap-1.5">
          <i class="fa-regular fa-heart"></i> Lưu vào mục yêu thích
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("show"), 10);
}

function closeModal() {
  const modal = document.getElementById("game-modal");
  if (!modal) return;
  modal.classList.remove("show");
  setTimeout(() => modal.classList.add("hidden"), 300);
}

// FAQ Accordion
function setupFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach(item => {
    const toggle = item.querySelector(".faq-toggle");
    const content = item.querySelector(".faq-content");
    const icon = toggle.querySelector("i");

    toggle.addEventListener("click", () => {
      soundEngine.init();
      soundEngine.playPop();
      const isOpen = !content.classList.contains("hidden");

      items.forEach(other => {
        other.querySelector(".faq-content").classList.add("hidden");
        other.querySelector(".faq-toggle i").style.transform = "rotate(0deg)";
      });

      if (!isOpen) {
        content.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

// Lead Form
function setupLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    soundEngine.init();
    soundEngine.playCheer();
    const name = document.getElementById("lead-name").value.trim();
    const email = document.getElementById("lead-email").value.trim();

    showToast(`Cảm ơn ${name}! Cẩm nang 50 Thẻ Trò Chơi đã được gửi đến email ${email}. Hãy kiểm tra hòm thư nhé!`);
    form.reset();

    if (typeof confetti === "function") {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  });
}

// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 4500);
}

// Bookmark Game
function bookmarkGame(btn, gameId) {
  soundEngine.init();
  soundEngine.playPop();
  const key = "saved_games_2yo";
  let saved = JSON.parse(localStorage.getItem(key) || "[]");

  if (saved.includes(gameId)) {
    saved = saved.filter(id => id !== gameId);
    btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    showToast("Đã bỏ lưu trò chơi khỏi danh sách yêu thích.");
  } else {
    saved.push(gameId);
    btn.innerHTML = `<i class="fa-solid fa-heart text-rose-500"></i>`;
    showToast("Đã thêm trò chơi vào danh sách yêu thích của bé!");
  }

  localStorage.setItem(key, JSON.stringify(saved));
}

// Mobile Menu
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    soundEngine.init();
    menu.classList.toggle("hidden");
  });

  links.forEach(link => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}
