/* -------------------------------------------------------------
   1. MAGNETIC FLUID CURSOR
   ------------------------------------------------------------- */
const cursor = document.getElementById('fluid-cursor');
const magneticElements = document.querySelectorAll('.magnetic');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

// Fluid Lerp animation
function lerpCursor() {
    cursorX += (mouseX - cursorX) * 0.2; // Smooth trailing delay
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(lerpCursor);
}
requestAnimationFrame(lerpCursor);

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Magnetic Attraction Logic
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        // Pull element slightly toward mouse
        const pullX = (mouseX - btnX) * 0.3; // Magnet strength
        const pullY = (mouseY - btnY) * 0.3;

        el.style.transform = `translate(${pullX}px, ${pullY}px)`;
        cursor.classList.add('hovering'); // Make cursor explode into a soft circle
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0px, 0px)`; // Snap back
        cursor.classList.remove('hovering');
    });
});

/* -------------------------------------------------------------
   2. ENERGETIC SOUNDTRACK
   ------------------------------------------------------------- */
// High-energy electronic track for a premium, dynamic feel
const bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5; // Set volume to 50%

let isAudioPlaying = false;
const btnAudio = document.getElementById('audio-toggle');
const iconOn = document.getElementById('audio-icon-on');
const iconOff = document.getElementById('audio-icon-off');

btnAudio.addEventListener('click', () => {
    isAudioPlaying = !isAudioPlaying;

    if (isAudioPlaying) {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        iconOff.classList.add('hidden');
        iconOn.classList.remove('hidden');
        btnAudio.classList.add('text-orange-500');
    } else {
        bgMusic.pause();
        iconOn.classList.add('hidden');
        iconOff.classList.remove('hidden');
        btnAudio.classList.remove('text-orange-500');
    }
});

/* -------------------------------------------------------------
   3. TRUE PERCENTAGE LOADER & SEQUENCER ENGINE
   ------------------------------------------------------------- */
const canvas = document.getElementById('sequence-canvas');
const context = canvas.getContext('2d', { alpha: false, desynchronized: true });

const frameCount = 200;
const currentFrame = index => `ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

const images = [];
let loadedCount = 0;

const html = document.documentElement;
const loader = document.getElementById('loader');
const pctText = document.getElementById('loading-pct');
const barFill = document.getElementById('loading-bar');

const ui1 = document.getElementById('ui-1');
const ui2 = document.getElementById('ui-2');
const ui3 = document.getElementById('ui-3');

// Preload Image Sequence and mathematically update progress bar
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);

    img.onload = () => {
        loadedCount++;

        // Calculate and update True Loading UI
        const progress = Math.floor((loadedCount / frameCount) * 100);
        pctText.innerText = progress;
        barFill.style.width = `${progress}%`;

        // First frame loaded? Render it in background so it's ready
        if (loadedCount === 1) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(0);
        }

        // Everything finished loading? Melt away the luxury loader.
        if (loadedCount === frameCount) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                setTimeout(() => loader.remove(), 1500);
            }, 400); // 400ms buffer so user sees 100% just briefly
        }
    };
}

function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    context.fillStyle = window._canvasBg || '#fdfcf9';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
}

function updateState() {
    const scrollTop = html.scrollTop;
    const maxScrollTop = document.getElementById('scroll-track').scrollHeight - window.innerHeight;

    // Map scrollbar to 0.0 -> 1.0 based solely on the track height
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScrollTop));

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    drawFrame(frameIndex);

    // Light Mode Cinematic UI Transitions
    if (scrollFraction < 0.3) {
        ui1.style.opacity = '1'; ui1.style.transform = 'translateY(0)';
        ui2.style.opacity = '0'; ui2.style.transform = 'translateY(40px)';
        ui3.style.opacity = '0'; ui3.style.transform = 'translateY(40px)';

        ui1.classList.replace('pointer-events-none', 'pointer-events-auto');
        ui2.classList.replace('pointer-events-auto', 'pointer-events-none');
        ui3.classList.replace('pointer-events-auto', 'pointer-events-none');
    }
    else if (scrollFraction >= 0.3 && scrollFraction < 0.8) {
        ui1.style.opacity = '0'; ui1.style.transform = 'translateY(-40px)';
        ui2.style.opacity = '1'; ui2.style.transform = 'translateY(0)';
        ui3.style.opacity = '0'; ui3.style.transform = 'translateY(40px)';

        ui1.classList.replace('pointer-events-auto', 'pointer-events-none');
        ui2.classList.replace('pointer-events-none', 'pointer-events-auto');
        ui3.classList.replace('pointer-events-auto', 'pointer-events-none');
    }
    else {
        ui1.style.opacity = '0'; ui1.style.transform = 'translateY(-40px)';
        ui2.style.opacity = '0'; ui2.style.transform = 'translateY(-40px)';
        ui3.style.opacity = '1'; ui3.style.transform = 'translateY(0)';

        ui1.classList.replace('pointer-events-auto', 'pointer-events-none');
        ui2.classList.replace('pointer-events-auto', 'pointer-events-none');
        ui3.classList.replace('pointer-events-none', 'pointer-events-auto');
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateState();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateState();
}, { passive: true });

/* -------------------------------------------------------------
   4. CART SYSTEM
   ------------------------------------------------------------- */
let cartCount = 0;
const cartBadge = document.getElementById('cart-badge');

function updateCartBadge() {
    cartBadge.textContent = cartCount;
    if (cartCount > 0) {
        cartBadge.classList.remove('hidden');
        cartBadge.classList.add('flex');
    } else {
        cartBadge.classList.add('hidden');
        cartBadge.classList.remove('flex');
    }
}

function getCartCount() { return cartCount; }

/* -------------------------------------------------------------
   5. TOAST NOTIFICATION
   ------------------------------------------------------------- */
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
let toastTimer = null;

function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* -------------------------------------------------------------
   6. QUANTITY STEPPER
   ------------------------------------------------------------- */
let quantity = 1;
const qtyDisplay = document.getElementById('qty-display');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');

function setQuantity(val) {
    quantity = Math.max(1, val);
    qtyDisplay.textContent = quantity;
}

qtyMinus.addEventListener('click', () => setQuantity(quantity - 1));
qtyPlus.addEventListener('click', () => setQuantity(quantity + 1));

/* -------------------------------------------------------------
   7. ADD TO CART BUTTON (wires cart + toast + qty)
   ------------------------------------------------------------- */
const addToCartBtn = document.getElementById('add-to-cart-btn');
addToCartBtn.addEventListener('click', () => {
    cartCount += quantity;
    updateCartBadge();
    showToast(`${quantity} bottle${quantity > 1 ? 's' : ''} added to cart ✓`);
});

/* -------------------------------------------------------------
   8. STAR RATING
   ------------------------------------------------------------- */
let currentRating = 0;
const starBtns = document.querySelectorAll('.star-btn');
const ratingLabel = document.getElementById('rating-label');
const ratingMessages = ['', 'Not for me', 'It\'s okay', 'Pretty good!', 'Love it!', 'Absolutely divine! ★'];

function setRating(value) {
    currentRating = value;
    starBtns.forEach((btn, i) => {
        if (i < value) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    ratingLabel.textContent = ratingMessages[value] || 'Tap to rate';
}

function getCurrentRating() { return currentRating; }

starBtns.forEach(btn => {
    btn.addEventListener('click', () => setRating(parseInt(btn.dataset.value)));
});

/* -------------------------------------------------------------
   9. DARK MODE TOGGLE
   ------------------------------------------------------------- */
const darkToggle = document.getElementById('dark-mode-toggle');
let isDarkMode = false;

// Colors used per theme
const THEME = {
    light: { bg: '#fdfcf9', vigRing: 'rgba(253,252,249,0.9)', vigGrad: 'linear-gradient(to bottom, rgba(253,252,249,0.4), transparent, #fdfcf9)' },
    dark: { bg: '#0d0905', vigRing: 'rgba(13,9,5,0.9)', vigGrad: 'linear-gradient(to bottom, rgba(13,9,5,0.4), transparent, #0d0905)' }
};

// The vignette elements we need to update live with JS since CSS vars can't drive box-shadow rgba directly
const vignetteRing = document.getElementById('vignette-ring');
const vignetteGrad = document.getElementById('vignette-grad');

function applyTheme(dark) {
    const t = dark ? THEME.dark : THEME.light;
    // Update vignette overlays
    if (vignetteRing) vignetteRing.style.boxShadow = `inset 0 0 200px ${t.vigRing}`;
    if (vignetteGrad) vignetteGrad.style.background = t.vigGrad;
    // Store the fill color so drawFrame always uses the right background
    window._canvasBg = t.bg;
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    darkToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
    applyTheme(isDarkMode);
}

function isDark() { return isDarkMode; }

// Restore preference from last visit
if (localStorage.getItem('darkMode') === 'true') {
    isDarkMode = true;
    document.body.classList.add('dark-mode');
    darkToggle.textContent = '☀️';
}

// Apply theme on load (handles both light default and restored dark)
applyTheme(isDarkMode);

darkToggle.addEventListener('click', toggleDarkMode);

