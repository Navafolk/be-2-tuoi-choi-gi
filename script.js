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

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn("Audio pop error:", e);
    }
  }

  // Xylophone chime note with natural harmonics
  playXyloNote(freq) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Overtone for bell-like chime resonance
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 3, now);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      gain2.gain.setValueAtTime(0.2, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.8);
      osc2.stop(now + 0.4);
    } catch (e) {
      console.warn("Audio xylo error:", e);
    }
  }

  // Cheerful fanfare arpeggio (C - E - G - C5)
  playCheer() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playXyloNote(freq);
      }, idx * 110);
    });
  }

  // Cute munch crunch sound when bear eats fruit
  playMunch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(320 + Math.random() * 80, now);
          osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.08);
        } catch (e) {}
      }, i * 95);
    }
  }

  // Animal calls synthesis + Real Vietnamese Audio Voice
  playAnimalSound(type) {
    if (this.isMuted) return;
    this.init();

    if (type === "dog") {
      this.synthBark();
      setTimeout(() => this.playVoice("audio/animal_dog.mp3", "Gâu gâu! Bạn Cún Con!"), 320);
    } else if (type === "cat") {
      this.synthMeow();
      setTimeout(() => this.playVoice("audio/animal_cat.mp3", "Meo meo! Bạn Mèo Con!"), 480);
    } else if (type === "duck") {
      this.synthQuack();
      setTimeout(() => this.playVoice("audio/animal_duck.mp3", "Quạc quạc! Chú Vịt Vàng!"), 360);
    } else if (type === "frog") {
      this.synthRibbit();
      setTimeout(() => this.playVoice("audio/animal_frog.mp3", "Ộp ộp! Chú Ếch Xanh!"), 280);
    } else if (type === "cow") {
      this.synthMoo();
      setTimeout(() => this.playVoice("audio/animal_cow.mp3", "Ùm bò! Bác Bò Sữa!"), 680);
    } else if (type === "rooster") {
      this.synthRooster();
      setTimeout(() => this.playVoice("audio/animal_rooster.mp3", "Ò ó o o! Chú Gà Trống!"), 580);
    }
  }

  synthBark() {
    if (!this.ctx) return;
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(360, now);
          osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.13);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.13);
        } catch (e) {}
      }, i * 150);
    }
  }

  synthMeow() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.45);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.46);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    } catch (e) {}
  }

  synthQuack() {
    if (!this.ctx) return;
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(240, now + 0.15);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.16);
        } catch (e) {}
      }, i * 170);
    }
  }

  synthRibbit() {
    if (!this.ctx) return;
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.linearRampToValueAtTime(220, now + 0.08);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.1);
        } catch (e) {}
      }, i * 130);
    }
  }

  synthMoo() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.6);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
    } catch (e) {}
  }

  synthRooster() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.linearRampToValueAtTime(650, now + 0.2);
      osc.frequency.linearRampToValueAtTime(800, now + 0.5);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    } catch (e) {}
  }

  // High-fidelity Vietnamese Audio Playback with TTS fallback
  playVoice(audioPath, fallbackText = "") {
    if (this.isMuted) return;
    this.init();

    // Stop previous voice playback if still active
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
          console.warn("Audio file playback error, attempting fallback:", err);
          if (fallbackText) this.speak(fallbackText);
        });
      }
      return;
    }

    if (fallbackText) {
      this.speak(fallbackText);
    }
  }

  // Pure Vietnamese TTS only - STRICTLY BLOCKS English/Foreign TTS voices from reading Vietnamese
  speak(text) {
    if (this.isMuted) return;
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const voices = window.speechSynthesis.getVoices();

      // Look ONLY for genuine Vietnamese voices (e.g. Google Tiếng Việt, Microsoft HoaiMy/An)
      const viVoice = voices.find(v => {
        const lang = (v.lang || "").toLowerCase();
        const name = (v.name || "").toLowerCase();
        return lang.includes("vi") || lang.startsWith("vi-") || name.includes("vietnam") || name.includes("tiếng việt");
      });

      // CRITICAL: If no Vietnamese voice is installed in the OS, NEVER read with English voice!
      // (Reading Vietnamese with English phonetics sounds terrible and confuses the baby)
      if (!viVoice) {
        console.warn("No native Vietnamese TTS voice available; English voices blocked from butchering Vietnamese text.");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = viVoice;
      utterance.lang = viVoice.lang || "vi-VN";
      utterance.rate = 0.95;
      utterance.pitch = 1.2;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech Synthesis error:", e);
    }
  }
}

// Global Audio Engine Instance
const soundEngine = new ToddlerAudioEngine();

// Global Kids Star Counter
let kidsStarsCount = 0;
function addBabyStars(amount = 1, showPraise = true) {
  kidsStarsCount += amount;
  const starEl = document.getElementById("kids-stars-count");
  if (starEl) {
    starEl.textContent = kidsStarsCount;
    starEl.classList.add("scale-125", "text-amber-500");
    setTimeout(() => starEl.classList.remove("scale-125", "text-amber-500"), 300);
  }

  if (showPraise && kidsStarsCount % 5 === 0) {
    if (typeof confetti === "function") {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    soundEngine.playVoice("audio/star_praise.mp3", "Hoan hô bé! Bé nhận được thêm sao vàng rồi!");
  }
}

// ========================================================
// 2. PLAYZONE GAMES CONTROLLERS
// ========================================================

// --- A. PLAYZONE TABS & CONTROLS ---
function initPlayzone() {
  const tabs = document.querySelectorAll(".kid-game-tab");
  const screens = {
    bubbles: document.getElementById("screen-bubbles"),
    animals: document.getElementById("screen-animals"),
    xylophone: document.getElementById("screen-xylophone"),
    colors: document.getElementById("screen-colors")
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      soundEngine.init();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

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

      // Special initializations on tab enter
      if (targetGame === "bubbles") {
        initBubbleGame();
      } else if (targetGame === "colors") {
        initColorGame();
      } else if (targetGame === "animals") {
        soundEngine.playVoice("audio/welcome.mp3", "Chào mừng bé đến với thế giới động vật!");
      } else if (targetGame === "xylophone") {
        soundEngine.playVoice("audio/xylo_intro.mp3", "Bé hãy gõ vào các phím đàn cầu vồng nhé!");
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

  // Initialize first game (Bubbles)
  initBubbleGame();
  initAnimalGame();
  initXylophoneGame();
  initColorGame();
}

// --- B. GAME 1: MAGIC BUBBLE POP ENGINE ---
let bubbleInterval = null;
const BUBBLE_COLORS = [
  "radial-gradient(circle at 35% 35%, #fbcfe8, #f43f5e)", // Pink Rose
  "radial-gradient(circle at 35% 35%, #bae6fd, #0284c7)", // Sky Blue
  "radial-gradient(circle at 35% 35%, #fef08a, #eab308)", // Yellow
  "radial-gradient(circle at 35% 35%, #bbf7d0, #16a34a)", // Mint Green
  "radial-gradient(circle at 35% 35%, #fed7aa, #ea580c)", // Orange
  "radial-gradient(circle at 35% 35%, #ddd6fe, #7c3aed)"  // Purple Lavender
];
const BUBBLE_SYMBOLS = ["⭐", "💖", "1", "2", "3", "🎈", "🐱", "🐶", "🍎", "🌸", "☀️"];

function initBubbleGame() {
  const container = document.getElementById("bubbles-container");
  const arena = document.getElementById("bubble-sky-arena");
  const spawnBtn = document.getElementById("spawn-more-bubbles-btn");
  const clearBtn = document.getElementById("clear-bubbles-btn");

  if (!container || !arena) return;

  // Clear existing
  if (bubbleInterval) clearInterval(bubbleInterval);

  // Spawn initial 6 bubbles
  for (let i = 0; i < 6; i++) {
    createBubble(container, arena, true);
  }

  // Auto spawn a gentle bubble every 2.2 seconds
  bubbleInterval = setInterval(() => {
    if (container.children.length < 12) {
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

  if (clearBtn) {
    clearBtn.onclick = () => {
      container.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        createBubble(container, arena, true);
      }
    };
  }
}

function createBubble(container, arena, isInitial = false) {
  const bubble = document.createElement("div");
  bubble.className = "game-bubble";

  const size = Math.floor(75 + Math.random() * 35); // 75px - 110px
  const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
  const symbol = BUBBLE_SYMBOLS[Math.floor(Math.random() * BUBBLE_SYMBOLS.length)];
  const leftPercent = Math.floor(5 + Math.random() * 85);

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.background = color;
  bubble.style.left = `${leftPercent}%`;
  bubble.style.fontSize = `${Math.floor(size * 0.38)}px`;
  bubble.innerHTML = `<span class="drop-shadow-sm text-white">${symbol}</span>`;

  const duration = (6 + Math.random() * 4).toFixed(1); // 6s - 10s gentle rise
  bubble.style.animation = `bubbleFloatUp ${duration}s ease-in-out infinite`;

  if (isInitial) {
    bubble.style.bottom = `${Math.floor(10 + Math.random() * 70)}%`;
  } else {
    bubble.style.bottom = "-120px";
  }

  // Pop interaction
  const popAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    soundEngine.init();
    soundEngine.playPop();

    // Create burst effect
    const rect = bubble.getBoundingClientRect();
    const arenaRect = arena.getBoundingClientRect();
    const x = rect.left - arenaRect.left + rect.width / 2;
    const y = rect.top - arenaRect.top + rect.height / 2;

    createPopSparkle(arena, x, y, symbol);
    bubble.remove();
    addBabyStars(1, false);

    // Hide hint if visible
    const hint = document.getElementById("bubble-hint");
    if (hint) hint.style.display = "none";

    // Spawn replacement after short delay
    setTimeout(() => {
      if (container.children.length < 8) {
        createBubble(container, arena, false);
      }
    }, 800);
  };

  bubble.addEventListener("pointerdown", popAction);
  container.appendChild(bubble);
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

// --- C. GAME 2: ANIMAL PEEK-A-BOO ENGINE ---
let currentAnimalMode = "free"; // "free" | "quiz"
let currentQuizAnimal = null;
const ANIMALS_DATA = [
  { id: "dog", name: "Chú Cún Con", soundName: "Gâu gâu", soundType: "dog", voiceFile: "audio/animal_dog.mp3", quizVoiceFile: "audio/quiz_dog.mp3" },
  { id: "cat", name: "Bạn Mèo Con", soundName: "Meo meo", soundType: "cat", voiceFile: "audio/animal_cat.mp3", quizVoiceFile: "audio/quiz_cat.mp3" },
  { id: "duck", name: "Chú Vịt Vàng", soundName: "Quạc quạc", soundType: "duck", voiceFile: "audio/animal_duck.mp3", quizVoiceFile: "audio/quiz_duck.mp3" },
  { id: "frog", name: "Chú Ếch Cốm", soundName: "Ộp ộp", soundType: "frog", voiceFile: "audio/animal_frog.mp3", quizVoiceFile: "audio/quiz_frog.mp3" },
  { id: "cow", name: "Bác Bò Sữa", soundName: "Ùm bòooo", soundType: "cow", voiceFile: "audio/animal_cow.mp3", quizVoiceFile: "audio/quiz_cow.mp3" },
  { id: "rooster", name: "Chú Gà Trống", soundName: "Ò ó o o", soundType: "rooster", voiceFile: "audio/animal_rooster.mp3", quizVoiceFile: "audio/quiz_rooster.mp3" }
];

function initAnimalGame() {
  const freeBtn = document.getElementById("animal-mode-free");
  const quizBtn = document.getElementById("animal-mode-quiz");
  const quizBox = document.getElementById("animal-quiz-box");
  const replayBtn = document.getElementById("quiz-replay-audio-btn");
  const cards = document.querySelectorAll(".animal-card");

  if (!freeBtn || !quizBtn) return;

  freeBtn.addEventListener("click", () => {
    currentAnimalMode = "free";
    freeBtn.classList.add("active");
    quizBtn.classList.remove("active");
    if (quizBox) quizBox.classList.add("hidden");
    soundEngine.playVoice("audio/free_mode.mp3", "Chế độ tự do! Bé thích bạn thú nào cứ bấm nhé!");
  });

  quizBtn.addEventListener("click", () => {
    currentAnimalMode = "quiz";
    quizBtn.classList.add("active");
    freeBtn.classList.remove("active");
    if (quizBox) quizBox.classList.remove("hidden");
    soundEngine.playVoice("audio/quiz_intro.mp3", "Bé hãy lắng nghe câu hỏi và tìm bạn thú nhé!");
    setTimeout(() => {
      if (currentAnimalMode === "quiz") {
        startNewAnimalQuiz();
      }
    }, 2800);
  });

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      if (currentQuizAnimal) {
        soundEngine.playVoice(currentQuizAnimal.quizVoiceFile, `Đố bé tìm thấy ${currentQuizAnimal.name} ở đâu nào?`);
      }
    });
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      soundEngine.init();
      const animalId = card.getAttribute("data-animal");
      const animal = ANIMALS_DATA.find(a => a.id === animalId);
      if (!animal) return;

      // Animate card
      card.classList.add("dancing");
      setTimeout(() => card.classList.remove("dancing"), 650);

      if (currentAnimalMode === "free") {
        soundEngine.playAnimalSound(animal.soundType);
        addBabyStars(1, false);
      } else if (currentAnimalMode === "quiz") {
        if (animalId === currentQuizAnimal.id) {
          // Correct!
          soundEngine.playAnimalSound(animal.soundType);
          setTimeout(() => {
            soundEngine.playCheer();
            soundEngine.playVoice("audio/quiz_correct.mp3", `Đúng rồi! Bé giỏi quá!`);
          }, 600);

          if (typeof confetti === "function") {
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          }

          addBabyStars(2, true);

          // Next quiz question after 2.8s
          setTimeout(() => {
            if (currentAnimalMode === "quiz") {
              startNewAnimalQuiz();
            }
          }, 2800);
        } else {
          // Wrong
          soundEngine.playAnimalSound(animal.soundType);
          setTimeout(() => {
            soundEngine.playVoice("audio/quiz_wrong.mp3", `Chưa đúng rồi! Bé thử lại lần nữa nhé!`);
          }, 500);
        }
      }
    });
  });
}

function startNewAnimalQuiz() {
  const quizText = document.getElementById("quiz-question-text");
  // Pick random animal
  const randomIndex = Math.floor(Math.random() * ANIMALS_DATA.length);
  currentQuizAnimal = ANIMALS_DATA[randomIndex];

  if (quizText) {
    quizText.textContent = `Đố bé tìm thấy ${currentQuizAnimal.name} ở đâu nào?`;
  }

  soundEngine.playVoice(currentQuizAnimal.quizVoiceFile, `Đố bé tìm thấy ${currentQuizAnimal.name} ở đâu nào?`);
}

// --- D. GAME 3: RAINBOW XYLOPHONE ENGINE ---
function initXylophoneGame() {
  const keys = document.querySelectorAll(".xylo-key");
  const demoBtn = document.getElementById("xylo-demo-song-btn");

  keys.forEach(key => {
    const handlePress = (e) => {
      e.preventDefault();
      soundEngine.init();
      const freq = parseFloat(key.getAttribute("data-freq"));
      soundEngine.playXyloNote(freq);

      // Key animation
      key.classList.add("pressed");
      setTimeout(() => key.classList.remove("pressed"), 180);

      // Sparkle music note
      createMusicNoteSparkle(key);
      addBabyStars(1, false);
    };

    key.addEventListener("pointerdown", handlePress);
  });

  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      playDemoSong();
    });
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

// Play "Kìa Con Bướm Vàng" melody automatically
function playDemoSong() {
  soundEngine.init();
  // Notes: C4, D4, E4, C4 | C4, D4, E4, C4 | E4, F4, G4 | E4, F4, G4 | G4, A4, G4, F4, E4, C4
  const songNotes = [
    { note: "C4", freq: 261.63, delay: 0 },
    { note: "D4", freq: 293.66, delay: 400 },
    { note: "E4", freq: 329.63, delay: 800 },
    { note: "C4", freq: 261.63, delay: 1200 },

    { note: "C4", freq: 261.63, delay: 1700 },
    { note: "D4", freq: 293.66, delay: 2100 },
    { note: "E4", freq: 329.63, delay: 2500 },
    { note: "C4", freq: 261.63, delay: 2900 },

    { note: "E4", freq: 329.63, delay: 3400 },
    { note: "F4", freq: 349.23, delay: 3800 },
    { note: "G4", freq: 392.00, delay: 4200 },

    { note: "E4", freq: 329.63, delay: 4800 },
    { note: "F4", freq: 349.23, delay: 5200 },
    { note: "G4", freq: 392.00, delay: 5600 },

    { note: "G4", freq: 392.00, delay: 6200 },
    { note: "A4", freq: 440.00, delay: 6500 },
    { note: "G4", freq: 392.00, delay: 6800 },
    { note: "F4", freq: 349.23, delay: 7100 },
    { note: "E4", freq: 329.63, delay: 7400 },
    { note: "C4", freq: 261.63, delay: 7800 }
  ];

  songNotes.forEach(item => {
    setTimeout(() => {
      const key = document.querySelector(`.xylo-key[data-note="${item.note}"]`);
      if (key) {
        soundEngine.playXyloNote(item.freq);
        key.classList.add("pressed");
        createMusicNoteSparkle(key);
        setTimeout(() => key.classList.remove("pressed"), 220);
      }
    }, item.delay);
  });
}

// --- E. GAME 4: YUMMY COLOR MATCH ENGINE ---
const COLOR_ROUNDS = [
  { id: "red", name: "ĐỎ", fruit: "Quả Táo Đỏ", textColor: "text-rose-600", audioFile: "audio/bear_red.mp3" },
  { id: "yellow", name: "VÀNG", fruit: "Quả Chuối Vàng", textColor: "text-amber-500", audioFile: "audio/bear_yellow.mp3" },
  { id: "green", name: "XANH", fruit: "Quả Nho Xanh", textColor: "text-emerald-600", audioFile: "audio/bear_green.mp3" }
];
let currentColorTarget = null;

function initColorGame() {
  const plates = document.querySelectorAll(".fruit-plate");
  const replayBtn = document.getElementById("color-replay-audio-btn");

  if (!plates.length) return;

  if (replayBtn) {
    replayBtn.onclick = () => {
      if (currentColorTarget) {
        soundEngine.playVoice(currentColorTarget.audioFile, `Bé ơi, cho Gấu ăn ${currentColorTarget.fruit} màu ${currentColorTarget.name} nhé!`);
      }
    };
  }

  plates.forEach(plate => {
    plate.onclick = () => {
      soundEngine.init();
      const pickedColor = plate.getAttribute("data-color");
      handleColorChoice(pickedColor, plate);
    };
  });

  pickNewTargetColor();
}

function pickNewTargetColor() {
  const targetNameEl = document.getElementById("color-target-name");
  const randomIndex = Math.floor(Math.random() * COLOR_ROUNDS.length);
  currentColorTarget = COLOR_ROUNDS[randomIndex];

  if (targetNameEl) {
    targetNameEl.textContent = currentColorTarget.name;
    targetNameEl.className = `${currentColorTarget.textColor} underline font-black text-xl sm:text-2xl`;
  }

  soundEngine.playVoice(currentColorTarget.audioFile, `Bé ơi, cho Gấu ăn ${currentColorTarget.fruit} màu ${currentColorTarget.name} nhé!`);
}

function handleColorChoice(pickedColor, plateEl) {
  const bear = document.getElementById("bear-character");
  const bearMouth = document.getElementById("bear-mouth");
  const feedbackMsg = document.getElementById("color-feedback-msg");

  if (pickedColor === currentColorTarget.id) {
    // Correct!
    plateEl.classList.add("fruit-flying");
    setTimeout(() => plateEl.classList.remove("fruit-flying"), 650);

    // Animate Bear eating
    if (bearMouth) {
      bearMouth.setAttribute("d", "M 48 70 Q 60 90 72 70 Z"); // Open big mouth
      bearMouth.setAttribute("fill", "#78350F");
    }
    if (bear) bear.classList.add("bear-chewing");

    soundEngine.playMunch();

    setTimeout(() => {
      soundEngine.playCheer();
      if (bearMouth) {
        bearMouth.setAttribute("d", "M 52 74 Q 60 80 68 74"); // Back to happy smile
        bearMouth.setAttribute("fill", "none");
      }
      if (bear) bear.classList.remove("bear-chewing");

      if (feedbackMsg) {
        feedbackMsg.textContent = `🎉 Chóp chép! Ngon quá! Bé chọn đúng màu ${currentColorTarget.name} rồi!`;
        feedbackMsg.classList.remove("opacity-0");
        setTimeout(() => feedbackMsg.classList.add("opacity-0"), 2000);
      }

      soundEngine.playVoice("audio/bear_yummy.mp3", `Chóp chép! Ngon quá! Cảm ơn bé đã cho Gấu ăn quả màu ${currentColorTarget.name}!`);
    }, 600);

    if (typeof confetti === "function") {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }

    addBabyStars(2, true);

    // Pick next color after 2.6s
    setTimeout(() => {
      pickNewTargetColor();
    }, 2600);

  } else {
    // Incorrect
    soundEngine.playPop();
    const pickedObj = COLOR_ROUNDS.find(c => c.id === pickedColor);
    const pickedName = pickedObj ? pickedObj.name : "";

    if (feedbackMsg) {
      feedbackMsg.textContent = `Đây là màu ${pickedName} rồi! Gấu đang thèm màu ${currentColorTarget.name} cơ!`;
      feedbackMsg.classList.remove("opacity-0");
      setTimeout(() => feedbackMsg.classList.add("opacity-0"), 2200);
    }

    soundEngine.playVoice("audio/bear_wrong.mp3", `Chưa đúng rồi bé ơi! Bé chọn lại cho Gấu nhé!`);
  }
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
