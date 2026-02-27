/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['mango_slice.png', 'mango_bg.png'],
            manifest: {
                name: 'Raw Pressery Mangoo',
                short_name: 'Mangoo',
                description: 'Cold-pressed Alphonso Mango Juice',
                theme_color: '#ff6b00',
                background_color: '#fdfcf9',
                display: 'standalone',
                icons: [
                    {
                        src: 'mango_slice.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'mango_slice.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    // GitHub Pages deploy — repo name becomes the base
    base: '/mangoo-juice/',
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.ts'],
        css: false,
        exclude: ['node_modules/**', 'dist/**', 'e2e/**']
    },
});
