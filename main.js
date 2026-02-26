'use strict';

/**
 * @fileoverview Mangoo Juice — Main Application Module
 *
 * Organised as a single IIFE to prevent global scope pollution.
 * Each feature area is encapsulated in its own `initXxx()` function,
 * all bootstrapped through a single `init()` call at the bottom.
 *
 * Sections:
 *  1. Constants & Configuration
 *  2. Module State
 *  3. Magnetic Fluid Cursor
 *  4. Energetic Soundtrack
 *  5. Image Sequence Loader & Scroll Sequencer
 *  6. Geo-Location Based Pricing
 *  7. Cart System
 *  8. Toast Notification
 *  9. Quantity Stepper
 * 10. Star Rating
 * 11. Dark Mode Toggle
 * 12. Bootstrap
 * 13. CommonJS Exports (Jest / test environment only)
 *
 * @module MangooJuice
 */
(function MangooJuice() {

    /* ═══════════════════════════════════════════════════════════
       1. CONSTANTS & CONFIGURATION
    ═══════════════════════════════════════════════════════════ */

    /** Shared, immutable application configuration. */
    const CONFIG = Object.freeze({
        FRAME_COUNT: 200,
        LERP_FACTOR: 0.2,
        MAGNET_STRENGTH: 0.3,
        AUDIO_URL: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        AUDIO_VOLUME: 0.5,
        TOAST_DURATION_MS: 3000,
        GEO_API_URL: 'https://ipapi.co/json/',
        SCROLL_STORY: 0.3,   // scroll fraction where story panel appears
        SCROLL_PURCHASE: 0.8,   // scroll fraction where purchase panel appears
    });

    /** Dark / light theme colour tokens for JS-driven elements. */
    const THEME = Object.freeze({
        light: {
            bg: '#fdfcf9',
            vigRing: 'rgba(253,252,249,0.9)',
            vigGrad: 'linear-gradient(to bottom, rgba(253,252,249,0.4), transparent, #fdfcf9)',
        },
        dark: {
            bg: '#0d0905',
            vigRing: 'rgba(13,9,5,0.9)',
            vigGrad: 'linear-gradient(to bottom, rgba(13,9,5,0.4), transparent, #0d0905)',
        },
    });

    /**
     * Geo-location price table.
     * @type {Record<string, {symbol: string, sale: number, original: number, label: string, flag: string}>}
     */
    const PRICES = Object.freeze({
        IN: { symbol: '₹', sale: 120, original: 150, label: 'India', flag: '🇮🇳' },
        US: { symbol: '$', sale: 1.99, original: 2.49, label: 'United States', flag: '🇺🇸' },
        GB: { symbol: '£', sale: 1.59, original: 1.99, label: 'United Kingdom', flag: '🇬🇧' },
        DE: { symbol: '€', sale: 1.79, original: 2.29, label: 'Germany', flag: '🇩🇪' },
        FR: { symbol: '€', sale: 1.79, original: 2.29, label: 'France', flag: '🇫🇷' },
        IT: { symbol: '€', sale: 1.79, original: 2.29, label: 'Italy', flag: '🇮🇹' },
        ES: { symbol: '€', sale: 1.79, original: 2.29, label: 'Spain', flag: '🇪🇸' },
        NL: { symbol: '€', sale: 1.79, original: 2.29, label: 'Netherlands', flag: '🇳🇱' },
        AU: { symbol: 'A$', sale: 2.99, original: 3.99, label: 'Australia', flag: '🇦🇺' },
        CA: { symbol: 'C$', sale: 2.69, original: 3.39, label: 'Canada', flag: '🇨🇦' },
        AE: { symbol: 'AED', sale: 7.29, original: 8.99, label: 'UAE', flag: '🇦🇪' },
        SG: { symbol: 'S$', sale: 2.69, original: 3.49, label: 'Singapore', flag: '🇸🇬' },
        JP: { symbol: '¥', sale: 289, original: 369, label: 'Japan', flag: '🇯🇵' },
        DEFAULT: { symbol: '₹', sale: 120, original: 150, label: 'Global', flag: '🌍' },
    });

    /** Labels for each star rating value (index = rating). */
    const RATING_MESSAGES = Object.freeze([
        '',
        'Not for me',
        "It's okay",
        'Pretty good!',
        'Love it!',
        'Absolutely divine! ★',
    ]);

    /* ═══════════════════════════════════════════════════════════
       2. MODULE STATE
    ═══════════════════════════════════════════════════════════ */

    const cursorState = {
        mouseX: window.innerWidth / 2,
        mouseY: window.innerHeight / 2,
        cursorX: window.innerWidth / 2,
        cursorY: window.innerHeight / 2,
    };

    let isAudioPlaying = false;
    let isDarkMode = false;
    let cartCount = 0;
    let quantity = 1;
    let currentRating = 0;
    let toastTimer = null;

    /* ═══════════════════════════════════════════════════════════
       3. MAGNETIC FLUID CURSOR
    ═══════════════════════════════════════════════════════════ */

    /**
     * Smoothly interpolates the custom cursor toward the real mouse position.
     * Called recursively via requestAnimationFrame.
     * @param {HTMLElement} cursor - The #fluid-cursor element
     */
    function lerpCursor(cursor) {
        cursorState.cursorX += (cursorState.mouseX - cursorState.cursorX) * CONFIG.LERP_FACTOR;
        cursorState.cursorY += (cursorState.mouseY - cursorState.cursorY) * CONFIG.LERP_FACTOR;
        cursor.style.transform = `translate(${cursorState.cursorX}px, ${cursorState.cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(() => lerpCursor(cursor));
    }

    /**
     * Attaches magnetic hover/leave listeners to an element.
     * The element translates slightly toward the cursor and snaps back on leave.
     * @param {HTMLElement} el     - A .magnetic element
     * @param {HTMLElement} cursor - The #fluid-cursor element
     */
    function attachMagneticEffect(el, cursor) {
        el.addEventListener('mousemove', () => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const pullX = (cursorState.mouseX - centerX) * CONFIG.MAGNET_STRENGTH;
            const pullY = (cursorState.mouseY - centerY) * CONFIG.MAGNET_STRENGTH;
            el.style.transform = `translate(${pullX}px, ${pullY}px)`;
            cursor.classList.add('hovering');
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
            cursor.classList.remove('hovering');
        });
    }

    /** Initialises the fluid cursor LERP loop and all magnetic elements. */
    function initCursor() {
        const cursor = document.getElementById('fluid-cursor');
        if (!cursor) { return; }

        requestAnimationFrame(() => lerpCursor(cursor));

        window.addEventListener('mousemove', (e) => {
            cursorState.mouseX = e.clientX;
            cursorState.mouseY = e.clientY;
        });

        document.querySelectorAll('.magnetic').forEach((el) => attachMagneticEffect(el, cursor));
    }

    /* ═══════════════════════════════════════════════════════════
       4. ENERGETIC SOUNDTRACK
    ═══════════════════════════════════════════════════════════ */

    /** Initialises the background audio toggle button. */
    function initAudio() {
        const bgMusic = new Audio(CONFIG.AUDIO_URL);
        bgMusic.loop = true;
        bgMusic.volume = CONFIG.AUDIO_VOLUME;

        const btnAudio = document.getElementById('audio-toggle');
        const iconOn = document.getElementById('audio-icon-on');
        const iconOff = document.getElementById('audio-icon-off');

        if (!btnAudio || !iconOn || !iconOff) { return; }

        btnAudio.addEventListener('click', () => {
            isAudioPlaying = !isAudioPlaying;

            if (isAudioPlaying) {
                bgMusic.play().catch((err) => console.warn('Audio play failed:', err));
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
    }

    /* ═══════════════════════════════════════════════════════════
       5. IMAGE SEQUENCE LOADER & SCROLL SEQUENCER
    ═══════════════════════════════════════════════════════════ */

    /**
     * Returns the filename for a given 1-based frame index.
     * @param {number} index
     * @returns {string}
     */
    function frameFileName(index) {
        return `ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
    }

    /**
     * Renders a single image-sequence frame onto the canvas using cover-fit scaling.
     * @param {CanvasRenderingContext2D} ctx
     * @param {HTMLCanvasElement}        canvas
     * @param {HTMLImageElement[]}       images
     * @param {number}                   index  - 0-based frame index
     */
    function drawFrame(ctx, canvas, images, index) {
        const img = images[index];
        if (!img || !img.complete) { return; }

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const offsetX = (canvas.width - img.width * ratio) / 2;
        const offsetY = (canvas.height - img.height * ratio) / 2;

        ctx.fillStyle = window._canvasBg || '#fdfcf9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, img.width * ratio, img.height * ratio);
    }

    /**
     * Shows or hides a UI panel element based on scroll position.
     * @param {HTMLElement|null} el      - Panel element
     * @param {boolean}          visible - Whether this panel should be shown
     * @param {number}           fraction - Current scroll fraction (for transform direction)
     */
    function togglePanel(el, visible, fraction) {
        if (!el) { return; }
        el.style.opacity = visible ? '1' : '0';
        el.style.transform = visible
            ? 'translateY(0)'
            : fraction < CONFIG.SCROLL_STORY ? 'translateY(40px)' : 'translateY(-40px)';
        el.classList.toggle('pointer-events-auto', visible);
        el.classList.toggle('pointer-events-none', !visible);
    }

    /**
     * Maps the scroll position to a frame index, draws it, and updates UI panels.
     * @param {HTMLElement}          htmlEl  - document.documentElement
     * @param {HTMLCanvasElement}    canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {HTMLImageElement[]}   images
     */
    function updateScrollState(htmlEl, canvas, ctx, images) {
        const scrollTrack = document.getElementById('scroll-track');
        const maxScroll = scrollTrack ? scrollTrack.scrollHeight - window.innerHeight : 1;
        const fraction = Math.max(0, Math.min(1, htmlEl.scrollTop / maxScroll));
        const frameIndex = Math.min(CONFIG.FRAME_COUNT - 1, Math.floor(fraction * CONFIG.FRAME_COUNT));

        drawFrame(ctx, canvas, images, frameIndex);

        const ui1 = document.getElementById('ui-1');
        const ui2 = document.getElementById('ui-2');
        const ui3 = document.getElementById('ui-3');

        if (fraction < CONFIG.SCROLL_STORY) {
            togglePanel(ui1, true, fraction);
            togglePanel(ui2, false, fraction);
            togglePanel(ui3, false, fraction);
        } else if (fraction < CONFIG.SCROLL_PURCHASE) {
            togglePanel(ui1, false, fraction);
            togglePanel(ui2, true, fraction);
            togglePanel(ui3, false, fraction);
        } else {
            togglePanel(ui1, false, fraction);
            togglePanel(ui2, false, fraction);
            togglePanel(ui3, true, fraction);
        }
    }

    /** Preloads all image frames and wires up scroll / resize listeners. */
    function initSequencer() {
        const canvas = document.getElementById('sequence-canvas');
        if (!canvas) { return; }

        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
        const loader = document.getElementById('loader');
        const pctText = document.getElementById('loading-pct');
        const barFill = document.getElementById('loading-bar');
        const htmlEl = document.documentElement;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /** @type {HTMLImageElement[]} */
        const images = [];
        let loadedCount = 0;

        for (let i = 1; i <= CONFIG.FRAME_COUNT; i++) {
            const img = new Image();
            img.src = frameFileName(i);
            images.push(img);

            img.onload = () => {
                loadedCount++;
                const progress = Math.floor((loadedCount / CONFIG.FRAME_COUNT) * 100);
                if (pctText) { pctText.innerText = progress; }
                if (barFill) { barFill.style.width = `${progress}%`; }

                if (loadedCount === 1) { drawFrame(ctx, canvas, images, 0); }

                if (loadedCount === CONFIG.FRAME_COUNT && loader) {
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        loader.style.pointerEvents = 'none';
                        setTimeout(() => loader.remove(), 1500);
                    }, 400);
                }
            };
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) { return; }
            requestAnimationFrame(() => {
                updateScrollState(htmlEl, canvas, ctx, images);
                ticking = false;
            });
            ticking = true;
        }, { passive: true });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            updateScrollState(htmlEl, canvas, ctx, images);
        }, { passive: true });
    }

    /* ═══════════════════════════════════════════════════════════
       6. GEO-LOCATION BASED PRICING
    ═══════════════════════════════════════════════════════════ */

    /**
     * Formats a price amount with its currency symbol.
     * Integers are shown without decimals (₹120), floats with two places ($1.99).
     * @param {string} symbol
     * @param {number} amount
     * @returns {string}
     */
    function formatPrice(symbol, amount) {
        const value = Number.isInteger(amount) ? amount : amount.toFixed(2);
        return `${symbol}${value}`;
    }

    /**
     * Animates the price elements out, updates content, then animates back in.
     * @param {string} countryCode - ISO 3166-1 alpha-2 code, or 'DEFAULT'
     */
    function applyPricing(countryCode) {
        const pricing = PRICES[countryCode] || PRICES.DEFAULT;
        const salePriceEl = document.getElementById('sale-price');
        const originalPriceEl = document.getElementById('original-price');
        const geoBadge = document.getElementById('geo-badge');
        const geoFlag = document.getElementById('geo-flag');
        const geoLabel = document.getElementById('geo-label');

        if (!salePriceEl || !originalPriceEl) { return; }

        salePriceEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        originalPriceEl.style.transition = 'opacity 0.4s ease';
        salePriceEl.style.opacity = '0';
        salePriceEl.style.transform = 'scale(0.85)';
        originalPriceEl.style.opacity = '0';

        setTimeout(() => {
            salePriceEl.textContent = formatPrice(pricing.symbol, pricing.sale);
            originalPriceEl.textContent = formatPrice(pricing.symbol, pricing.original);
            salePriceEl.style.opacity = '1';
            salePriceEl.style.transform = 'scale(1)';
            originalPriceEl.style.opacity = '1';

            if (geoFlag) { geoFlag.textContent = pricing.flag; }
            if (geoLabel) { geoLabel.textContent = `Prices shown for ${pricing.label}`; }
            if (geoBadge) { geoBadge.style.opacity = '1'; }
        }, 400);
    }

    /** Fetches the user's country from the geo API and applies the correct pricing. */
    function initGeoPricing() {
        fetch(CONFIG.GEO_API_URL)
            .then((res) => res.json())
            .then((data) => applyPricing(data.country_code || 'DEFAULT'))
            .catch(() => {
                applyPricing('DEFAULT');
                const geoFlag = document.getElementById('geo-flag');
                const geoLabel = document.getElementById('geo-label');
                const geoBadge = document.getElementById('geo-badge');
                if (geoFlag) { geoFlag.textContent = '🌍'; }
                if (geoLabel) { geoLabel.textContent = 'Global pricing'; }
                if (geoBadge) { geoBadge.style.opacity = '1'; }
            });
    }

    /* ═══════════════════════════════════════════════════════════
       7. CART SYSTEM
    ═══════════════════════════════════════════════════════════ */

    /**
     * Returns the current number of items in the cart.
     * @returns {number}
     */
    function getCartCount() { return cartCount; }

    /** Syncs the cart badge element to the current cartCount. */
    function updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        if (!badge) { return; }
        badge.textContent = cartCount;
        badge.classList.toggle('hidden', cartCount === 0);
        badge.classList.toggle('flex', cartCount > 0);
    }

    /** Binds the add-to-cart button to cart state and toast feedback. */
    function initCart() {
        const btn = document.getElementById('add-to-cart-btn');
        if (!btn) { return; }
        btn.addEventListener('click', () => {
            cartCount += quantity;
            updateCartBadge();
            showToast(`${quantity} bottle${quantity > 1 ? 's' : ''} added to cart ✓`);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       8. TOAST NOTIFICATION
    ═══════════════════════════════════════════════════════════ */

    /**
     * Displays a temporary toast notification.
     * Auto-dismisses after CONFIG.TOAST_DURATION_MS milliseconds.
     * @param {string} message - Text to display
     */
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-msg');
        if (!toast || !toastMsg) { return; }

        toastMsg.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), CONFIG.TOAST_DURATION_MS);
    }

    /* ═══════════════════════════════════════════════════════════
       9. QUANTITY STEPPER
    ═══════════════════════════════════════════════════════════ */

    /**
     * Sets the bottle quantity, clamped to a minimum of 1.
     * @param {number} val - Requested quantity
     */
    function setQuantity(val) {
        quantity = Math.max(1, val);
        const display = document.getElementById('qty-display');
        if (display) { display.textContent = quantity; }
    }

    /** Binds the quantity +/- stepper buttons. */
    function initQuantityStepper() {
        const minus = document.getElementById('qty-minus');
        const plus = document.getElementById('qty-plus');
        if (minus) { minus.addEventListener('click', () => setQuantity(quantity - 1)); }
        if (plus) { plus.addEventListener('click', () => setQuantity(quantity + 1)); }
    }

    /* ═══════════════════════════════════════════════════════════
       10. STAR RATING
    ═══════════════════════════════════════════════════════════ */

    /**
     * Returns the current star rating (0 = unrated, 1–5 = rated).
     * @returns {number}
     */
    function getCurrentRating() { return currentRating; }

    /**
     * Sets the star rating, updates button active states, and shows a label message.
     * @param {number} value - Rating between 1 and 5
     */
    function setRating(value) {
        currentRating = value;
        document.querySelectorAll('.star-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i < value);
        });
        const label = document.getElementById('rating-label');
        if (label) { label.textContent = RATING_MESSAGES[value] || 'Tap to rate'; }
    }

    /** Binds each star button to setRating. */
    function initStarRating() {
        document.querySelectorAll('.star-btn').forEach((btn) => {
            btn.addEventListener('click', () => setRating(parseInt(btn.dataset.value, 10)));
        });
    }

    /* ═══════════════════════════════════════════════════════════
       11. DARK MODE TOGGLE
    ═══════════════════════════════════════════════════════════ */

    /**
     * Returns whether dark mode is currently active.
     * @returns {boolean}
     */
    function isDark() { return isDarkMode; }

    /**
     * Applies a theme to the vignette overlays and canvas background colour.
     * @param {boolean} dark
     */
    function applyTheme(dark) {
        const t = dark ? THEME.dark : THEME.light;
        const vigRing = document.getElementById('vignette-ring');
        const vigGrad = document.getElementById('vignette-grad');
        if (vigRing) { vigRing.style.boxShadow = `inset 0 0 200px ${t.vigRing}`; }
        if (vigGrad) { vigGrad.style.background = t.vigGrad; }
        window._canvasBg = t.bg;
    }

    /**
     * Flips dark mode on/off, persists the preference, and applies the new theme.
     */
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        const btn = document.getElementById('dark-mode-toggle');
        if (btn) { btn.textContent = isDarkMode ? '☀️' : '🌙'; }
        localStorage.setItem('darkMode', String(isDarkMode));
        applyTheme(isDarkMode);
    }

    /** Restores the saved dark-mode preference and attaches the toggle button. */
    function initDarkMode() {
        const btn = document.getElementById('dark-mode-toggle');
        if (!btn) { return; }

        if (localStorage.getItem('darkMode') === 'true') {
            isDarkMode = true;
            document.body.classList.add('dark-mode');
            btn.textContent = '☀️';
        }

        applyTheme(isDarkMode);
        btn.addEventListener('click', toggleDarkMode);
    }

    /* ═══════════════════════════════════════════════════════════
       12. BOOTSTRAP
    ═══════════════════════════════════════════════════════════ */

    /**
     * Entry point — initialises all modules in dependency order.
     */
    function init() {
        initCursor();
        initAudio();
        initSequencer();
        initGeoPricing();
        initCart();
        initQuantityStepper();
        initStarRating();
        initDarkMode();
    }

    init();

    /* ═══════════════════════════════════════════════════════════
       13. COMMONJS EXPORTS (Jest / test environment only)
    ═══════════════════════════════════════════════════════════ */

    /* istanbul ignore next */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            showToast,
            setQuantity,
            setRating,
            getCurrentRating,
            toggleDarkMode,
            isDark,
            getCartCount,
            applyPricing,
            formatPrice,
        };
    }

}());
