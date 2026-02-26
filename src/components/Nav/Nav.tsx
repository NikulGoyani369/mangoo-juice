import { Link } from 'react-router-dom';
import { AudioToggle } from '../AudioToggle/AudioToggle';

interface Props {
    cartCount: number;
    isDark: boolean;
    onToggleDark: () => void;
    onCartClick: () => void;
}

/** Top navigation bar — fixed, glassmorphic. */
export function Nav({ cartCount, isDark, onToggleDark, onCartClick }: Props) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5
                    bg-[rgba(253,252,249,0.85)] dark:bg-[rgba(13,9,5,0.85)]
                    backdrop-blur-xl border-b border-[#1a0f05]/5 dark:border-white/5">

            {/* Logo */}
            <Link to="/" className="font-serif text-lg font-black italic tracking-tight select-none
                              text-[#1a0f05]/90 dark:text-[#f5ede0]">
                Raw Pressery
            </Link>

            {/* Right side */}
            <div className="flex items-center text-[#1a0f05]/60 dark:text-[#f5ede0]/60
                      text-[0.72rem] font-bold tracking-[0.15em] uppercase">

                <AudioToggle />

                <Link to="/" className="hover:text-orange-500 transition-colors duration-300 mr-8">
                    Product
                </Link>
                <Link to="/story" className="hover:text-orange-500 transition-colors duration-300 mr-8">
                    Our Story
                </Link>

                {/* Cart button */}
                <button
                    id="cart-btn"
                    onClick={onCartClick}
                    className="relative bg-[#1a0f05] dark:bg-[#f5ede0] text-white dark:text-[#1a0f05]
                     px-8 py-3 rounded-full hover:bg-orange-600 dark:hover:bg-orange-500
                     transition-all duration-500 tracking-[0.15em] shadow-lg"
                    aria-label={`View cart (${cartCount} items)`}
                >
                    Cart
                    {cartCount > 0 && (
                        <span
                            id="cart-badge"
                            className="absolute -top-2 -right-2 bg-orange-500 text-white text-[0.6rem]
                         font-black w-5 h-5 rounded-full flex items-center justify-center"
                        >
                            {cartCount}
                        </span>
                    )}
                </button>

                {/* Dark mode */}
                <button
                    onClick={onToggleDark}
                    aria-label="Toggle dark mode"
                    className="ml-4 w-10 h-10 rounded-full border border-[#1a0f05]/10 dark:border-white/10
                     flex items-center justify-center text-base hover:border-orange-400 transition-colors
                     bg-white/50 dark:bg-white/5 shadow-sm"
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
}
