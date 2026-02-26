import { useState, useCallback } from 'react';
import { ScrollSequencer } from '../../components/ScrollSequencer/ScrollSequencer';
import { StarRating } from '../../components/StarRating/StarRating';
import { QuantityStepper } from '../../components/QuantityStepper/QuantityStepper';
import { useGeoPricing } from '../../hooks/useGeoPricing';
import { THEME } from '../../constants/config';
import type { ScrollStage } from '../../types';

interface Props {
    quantity: number;
    cartCount: number;
    isDark: boolean;
    setQuantity: (q: number) => void;
    addToCart: (q: number) => void;
    showToast: (msg: string) => void;
    openCheckout: () => void;
}

export function HomePage({
    quantity, isDark, setQuantity, addToCart, showToast
}: Props) {
    const [stage, setStage] = useState<ScrollStage>('intro');
    const { pricing, saleText, origText, isLoading } = useGeoPricing();
    const canvasBg = isDark ? THEME.dark.bg : THEME.light.bg;

    const handleAddToCart = () => {
        addToCart(quantity);
        showToast(`${quantity} bottle${quantity > 1 ? 's' : ''} added to cart ✓`);
    };

    const handleStageChange = useCallback((s: ScrollStage) => setStage(s), []);

    const panelStyle = (active: boolean): React.CSSProperties => ({
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: active ? 'auto' : 'none',
    });

    return (
        <>
            {/* ── 600vh Scroll Track ── */}
            <div id="scroll-track" className="relative w-full" style={{ height: '600vh' }}>
                <div id="sticky-section" className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

                    <ScrollSequencer onStageChange={handleStageChange} canvasBg={canvasBg} />

                    {/* Vignette overlays */}
                    <div id="vignette-ring" className="absolute inset-0 z-0 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 200px ${isDark ? THEME.dark.vigRing : THEME.light.vigRing}` }} />
                    <div id="vignette-grad" className="absolute inset-0 z-0 pointer-events-none"
                        style={{ background: isDark ? THEME.dark.vigGrad : THEME.light.vigGrad }} />

                    {/* UI Panels */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-6 pointer-events-none">

                        {/* Panel 1: Intro (0–30%) */}
                        <div id="ui-1" className="absolute flex flex-col justify-center items-center" style={panelStyle(stage === 'intro')}>
                            <p className="text-orange-600 uppercase tracking-[0.6em] text-xs font-bold mb-6">
                                Cold Pressed Premium</p>
                            <h1 className="font-serif text-[clamp(4rem,12vw,12rem)] font-black italic tracking-tight
                             text-transparent bg-clip-text bg-gradient-to-br from-[#ffa100] via-[#ff5500] to-[#c71e00]
                             drop-shadow-xl text-glow-light pointer-events-auto">
                                ALPHANSO
                            </h1>
                            <p className="text-[clamp(0.9rem,2vw,1.2rem)] font-light tracking-[0.15em] mt-6 opacity-60
                            dark:opacity-80">
                                The King of Mangoes, cold-pressed.
                            </p>
                        </div>

                        {/* Panel 2: Story (30–80%) */}
                        <div id="ui-2" className="absolute max-w-lg" style={panelStyle(stage === 'story')}>
                            <p className="uppercase tracking-[0.5em] text-[0.65rem] font-bold text-orange-500 mb-5">
                                GI Certified · Ratnagiri · Maharashtra</p>
                            <h2 className="font-serif text-4xl md:text-6xl font-black italic leading-[1.05] mb-6">
                                <span className="grad-text">Nothing</span><br />but mango.
                            </h2>
                            <p className="text-sm md:text-base leading-relaxed opacity-60 mb-8">
                                Hand-picked at the peak of ripeness. Cold-pressed within 90 minutes.
                                Zero preservatives. Zero compromise.
                            </p>
                            <div className="flex justify-center gap-6 text-[0.65rem] font-black tracking-[0.3em] uppercase opacity-40">
                                <span>🌿 0 Additives</span>
                                <span>❄️ Cold Pressed</span>
                                <span>🏅 GI Certified</span>
                            </div>
                        </div>

                        {/* Panel 3: Purchase (80%+) */}
                        <div id="ui-3" className="absolute w-full max-w-sm" style={panelStyle(stage === 'purchase')}>
                            {/* Price */}
                            <div className="mb-6">
                                {isLoading ? (
                                    <div className="h-12 w-32 mx-auto rounded-full bg-orange-500/20 animate-pulse" />
                                ) : (
                                    <>
                                        <p id="sale-price" className="font-serif text-5xl font-black grad-text">{saleText}</p>
                                        <p id="original-price" className="text-sm opacity-40 line-through mt-1">{origText}</p>
                                        <div id="geo-badge" className="mt-2 flex items-center justify-center gap-1 text-[0.65rem] opacity-60">
                                            <span id="geo-flag">{pricing.flag}</span>
                                            <span id="geo-label">Prices shown for {pricing.label}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Star rating */}
                            <div className="mb-6">
                                <StarRating onRate={r => showToast(r === 5 ? 'Thank you! 🥭' : 'Thanks for rating!')} />
                            </div>

                            {/* Qty stepper */}
                            <div className="flex justify-center mb-6">
                                <QuantityStepper
                                    quantity={quantity}
                                    onIncrease={() => setQuantity(quantity + 1)}
                                    onDecrease={() => setQuantity(quantity - 1)}
                                />
                            </div>

                            {/* Add to cart */}
                            <div className="group relative pointer-events-auto">
                                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400
                                rounded-full blur-lg opacity-40 group-hover:opacity-100 transition duration-500" />
                                <button
                                    id="add-to-cart-btn"
                                    onClick={handleAddToCart}
                                    className="relative bg-[#1a0f05] px-12 py-5 rounded-full flex items-center shadow-2xl gap-3
                             hover:bg-orange-600 transition-colors duration-300"
                                >
                                    <span className="text-white font-bold tracking-[0.2em] text-sm uppercase">
                                        Secure Your Bottle
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── Marquee Footer ── */}
            <div id="footer-section" className="relative w-full z-20 py-24 border-t border-[#1a0f05]/5 overflow-hidden">
                <div className="w-full whitespace-nowrap py-10 flex border-y border-orange-500/10
                        bg-gradient-to-r from-orange-50/50 via-orange-100/30 to-orange-50/50">
                    {[0, 1].map(i => (
                        <div key={i} className="animate-marquee inline-block text-5xl md:text-6xl font-black
                                    italic tracking-widest text-[#1a0f05]/10 font-serif px-4">
                            ✦ PURE ALPHONSO ✦ NO PRESERVATIVES ✦ COLD-PRESSED ✦ 100% RAW ✦ GI-CERTIFIED RATNAGIRI ✦ NEVER CONCENTRATED ✦
                        </div>
                    ))}
                </div>

                <footer className="mt-20 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center
                           text-[#1a0f05]/60 dark:text-[#f5ede0]/40 text-xs tracking-[0.2em] uppercase font-bold">
                    <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                        <p>© 2026 Raw Pressery. All rights reserved.</p>
                        <p className="text-[0.55rem] opacity-60 tracking-[0.3em]">
                            Made with <span className="text-red-500 animate-pulse">♥</span> by Nikul Goyani
                        </p>
                    </div>
                    <div className="flex space-x-12 mt-10 md:mt-0">
                        {['Instagram', 'Twitter', 'FAQ', 'Contact'].map(link => (
                            <a key={link} href="#" className="hover:text-orange-600 transition-colors">{link}</a>
                        ))}
                    </div>
                </footer>
            </div>
        </>
    );
}
