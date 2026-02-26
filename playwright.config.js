// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    retries: 1,
    reporter: [['html', { open: 'never' }], ['list']],

    use: {
        // Run tests against the live GitHub Pages site
        baseURL: 'https://nikulgoyani369.github.io/mangoo-juice/',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        {
            // Brave is Chromium-based — we use Chromium channel for CI
            // and can point to Brave binary locally
            name: 'Brave / Chromium',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chromium',
            },
        },
        {
            name: 'Mobile (Brave Android sim)',
            use: { ...devices['Pixel 5'] },
        },
    ],
});
