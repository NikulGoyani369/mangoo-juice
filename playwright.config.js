import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    retries: 1,
    reporter: [['html', { open: 'never' }], ['list']],

    use: {
        // Run tests locally against the preview build
        baseURL: 'http://localhost:4173/mangoo-juice/',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    webServer: {
        command: 'npm run build && npm run preview',
        port: 4173,
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
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
