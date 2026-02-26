module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
    },
    overrides: [
        {
            // Source file — full strict rules
            files: ['main.js'],
            rules: {
                'no-var': 'error',
                'prefer-const': 'error',
                'eqeqeq': ['error', 'always'],
                'curly': ['error', 'all'],
                'semi': ['error', 'always'],
                'quotes': ['error', 'single', { avoidEscape: true }],
                'no-console': ['warn', { allow: ['warn', 'error'] }],
                'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            },
        },
        {
            // Test files — relax console and unused-var rules
            files: ['main.test.js', 'e2e/**/*.js'],
            rules: {
                'no-unused-vars': 'warn',
                'no-console': 'off',
            },
        },
    ],
    rules: {},
};
