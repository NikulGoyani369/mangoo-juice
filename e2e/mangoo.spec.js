import { test, expect } from '@playwright/test';

const BASE = 'https://nikulgoyani369.github.io/mangoo-juice/';

// ─────────────────────────────────────────────
// 1. PAGE LOAD & CORE ELEMENTS
// ─────────────────────────────────────────────
test.describe('Page Load & Core Elements', () => {

    test('page loads with correct title', async ({ page }) => {
        await page.goto(BASE);
        await expect(page).toHaveTitle(/Alphonso Mango/i);
    });

    test('loading screen appears and disappears', async ({ page }) => {
        await page.goto(BASE);
        // Loader should start visible
        const loader = page.locator('#loader');
        await expect(loader).toBeVisible();
        // Eventually fades out after images load
        await expect(loader).toBeHidden({ timeout: 30000 });
    });

    test('canvas element is rendered', async ({ page }) => {
        await page.goto(BASE);
        await page.waitForSelector('#sequence-canvas');
        const canvas = page.locator('#sequence-canvas');
        await expect(canvas).toBeVisible();
    });

    test('navigation bar is visible', async ({ page }) => {
        await page.goto(BASE);
        await expect(page.locator('nav')).toBeVisible();
    });

    test('page has correct meta description', async ({ page }) => {
        await page.goto(BASE);
        const description = await page.locator('meta[name="description"]').getAttribute('content');
        expect(description).toContain('cold-pressed');
        expect(description).toContain('Alphonso');
    });

    test('Open Graph tags are present', async ({ page }) => {
        await page.goto(BASE);
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
        expect(ogTitle).toContain('Alphonso Mango Juice');
    });

});

// ─────────────────────────────────────────────
// 2. SCROLL ANIMATION
// ─────────────────────────────────────────────
test.describe('Scroll Animation', () => {

    test('scroll-track exists with correct height', async ({ page }) => {
        await page.goto(BASE);
        const scrollTrack = page.locator('#scroll-track');
        await expect(scrollTrack).toBeVisible();
        const height = await scrollTrack.evaluate(el => el.style.height);
        expect(height).toBe('600vh');
    });

    test('ui-1 section is visible before scrolling', async ({ page }) => {
        await page.goto(BASE);
        await page.waitForSelector('#loader', { state: 'hidden', timeout: 30000 });
        const ui1 = page.locator('#ui-1');
        await expect(ui1).toBeVisible();
    });

    test('scrolling reveals ui-2 section', async ({ page }) => {
        await page.goto(BASE);
        await page.waitForSelector('#loader', { state: 'hidden', timeout: 30000 });

        // Scroll to 40% of the page
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
        await page.waitForTimeout(1500);

        const ui2 = page.locator('#ui-2');
        const opacity = await ui2.evaluate(el => getComputedStyle(el).opacity);
        expect(parseFloat(opacity)).toBeGreaterThan(0.5);
    });

});

// ─────────────────────────────────────────────
// 3. DARK MODE TOGGLE
// ─────────────────────────────────────────────
test.describe('Dark Mode Toggle', () => {

    test('dark mode toggle button is visible', async ({ page }) => {
        await page.goto(BASE);
        await expect(page.locator('button[aria-label="Toggle dark mode"]')).toBeVisible();
    });

    test('clicking dark mode toggle adds dark class to body', async ({ page }) => {
        await page.goto(BASE);
        await page.locator('button[aria-label="Toggle dark mode"]').click();
        const hasDark = await page.evaluate(() =>
            document.body.classList.contains('dark')
        );
        expect(hasDark).toBe(true);
    });

    test('clicking dark mode toggle twice reverts to light mode', async ({ page }) => {
        await page.goto(BASE);
        const btn = page.locator('button[aria-label="Toggle dark mode"]');
        await btn.click();
        await btn.click();
        const hasDark = await page.evaluate(() =>
            document.body.classList.contains('dark')
        );
        expect(hasDark).toBe(false);
    });

    test('dark mode preference persists in localStorage', async ({ page }) => {
        await page.goto(BASE);
        await page.locator('button[aria-label="Toggle dark mode"]').click();
        const stored = await page.evaluate(() => localStorage.getItem('darkMode'));
        expect(stored).toBe('true');
    });

});

// ─────────────────────────────────────────────
// 4. QUANTITY STEPPER & CART
// ─────────────────────────────────────────────
test.describe('Quantity Stepper & Cart', () => {

    test('quantity starts at 1', async ({ page }) => {
        await page.goto(BASE);
        // Scroll to section 3 where the stepper lives
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);
        const qty = page.locator('#qty-display');
        await expect(qty).toHaveText('1');
    });

    test('plus button increments quantity', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);
        await page.locator('#qty-plus').click();
        await expect(page.locator('#qty-display')).toHaveText('2');
    });

    test('add-to-cart button shows cart badge', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);
        await page.locator('#add-to-cart-btn').click();

        const badge = page.locator('#cart-badge');
        await expect(badge).not.toHaveClass(/hidden/);
        await expect(badge).toHaveText('1');
    });

    test('toast notification appears on add to cart', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);
        await page.locator('#add-to-cart-btn').click();

        const toast = page.locator('#toast');
        await expect(toast).toHaveClass(/show/);
        const msg = await page.locator('#toast-msg').textContent();
        expect(msg).toMatch(/bottle/i);
    });

});

// ─────────────────────────────────────────────
// 5. STAR RATING
// ─────────────────────────────────────────────
test.describe('Star Rating', () => {

    test('five star buttons are visible in purchase section', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);
        const stars = page.locator('.star-btn');
        await expect(stars).toHaveCount(5);
    });

    test('clicking 4th star activates first 4 stars', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);

        const stars = page.locator('.star-btn');
        await stars.nth(3).click(); // 4th star (0-indexed)

        // First 4 should be active
        for (let i = 0; i < 4; i++) {
            await expect(stars.nth(i)).toHaveClass(/active/);
        }
        // 5th should not be active
        await expect(stars.nth(4)).not.toHaveClass(/active/);
    });

});

// ─────────────────────────────────────────────
// 6. GEO-BASED PRICING
// ─────────────────────────────────────────────
test.describe('Geo-Based Pricing', () => {

    test('price elements are visible in purchase section', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);
        await expect(page.locator('#sale-price')).toBeVisible();
        await expect(page.locator('#original-price')).toBeVisible();
    });

    test('sale price is not empty', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1500); // allow geo fetch
        const price = await page.locator('#sale-price').textContent();
        expect(price?.trim().length).toBeGreaterThan(0);
    });

    test('geo badge becomes visible after price detection', async ({ page }) => {
        await page.goto(BASE);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000); // geo fetch + animation
        const badge = page.locator('#geo-badge');
        const opacity = await badge.evaluate(el => getComputedStyle(el).opacity);
        expect(parseFloat(opacity)).toBeGreaterThan(0);
    });

});

// ─────────────────────────────────────────────
// 7. SEO & ACCESSIBILITY
// ─────────────────────────────────────────────
test.describe('SEO & Accessibility', () => {

    test('page has exactly one H1 tag', async ({ page }) => {
        await page.goto(BASE);
        const h1s = page.locator('h1');
        await expect(h1s).toHaveCount(1);
    });

    test('H1 contains product name', async ({ page }) => {
        await page.goto(BASE);
        const h1 = page.locator('h1');
        const text = await h1.textContent();
        expect(text?.toUpperCase()).toContain('ALPHANSO');
    });

    test('all images have alt text', async ({ page }) => {
        await page.goto(BASE);
        const images = page.locator('img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
            const alt = await images.nth(i).getAttribute('alt');
            expect(alt).not.toBeNull();
        }
    });

    test('canonical link is set correctly', async ({ page }) => {
        await page.goto(BASE);
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toContain('mangoo-juice');
    });

    test('JSON-LD structured data is present', async ({ page }) => {
        await page.goto(BASE);
        const ldJson = await page.locator('script[type="application/ld+json"]').textContent();
        expect(ldJson).toContain('Product');
        expect(ldJson).toContain('schema.org');
    });

    test('page is mobile responsive', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
        await page.goto(BASE);
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
    });

    test('robots meta tag allows indexing', async ({ page }) => {
        await page.goto(BASE);
        const robots = await page.locator('meta[name="robots"]').getAttribute('content');
        expect(robots).toContain('index');
        expect(robots).toContain('follow');
    });

});
