import { describe, it, expect } from 'vitest';
import { formatPrice, PRICES } from '../constants/config';

describe('formatPrice()', () => {
    it('shows integers without decimals', () => {
        expect(formatPrice('₹', 120)).toBe('₹120');
    });
    it('shows floats with 2 decimal places', () => {
        expect(formatPrice('$', 1.99)).toBe('$1.99');
    });
    it('handles zero', () => {
        expect(formatPrice('€', 0)).toBe('€0');
    });
});

describe('PRICES table', () => {
    it('contains a DEFAULT entry', () => {
        expect(PRICES['DEFAULT']).toBeDefined();
        expect(PRICES['DEFAULT'].symbol).toBe('₹');
    });
    it('contains India (IN) entry', () => {
        expect(PRICES['IN'].sale).toBe(120);
    });
    it('is immutable (Object.freeze)', () => {
        expect(() => {
            (PRICES as Record<string, unknown>)['XX'] = { symbol: 'X', sale: 0, original: 0, label: '', flag: '' };
        }).toThrow();
    });
});
