module.exports = {
    testEnvironment: 'jsdom',
    // Only run Jest unit tests — ignore Playwright E2E specs
    testMatch: ['**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};

