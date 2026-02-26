import { useState, useCallback, useEffect } from 'react';

/**
 * Manages cart item count and quantity selection.
 */
export function useCart() {
    const [cartCount, setCartCount] = useState<number>(() => {
        const stored = localStorage.getItem('mangoo_cart_count');
        return stored ? parseInt(stored, 10) : 0;
    });
    const [quantity, setQuantityState] = useState<number>(1);

    const setQuantity = useCallback((val: number) => {
        setQuantityState(Math.max(1, val));
    }, []);

    useEffect(() => {
        localStorage.setItem('mangoo_cart_count', cartCount.toString());
    }, [cartCount]);

    const addToCart = useCallback((qty: number) => {
        setCartCount(prev => prev + qty);
    }, []);

    const resetCart = useCallback(() => {
        setCartCount(0);
    }, []);

    return { cartCount, quantity, setQuantity, addToCart, resetCart };
}
