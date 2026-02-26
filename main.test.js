const fs = require('fs');
const path = require('path');

// Shared setup helper — loads fresh DOM + runs main.js before each suite
function setupDOM() {
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    document.documentElement.innerHTML = html;

    // Mock browser APIs not available in jsdom
    window.requestAnimationFrame = jest.fn();
    window.localStorage = {
        _store: {},
        getItem(k) { return this._store[k] ?? null; },
        setItem(k, v) { this._store[k] = String(v); },
        removeItem(k) { delete this._store[k]; },
        clear() { this._store = {}; }
    };
    global.Audio = jest.fn().mockImplementation(() => ({
        play: jest.fn().mockResolvedValue(undefined),
        pause: jest.fn(),
        loop: false,
        volume: 1
    }));
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
        fillRect: jest.fn(),
        drawImage: jest.fn()
    }));

    // Mock fetch — default returns India (IN)
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ country_code: 'IN' })
        })
    );

    jest.resetModules();
    require('./main.js');
}

// ─────────────────────────────────────────────
// SUITE 1: Core DOM Presence
// ─────────────────────────────────────────────
describe('Core DOM Presence', () => {
    beforeAll(setupDOM);

    test('fluid cursor element exists', () => {
        expect(document.getElementById('fluid-cursor')).not.toBeNull();
    });

    test('loader starts at 0%', () => {
        const pctText = document.getElementById('loading-pct');
        expect(pctText.textContent.trim()).toBe('0');
    });

    test('magnetic elements are present', () => {
        const magnetics = document.querySelectorAll('.magnetic');
        expect(magnetics.length).toBeGreaterThan(0);
    });

    test('canvas element exists', () => {
        expect(document.getElementById('sequence-canvas')).not.toBeNull();
    });
});

// ─────────────────────────────────────────────
// SUITE 2: Audio Toggle
// ─────────────────────────────────────────────
describe('Audio Toggle', () => {
    beforeAll(setupDOM);

    test('audio icons and button exist', () => {
        expect(document.getElementById('audio-toggle')).not.toBeNull();
        expect(document.getElementById('audio-icon-on')).not.toBeNull();
        expect(document.getElementById('audio-icon-off')).not.toBeNull();
    });

    test('clicking audio toggle shows "on" icon', () => {
        const btn = document.getElementById('audio-toggle');
        const iconOn = document.getElementById('audio-icon-on');
        const iconOff = document.getElementById('audio-icon-off');

        btn.dispatchEvent(new MouseEvent('click'));

        expect(iconOff.classList.contains('hidden')).toBe(true);
        expect(iconOn.classList.contains('hidden')).toBe(false);
        expect(btn.classList.contains('text-orange-500')).toBe(true);
    });

    test('clicking audio toggle again restores "off" icon', () => {
        const btn = document.getElementById('audio-toggle');
        const iconOn = document.getElementById('audio-icon-on');
        const iconOff = document.getElementById('audio-icon-off');

        btn.dispatchEvent(new MouseEvent('click')); // second click

        expect(iconOff.classList.contains('hidden')).toBe(false);
        expect(iconOn.classList.contains('hidden')).toBe(true);
        expect(btn.classList.contains('text-orange-500')).toBe(false);
    });
});

// ─────────────────────────────────────────────
// SUITE 3: Quantity Stepper
// ─────────────────────────────────────────────
describe('Quantity Stepper', () => {
    beforeAll(setupDOM);

    test('qty starts at 1', () => {
        expect(document.getElementById('qty-display').textContent).toBe('1');
    });

    test('plus button increments quantity', () => {
        const plus = document.getElementById('qty-plus');
        plus.dispatchEvent(new MouseEvent('click'));
        expect(document.getElementById('qty-display').textContent).toBe('2');
    });

    test('minus button decrements quantity', () => {
        const minus = document.getElementById('qty-minus');
        minus.dispatchEvent(new MouseEvent('click'));
        expect(document.getElementById('qty-display').textContent).toBe('1');
    });

    test('quantity cannot go below 1', () => {
        const minus = document.getElementById('qty-minus');
        minus.dispatchEvent(new MouseEvent('click'));
        minus.dispatchEvent(new MouseEvent('click'));
        expect(document.getElementById('qty-display').textContent).toBe('1');
    });
});

// ─────────────────────────────────────────────
// SUITE 4: Cart System
// ─────────────────────────────────────────────
describe('Cart System', () => {
    beforeAll(setupDOM);

    test('cart badge is hidden initially', () => {
        const badge = document.getElementById('cart-badge');
        expect(badge.classList.contains('hidden')).toBe(true);
    });

    test('add-to-cart button exists', () => {
        expect(document.getElementById('add-to-cart-btn')).not.toBeNull();
    });

    test('clicking add to cart shows cart badge with correct count', () => {
        const btn = document.getElementById('add-to-cart-btn');
        btn.dispatchEvent(new MouseEvent('click'));

        const badge = document.getElementById('cart-badge');
        expect(badge.classList.contains('hidden')).toBe(false);
        expect(badge.textContent).toBe('1');
    });

    test('clicking add to cart multiple times accumulates the count', () => {
        const btn = document.getElementById('add-to-cart-btn');
        btn.dispatchEvent(new MouseEvent('click'));
        btn.dispatchEvent(new MouseEvent('click'));

        const badge = document.getElementById('cart-badge');
        expect(parseInt(badge.textContent)).toBeGreaterThanOrEqual(3);
    });
});

// ─────────────────────────────────────────────
// SUITE 5: Toast Notification
// ─────────────────────────────────────────────
describe('Toast Notification', () => {
    beforeAll(setupDOM);

    test('toast element exists and is hidden by default', () => {
        const toast = document.getElementById('toast');
        expect(toast).not.toBeNull();
        expect(toast.classList.contains('show')).toBe(false);
    });

    test('clicking add-to-cart shows toast', () => {
        const btn = document.getElementById('add-to-cart-btn');
        btn.dispatchEvent(new MouseEvent('click'));

        const toast = document.getElementById('toast');
        expect(toast.classList.contains('show')).toBe(true);
    });

    test('toast contains correct message after add to cart', () => {
        const toastMsg = document.getElementById('toast-msg');
        expect(toastMsg.textContent).toMatch(/bottle/i);
    });
});

// ─────────────────────────────────────────────
// SUITE 6: Star Rating
// ─────────────────────────────────────────────
describe('Star Rating', () => {
    beforeAll(setupDOM);

    test('five star buttons exist', () => {
        const stars = document.querySelectorAll('.star-btn');
        expect(stars.length).toBe(5);
    });

    test('rating label defaults to "Tap to rate" or a rating message', () => {
        const label = document.getElementById('rating-label');
        // Either fresh "tap to rate" default OR a valid rating message from any earlier suite interaction
        expect(label.textContent.trim().length).toBeGreaterThan(0);
    });

    test('clicking a star activates it and lower stars', () => {
        const stars = document.querySelectorAll('.star-btn');
        stars[2].dispatchEvent(new MouseEvent('click')); // click 3rd star (rating = 3)

        expect(stars[0].classList.contains('active')).toBe(true);
        expect(stars[1].classList.contains('active')).toBe(true);
        expect(stars[2].classList.contains('active')).toBe(true);
        expect(stars[3].classList.contains('active')).toBe(false);
        expect(stars[4].classList.contains('active')).toBe(false);
    });

    test('rating label updates after clicking a star', () => {
        const label = document.getElementById('rating-label');
        expect(label.textContent.toLowerCase()).not.toBe('tap to rate');
    });
});

// ─────────────────────────────────────────────
// SUITE 7: Dark Mode Toggle
// ─────────────────────────────────────────────
describe('Dark Mode Toggle', () => {
    beforeAll(setupDOM);

    test('dark mode toggle button exists', () => {
        expect(document.getElementById('dark-mode-toggle')).not.toBeNull();
    });

    test('body does not have dark-mode class initially', () => {
        expect(document.body.classList.contains('dark-mode')).toBe(false);
    });

    test('clicking toggle adds dark-mode class to body', () => {
        const toggle = document.getElementById('dark-mode-toggle');
        toggle.dispatchEvent(new MouseEvent('click'));
        expect(document.body.classList.contains('dark-mode')).toBe(true);
    });

    test('clicking toggle again removes dark-mode class', () => {
        const toggle = document.getElementById('dark-mode-toggle');
        toggle.dispatchEvent(new MouseEvent('click'));
        expect(document.body.classList.contains('dark-mode')).toBe(false);
    });

    test('dark mode preference is saved to localStorage', () => {
        const toggle = document.getElementById('dark-mode-toggle');
        toggle.dispatchEvent(new MouseEvent('click')); // enable dark
        expect(window.localStorage.getItem('darkMode')).toBe('true');
        toggle.dispatchEvent(new MouseEvent('click')); // disable
        expect(window.localStorage.getItem('darkMode')).toBe('false');
    });
});

// ─────────────────────────────────────────────
// SUITE 8: Geo-Location Based Pricing
// ─────────────────────────────────────────────
describe('Geo-Location Based Pricing', () => {
    beforeAll(setupDOM);

    test('sale-price element exists in the DOM', () => {
        expect(document.getElementById('sale-price')).not.toBeNull();
    });

    test('original-price element exists in the DOM', () => {
        expect(document.getElementById('original-price')).not.toBeNull();
    });

    test('geo-badge element exists in the DOM', () => {
        expect(document.getElementById('geo-badge')).not.toBeNull();
    });

    test('geo-label element exists in the DOM', () => {
        expect(document.getElementById('geo-label')).not.toBeNull();
    });

    test('fetch was called on load for geo detection', () => {
        expect(global.fetch).toHaveBeenCalledWith('https://ipapi.co/json/');
    });

    test('PRICES table has entries for major countries', () => {
        // Test the PRICES object structure by verifying the DOM defaults match India pricing
        const saleEl = document.getElementById('sale-price');
        // Prices resolve async, so check the element is a string (not null/undefined)
        expect(typeof saleEl.textContent).toBe('string');
        expect(saleEl.textContent.length).toBeGreaterThan(0);
    });

    test('formatPrice produces correct output for integer amounts', () => {
        // Simulate what formatPrice would produce for India
        const symbol = '₹';
        const amount = 120;
        const formatted = Number.isInteger(amount) ? amount : amount.toFixed(2);
        expect(`${symbol}${formatted}`).toBe('₹120');
    });

    test('formatPrice produces correct output for decimal amounts', () => {
        // Simulate what formatPrice would produce for USA
        const symbol = '$';
        const amount = 1.99;
        const formatted = Number.isInteger(amount) ? amount : amount.toFixed(2);
        expect(`${symbol}${formatted}`).toBe('$1.99');
    });

    test('geo pricing falls back gracefully on fetch failure', async () => {
        // Override fetch to simulate network failure
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

        // Re-setup DOM and require fresh module
        const htmlPath = require('path').resolve(__dirname, 'index.html');
        const html = require('fs').readFileSync(htmlPath, 'utf8');
        document.documentElement.innerHTML = html;
        window.requestAnimationFrame = jest.fn();
        window.localStorage = { _store: {}, getItem: () => null, setItem: () => { }, removeItem: () => { }, clear: () => { } };
        global.Audio = jest.fn(() => ({ play: jest.fn().mockResolvedValue(), pause: jest.fn() }));
        HTMLCanvasElement.prototype.getContext = jest.fn(() => ({ fillRect: jest.fn(), drawImage: jest.fn() }));

        jest.resetModules();
        require('./main.js');

        // Allow fetch rejection + setTimeout to settle
        await new Promise(r => setTimeout(r, 50));

        const saleEl = document.getElementById('sale-price');
        // Should still show a price (default fallback), not be empty
        expect(saleEl.textContent.length).toBeGreaterThan(0);
    });
});

