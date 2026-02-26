import { useState, useCallback } from 'react';

/**
 * Manages cart item count and quantity selection.
 */
export function useCart() {
    const [cartCount, setCartCount] = useState<number>(0);
    const [quantity, setQuantityState] = useState<number>(1);

    const setQuantity = useCallback((val: number) => {
        setQuantityState(Math.max(1, val));
    }, []);

    const addToCart = useCallback((qty: number) => {
        setCartCount(prev => prev + qty);
    }, []);

    const resetCart = useCallback(() => {
        setCartCount(0);
    }, []);

    return { cartCount, quantity, setQuantity, addToCart, resetCart };
}
