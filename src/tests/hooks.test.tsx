import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';

describe('useCart', () => {
    it('starts with cartCount=0 and quantity=1', () => {
        const { result } = renderHook(() => useCart());
        expect(result.current.cartCount).toBe(0);
        expect(result.current.quantity).toBe(1);
    });

    it('addToCart increments cartCount', () => {
        const { result } = renderHook(() => useCart());
        act(() => { result.current.addToCart(3); });
        expect(result.current.cartCount).toBe(3);
    });

    it('setQuantity enforces minimum of 1', () => {
        const { result } = renderHook(() => useCart());
        act(() => { result.current.setQuantity(-5); });
        expect(result.current.quantity).toBe(1);
    });

    it('resetCart sets cartCount back to 0', () => {
        const { result } = renderHook(() => useCart());
        act(() => { result.current.addToCart(5); });
        act(() => { result.current.resetCart(); });
        expect(result.current.cartCount).toBe(0);
    });
});

describe('useToast', () => {
    it('starts not visible', () => {
        const { result } = renderHook(() => useToast());
        expect(result.current.visible).toBe(false);
    });

    it('showToast makes it visible with correct message', () => {
        const { result } = renderHook(() => useToast());
        act(() => { result.current.showToast('Hello 🥭'); });
        expect(result.current.visible).toBe(true);
        expect(result.current.message).toBe('Hello 🥭');
    });
});
