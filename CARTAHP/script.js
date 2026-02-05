// ✨ Página mágica para Abi — Versión FINAL
document.addEventListener('DOMContentLoaded', () => {
  // === FONDO MÁGICO ===
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("particles", {
      fpsLimit: 60,
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#D4AF37" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.1, max: 0.3 }, random: true },
        size: { value: { min: 1, max: 2 }, random: true },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          out_mode: "out"
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } },
      retina_detect: true
    });
  }

  // Velas flotantes
  const candles = document.getElementById('floating-candles');
  for (let i = 0; i < 8; i++) {
    const candle = document.createElement('div');
    candle.className = 'floating-candle';
    candle.innerHTML = '🕯️';
    candle.style.left = `${Math.random() * 100}%`;
    candle.style.top = `${Math.random() * 100}%`;
    candle.style.fontSize = `${16 + Math.random() * 10}px`;
    candle.style.animation = `float ${15 + Math.random() * 10}s infinite ease-in-out`;
    candle.style.animationDelay = `${Math.random() * 5}s`;
    candles.appendChild(candle);
  }

  // Libros flotantes
  const books = document.getElementById('floating-books');
  const bookEmojis = ['📚', '📖', '📕'];
  for (let i = 0; i < 6; i++) {
    const book = document.createElement('div');
    book.className = 'floating-book';
    book.textContent = bookEmojis[i % bookEmojis.length];
    book.style.left = `${Math.random() * 100}%`;
    book.style.top = `${Math.random() * 100}%`;
    book.style.fontSize = `${20 + Math.random() * 10}px`;
    book.style.animation = `float ${20 + Math.random() * 10}s infinite ease-in-out`;
    book.style.animationDelay = `${Math.random() * 5}s`;
    books.appendChild(book);
  }

  // Stickers
  const stickers = [
    'media/sticker-varita.png',
    'media/sticker-corazon.png'
  ];
  const stickersContainer = document.getElementById('magic-stickers');
  stickers.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'magic-sticker';
    img.style.width = `${30 + Math.random() * 20}px`;
    img.style.left = `${Math.random() * 90}%`;
    img.style.top = `${Math.random() * 80}%`;
    img.style.animation = `float ${25 + Math.random() * 10}s infinite ease-in-out`;
    stickersContainer.appendChild(img);
  });

  // Estilo para flotar
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(${10 + Math.random() * 20}px, ${20 + Math.random() * 30}px) rotate(5deg); }
      50% { transform: translate(${-10 - Math.random() * 20}px, ${10 + Math.random() * 20}px) rotate(-5deg); }
      75% { transform: translate(${5 + Math.random() * 10}px, ${-15 - Math.random() * 20}px) rotate(3deg); }
    }
  `;
  document.head.appendChild(style);

  // === ENTRAR ===
  document.getElementById('enter-btn').addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('magic-nav').classList.remove('hidden');
    document.getElementById('audio-controls').classList.remove('hidden');
    ['letter', 'memories', 'interactive', 'final'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });
    playSound('page-sound');
  });

  // === CARRUSEL ===
  const mediaItems = [
    { type: 'img', src: 'MEDIA/1.jpeg' },
    { type: 'img', src: 'MEDIA/6.jpeg' },
    { type: 'video', src: 'MEDIA/VD1.mp4' },
    { type: 'img', src: 'MEDIA/2.jpeg' },
    { type: 'img', src: 'MEDIA/3.jpeg' },
    { type: 'video', src: 'MEDIA/VD2.mp4' },
    { type: 'img', src: 'MEDIA/4.jpeg' },
    { type: 'img', src: 'MEDIA/5.jpeg' }
  ];

  const slideContainer = document.getElementById('carousel-slide');
  const dotsContainer = document.getElementById('carousel-dots');
  let currentIndex = 0;

  function createCarousel() {
    slideContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    mediaItems.forEach((item, i) => {
      let element;
      if (item.type === 'img') {
        element = document.createElement('img');
        element.src = item.src;
      } else {
        element = document.createElement('video');
        element.src = item.src;
        element.controls = true;
      }
      element.className = i === 0 ? 'active' : '';
      element.dataset.index = i;
      slideContainer.appendChild(element);

      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.dataset.index = i;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    document.querySelectorAll('#carousel-slide > *').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));
    
    const newSlide = document.querySelector(`[data-index="${index}"]`);
    const newDot = document.querySelector(`.carousel-dot[data-index="${index}"]`);
    
    if (newSlide) newSlide.classList.add('active');
    if (newDot) newDot.classList.add('active');
    
    currentIndex = index;
  }

  document.getElementById('prev-btn').addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    goToSlide(newIndex);
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % mediaItems.length;
    goToSlide(newIndex);
  });

  // Iniciar carrusel
  createCarousel();

  // === MAGIA INTERACTIVA ===
  document.addEventListener('click', (e) => {
    // Música
    if (e.target.id === 'music-toggle') {
      const music = document.getElementById('bg-music');
      const btn = e.target;
      if (music.paused) {
        music.play().then(() => btn.textContent = '🔇 Música OFF')
             .catch(() => alert('Haz clic en la página primero.'));
      } else {
        music.pause();
        btn.textContent = '🔊 Música ON';
      }
    }

    // Sombrero
    if (e.target.id === 'sorting-hat-btn') {
      const res = document.getElementById('house-result');
      res.textContent = 'El sombrero está pensando...';
      setTimeout(() => {
        const houses = ['🦁 Gryffindor', '🦡 Hufflepuff', '🦅 Ravenclaw', '🐍 Slytherin'];
        res.textContent = `¡Eres de ${houses[Math.floor(Math.random() * houses.length)]}, Pequeña!`;
      }, 1200);
    }

    // Hechizo
    if (e.target.id === 'spell-btn') {
      playSound('spell-sound');
      animateEffect('spell-effect', 'spellGlow');
    }

    // Lechuza
    if (e.target.id === 'owl-btn') {
      playSound('owl-sound');
      animateEffect('owl-animation', 'owlFly');
    }
  });

  // === FUNCIONES AUXILIARES ===
  function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }

  // Al inicio del script (fuera de cualquier función)
let musicStarted = false;

// Cuando el usuario hace clic en cualquier parte de la página
document.addEventListener('click', function initMusic() {
  if (!musicStarted) {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
      bgMusic.volume = 0.4; // Volumen suave
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silencioso: los navegadores bloquean audio sin interacción
        });
      }
      musicStarted = true;
    }
    // Remover el listener después del primer clic
    document.removeEventListener('click', initMusic);
  }
});

  function animateEffect(id, animation) {
    const el = document.getElementById(id);
    if (el) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = `${animation} 2.5s forwards`;
    }
  }

  // Smooth scroll
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
});