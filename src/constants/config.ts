import type { PriceTable, ThemeColors } from '../types';

// ── App-wide configuration ───────────────────────────────────
export const CONFIG = Object.freeze({
    FRAME_COUNT: 200,
    LERP_FACTOR: 0.2,
    MAGNET_STRENGTH: 0.3,
    AUDIO_URL: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    AUDIO_VOLUME: 0.5,
    TOAST_DURATION_MS: 3000,
    GEO_API_URL: 'https://ipapi.co/json/',
    SCROLL_STORY: 0.3,
    SCROLL_PURCHASE: 0.8,
    FORMSPREE_URL: 'https://formspree.io/f/mqednjoe',
});

// ── Geo-location price table ─────────────────────────────────
export const PRICES: PriceTable = Object.freeze({
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

// ── Dark / light theme tokens ────────────────────────────────
export const THEME: Record<'light' | 'dark', ThemeColors> = Object.freeze({
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

// ── Star rating messages ─────────────────────────────────────
export const RATING_MESSAGES: Record<number, string> = Object.freeze({
    1: 'Not for me',
    2: "It's okay",
    3: 'Pretty good!',
    4: 'Love it!',
    5: 'Absolutely divine! ★',
});

// ── Utility: format price ────────────────────────────────────
export function formatPrice(symbol: string, amount: number): string {
    const value = Number.isInteger(amount) ? amount : amount.toFixed(2);
    return `${symbol}${value}`;
}
