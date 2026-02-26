import { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './components/Nav/Nav';
import { FluidCursor } from './components/FluidCursor/FluidCursor';
import { Toast } from './components/Toast/Toast';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import { HomePage } from './pages/HomePage/HomePage';
import { StoryPage } from './pages/StoryPage/StoryPage';
import { useDarkMode } from './hooks/useDarkMode';
import { useCart } from './hooks/useCart';
import { useToast } from './hooks/useToast';
import { useGeoPricing } from './hooks/useGeoPricing';

/**
 * App root — provides all shared state (dark mode, cart, toast, geo pricing)
 * and renders the Nav + Router with HomePage / StoryPage.
 */
export default function App() {
    const { isDark, toggle: toggleDark } = useDarkMode();
    const { cartCount, quantity, setQuantity, addToCart, resetCart } = useCart();
    const { message, visible, showToast } = useToast();
    const geoPricing = useGeoPricing();
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const openCheckout = useCallback(() => setCheckoutOpen(true), []);
    const closeCheckout = useCallback(() => setCheckoutOpen(false), []);
    const handleSuccess = useCallback(() => { resetCart(); }, [resetCart]);

    const onCartClick = useCallback(() => {
        if (cartCount > 0) {
            openCheckout();
        } else {
            showToast('Add a bottle to your cart first! 🥭');
        }
    }, [cartCount, openCheckout, showToast]);

    return (
        <HashRouter>
            <FluidCursor />
            <Toast visible={visible} message={message} />

            <Nav
                cartCount={cartCount}
                isDark={isDark}
                onToggleDark={toggleDark}
                onCartClick={onCartClick}
            />

            <CheckoutModal
                isOpen={checkoutOpen}
                cartCount={cartCount}
                pricing={geoPricing.pricing}
                saleText={geoPricing.saleText}
                onClose={closeCheckout}
                onSuccess={handleSuccess}
                showToast={showToast}
            />

            <main>
                <AnimatedRoutes
                    quantity={quantity}
                    cartCount={cartCount}
                    isDark={isDark}
                    setQuantity={setQuantity}
                    addToCart={addToCart}
                    showToast={showToast}
                    openCheckout={openCheckout}
                />
            </main>
        </HashRouter>
    );
}

interface AnimatedRoutesProps {
    quantity: number;
    cartCount: number;
    isDark: boolean;
    setQuantity: (q: number) => void;
    addToCart: (q: number) => void;
    showToast: (msg: string) => void;
    openCheckout: () => void;
}

function AnimatedRoutes({
    quantity, cartCount, isDark, setQuantity, addToCart, showToast, openCheckout
}: AnimatedRoutesProps) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <HomePage
                        quantity={quantity}
                        cartCount={cartCount}
                        isDark={isDark}
                        setQuantity={setQuantity}
                        addToCart={addToCart}
                        showToast={showToast}
                        openCheckout={openCheckout}
                    />
                } />
                <Route path="/story" element={<StoryPage />} />
            </Routes>
        </AnimatePresence>
    );
}
