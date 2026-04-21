// Inisialisasi AOS (Animate On Scroll)
AOS.init({
    once: true, // Animasi hanya berjalan sekali
    offset: 50,
});

// Inisialisasi Swiper Slider (Gallery Foto)
const swiper = new Swiper('.mySwiper', {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true, // TAMBAHAN: Biar fotonya muter terus tanpa ada ujungnya
    coverflowEffect: {
        rotate: 5,       // Sedikit rotasi agar elegan
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false, // Mematikan shadow default dari swiper karena kita pakai yang custom
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // Responsif
    breakpoints: {
        320: {
            spaceBetween: 30
        },
        768: {
            spaceBetween: 50
        }
    }
});

// --- AUDIO CONTROLLER ---
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicToggle');
const audioInstruction = document.getElementById('audioInstruction');

// Pastikan volume optimal
bgm.volume = 1.0;

musicBtn.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play().catch(e => console.log(e));
    } else {
        bgm.pause();
    }
});

// Update state UI tombol secara otomatis mengikuti kondisi lagunya
bgm.addEventListener('play', () => {
    musicBtn.classList.add('playing');
    musicBtn.classList.remove('play-require');
    musicBtn.innerHTML = '<span class="music-icon">⏸️</span><span class="music-text">PAUSE</span>';
    
    // Sembunyikan instruksi kalau musik sudah di-play
    if(audioInstruction) {
        audioInstruction.style.opacity = '0';
        setTimeout(() => audioInstruction.style.display = 'none', 1000);
    }
});

bgm.addEventListener('pause', () => {
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">PLAY</span>';
});


// Animasi Mengetik Teks (Typing Effect) untuk Opening
const textToType = "halo... udah lama ya kita ga ngobrol\nakhir-akhir ini aku agak sibuk, maaf ya.";
const typingElement = document.getElementById('typing-text');
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        if (textToType.charAt(charIndex) === '\n') {
            typingElement.innerHTML += '<br><br>'; // Efek enter buat jarak
        } else {
            typingElement.innerHTML += textToType.charAt(charIndex);
        }
        charIndex++;

        // Randomize kecepatan ngetik biar terasa lebih real seperti manusia
        let typingSpeed = Math.floor(Math.random() * (120 - 70 + 1)) + 70;

        // Kasih delay lebih panjang kalau ada jeda titik atau koma
        if (textToType.charAt(charIndex - 1) === '.' || textToType.charAt(charIndex - 1) === ',') {
            typingSpeed += 500;
        }

        setTimeout(typeText, typingSpeed);
    }
}

// Mulai mengetik 1 detik setelah halaman dimuat
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// Efek Partikel/Hati Saat Layar di Klik
document.addEventListener('click', function (e) {
    // Abaikan efek kalau klik tombol musik
    if (e.target.closest('#musicToggle')) return;

    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const symbols = ['✨', '🤍', '💫', '🌸', '💖', '🧸', '🎀', '🫧', '🍓']; // Simbol aesthetic sangat imut
    const container = document.body;

    // Munculkan 3-5 hati/bintang setiap klik
    const sparklesCount = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < sparklesCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle-effect');

        sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';

        // Variasi ukuran
        const size = Math.random() * 12 + 15; // 15-27px
        sparkle.style.fontSize = size + 'px';

        // Arah percikan acak
        const xMove = (Math.random() - 0.5) * 120; // x: -60px s/d 60px
        const yMove = (Math.random() - 1) * 120;   // y: -120px s/d 0px (naik)

        // Set properti untuk keyframes
        sparkle.style.setProperty('--x-move', `${xMove}px`);
        sparkle.style.setProperty('--y-move', `${yMove}px`);

        container.appendChild(sparkle);

        // Bersihkan node setelah animasi selesai
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Generate Bintang-bintang Kecil di Latar Belakang (Section 1)
function createStars() {
    const starBg = document.querySelector('.star-bg');
    if (!starBg) return;

    // Menyesuaikan jumlah bintang biar performa HP tidak ngelag
    const starsCount = window.innerWidth < 768 ? 20 : 45;

    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random setup
        const size = Math.random() * 3.5 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animDuration = Math.random() * 4 + 3; // 3-7 detik
        const animDelay = Math.random() * 5; // delay muncul acak

        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = left + '%';
        star.style.top = top + '%';
        star.style.animationDuration = animDuration + 's';
        star.style.animationDelay = animDelay + 's';

        starBg.appendChild(star);
    }
}

createStars();

// --- ANIMASI TAMBAHAN BIAR MAKIN HIDUP DAN IMUT ---

// 1. Trail Mouse (Jejak Mouse Lucu)
let lastTrailTime = 0;
document.addEventListener('mousemove', function (e) {
    const now = Date.now();
    // Throttle: spawn maksimal 1 item tiap 40ms biar tidak terlalu ngelag/rame
    if (now - lastTrailTime < 40) return;
    if (Math.random() > 0.4) return; // 40% kemungkinan spawn
    lastTrailTime = now;
    createTrailItem(e.clientX, e.clientY);
});

// Support untuk touchscreen/mobile
document.addEventListener('touchmove', function (e) {
    const now = Date.now();
    if (now - lastTrailTime < 50) return;
    if (Math.random() > 0.4) return;
    lastTrailTime = now;
    let touch = e.touches[0];
    createTrailItem(touch.clientX, touch.clientY);
}, { passive: true });

function createTrailItem(x, y) {
    const trailSymbols = ['💖', '✨', '🌸', '🧸', '🎀', '🫧', '🍓', '✨', '💕'];
    const trail = document.createElement('div');
    trail.classList.add('trail-effect');

    trail.innerText = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];

    trail.style.left = x + 'px';
    trail.style.top = y + 'px';

    const size = Math.random() * 8 + 12; // 12-20px
    trail.style.fontSize = size + 'px';

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 800);
}

// 2. Floating Elements Mendarat Random Secara Berkala
setInterval(() => {
    const floatSymbols = ['🤍', '🌸', '🎵', '☁️', '🫧', '✨'];
    const floatItem = document.createElement('div');
    floatItem.classList.add('float-random-effect');

    floatItem.innerText = floatSymbols[Math.floor(Math.random() * floatSymbols.length)];

    // Posisi X acak
    floatItem.style.left = Math.random() * 100 + 'vw';
    floatItem.style.bottom = '-30px';

    const size = Math.random() * 15 + 15; // 15-30px
    floatItem.style.fontSize = size + 'px';

    // Kecepatan random
    const animDuration = Math.random() * 3 + 4; // 4-7 detik
    floatItem.style.animationDuration = animDuration + 's';

    document.body.appendChild(floatItem);

    setTimeout(() => {
        floatItem.remove();
    }, animDuration * 1000);
}, 1200); // Muncul tiap 1.2 detik
