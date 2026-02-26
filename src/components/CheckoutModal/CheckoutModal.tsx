import { useState, useEffect, FormEvent } from 'react';
import type { CheckoutStep, PriceInfo } from '../../types';
import { CONFIG, formatPrice } from '../../constants/config';

interface Props {
    isOpen: boolean;
    cartCount: number;
    pricing: PriceInfo;
    saleText: string;
    onClose: () => void;
    onSuccess: () => void;
    showToast: (msg: string) => void;
}

/** 3-step checkout modal: Summary → Delivery Form → Success. */
export function CheckoutModal({
    isOpen, cartCount, pricing, saleText,
    onClose, onSuccess, showToast,
}: Props) {
    const [step, setStep] = useState<CheckoutStep>('summary');
    const [modalQty, setModalQty] = useState(cartCount || 1);
    const [submitting, setSubmitting] = useState(false);
    const [orderName, setOrderName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep('summary');
            setModalQty(cartCount || 1);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen, cartCount]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { onClose(); } };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    if (!isOpen) { return null; }

    const unitPrice = pricing.sale;
    const totalPrice = formatPrice(pricing.symbol, Number.isInteger(unitPrice)
        ? unitPrice * modalQty
        : parseFloat((unitPrice * modalQty).toFixed(2)));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.currentTarget;
        try {
            const res = await fetch(CONFIG.FORMSPREE_URL, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });
            if (res.ok) {
                setStep('success');
                onSuccess();
                showToast('Order placed! 🥭 Confirmation email on its way.');
            } else {
                showToast('Order failed — please try again.');
            }
        } catch {
            showToast('Network error — check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl text-sm border border-[#1a0f05]/10
    dark:border-white/10 bg-[#1a0f05]/[0.03] dark:bg-white/[0.03]
    text-[#1a0f05] dark:text-[#f5ede0] outline-none
    focus:border-orange-400 transition-colors`;

    const labelClass = `block text-[0.7rem] font-bold tracking-[0.1em] uppercase
    text-[#1a0f05]/50 dark:text-[#f5ede0]/50 mb-1.5`;

    return (
        <div
            id="checkout-overlay"
            className="fixed inset-0 z-[9999] flex items-end"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) { onClose(); } }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
        >
            <div
                id="checkout-panel"
                className="w-full max-h-[92vh] overflow-y-auto rounded-t-[28px]
                   bg-[#fdfcf9] dark:bg-[#0d0905]
                   shadow-[0_-20px_80px_rgba(0,0,0,0.25)]
                   animate-[slideUp_0.45s_cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ animation: 'slideUp 0.45s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
                {/* Drag handle + header */}
                <div className="w-11 h-1.5 rounded-full bg-[#1a0f05]/15 dark:bg-white/15 mx-auto mt-4" />
                <div className="flex justify-between items-center px-7 pt-6 pb-0">
                    <h2 id="checkout-title" className="text-2xl font-black text-[#1a0f05] dark:text-[#f5ede0]">
                        Your Order 🥭
                    </h2>
                    <button id="checkout-close" onClick={onClose} aria-label="Close checkout"
                        className="w-9 h-9 rounded-full bg-[#1a0f05]/7 flex items-center justify-center
                       text-[#1a0f05] dark:text-[#f5ede0] hover:bg-orange-500/20 transition-colors">
                        ✕
                    </button>
                </div>

                {/* ── Step 1: Summary ── */}
                {step === 'summary' && (
                    <div id="checkout-step-summary" className="px-7 py-5">
                        {/* Product row */}
                        <div className="flex items-center gap-4 p-5 rounded-[18px] mb-4
                            bg-gradient-to-br from-orange-50 to-amber-50
                            dark:from-orange-900/10 dark:to-amber-900/5
                            border border-orange-200/50 dark:border-orange-800/20">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500
                              flex items-center justify-center text-3xl flex-shrink-0">🥭</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-extrabold text-[0.92rem] text-[#1a0f05] dark:text-[#f5ede0]">
                                    Raw Pressery Alphonso Mango Juice</p>
                                <p className="text-[0.75rem] text-[#1a0f05]/50 dark:text-[#f5ede0]/50">
                                    Cold Pressed · GI Certified · 200ml</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p id="co-unit-price" className="font-black text-lg grad-text">{saleText}</p>
                                <p className="text-[0.7rem] text-[#1a0f05]/40 dark:text-[#f5ede0]/40">per bottle</p>
                            </div>
                        </div>

                        {/* Modal qty stepper */}
                        <div className="flex items-center justify-between px-5 py-4 rounded-2xl
                            border border-[#1a0f05]/8 dark:border-white/8 mb-4">
                            <span className="text-[0.78rem] font-bold uppercase tracking-widest
                               text-[#1a0f05]/50 dark:text-[#f5ede0]/50">Quantity</span>
                            <div className="flex items-center gap-4">
                                <button id="co-qty-minus" onClick={() => setModalQty(q => Math.max(1, q - 1))}
                                    className="w-9 h-9 rounded-full border border-[#1a0f05]/15 dark:border-white/15
                             text-xl font-bold hover:bg-orange-500/15 transition-colors
                             flex items-center justify-center text-[#1a0f05] dark:text-[#f5ede0]">−</button>
                                <span id="co-qty-display" className="text-xl font-black w-6 text-center
                  text-[#1a0f05] dark:text-[#f5ede0]">{modalQty}</span>
                                <button id="co-qty-plus" onClick={() => setModalQty(q => q + 1)}
                                    className="w-9 h-9 rounded-full border border-[#1a0f05]/15 dark:border-white/15
                             text-xl font-bold hover:bg-orange-500/15 transition-colors
                             flex items-center justify-center text-[#1a0f05] dark:text-[#f5ede0]">+</button>
                            </div>
                        </div>

                        {/* Price breakdown */}
                        <div className="px-5 py-4 rounded-2xl bg-[#1a0f05]/[0.03] dark:bg-white/[0.03] mb-6">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-[#1a0f05]/55 dark:text-[#f5ede0]/55">Subtotal</span>
                                <span id="co-subtotal" className="text-sm font-bold text-[#1a0f05] dark:text-[#f5ede0]">
                                    {modalQty} × {saleText}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-[#1a0f05]/55 dark:text-[#f5ede0]/55">Delivery</span>
                                <span className="text-sm font-bold text-green-500">FREE ✓</span>
                            </div>
                            <hr className="border-[#1a0f05]/8 dark:border-white/8 my-3" />
                            <div className="flex justify-between">
                                <span className="font-black text-[#1a0f05] dark:text-[#f5ede0]">Total</span>
                                <span id="co-total" className="text-lg font-black grad-text">{totalPrice}</span>
                            </div>
                        </div>

                        <button id="co-proceed-btn" onClick={() => setStep('form')}
                            className="w-full py-[18px] rounded-full font-extrabold text-sm tracking-[0.12em]
                         uppercase text-white bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
                         shadow-[0_8px_30px_rgba(255,100,0,0.35)]
                         hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,100,0,0.45)]
                         active:translate-y-0 transition-all">
                            Proceed to Checkout →
                        </button>
                    </div>
                )}

                {/* ── Step 2: Form ── */}
                {step === 'form' && (
                    <div id="checkout-step-form" className="px-7 py-5">
                        <button id="co-back-btn" onClick={() => setStep('summary')}
                            className="text-[0.78rem] font-bold tracking-wide text-[#1a0f05]/50
                         dark:text-[#f5ede0]/50 hover:text-orange-500 transition-colors mb-5 flex items-center gap-2">
                            ← Back to order
                        </button>

                        <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                            <input type="hidden" name="product" value="Raw Pressery Alphonso Mango Juice" />
                            <input type="hidden" id="co-form-qty" name="quantity" value={modalQty} />
                            <input type="hidden" id="co-form-price" name="total_price" value={totalPrice} />

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="co-name" className={labelClass}>Full Name *</label>
                                    <input id="co-name" type="text" name="name" required autoComplete="name"
                                        placeholder="Nikul Goyani" className={inputClass}
                                        onChange={e => setOrderName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="co-phone" className={labelClass}>Phone *</label>
                                    <input id="co-phone" type="tel" name="phone" required autoComplete="tel"
                                        placeholder="+91 98765 43210" className={inputClass} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="co-email" className={labelClass}>Email *</label>
                                <input id="co-email" type="email" name="email" required autoComplete="email"
                                    placeholder="you@example.com" className={inputClass} />
                            </div>

                            <div>
                                <label htmlFor="co-address" className={labelClass}>Delivery Address *</label>
                                <textarea id="co-address" name="address" required rows={3}
                                    autoComplete="street-address"
                                    placeholder="Flat 12B, Sunrise Apartments, MG Road, Mumbai 400001"
                                    className={`${inputClass} resize-none font-sans`} />
                            </div>

                            <div>
                                <label htmlFor="co-notes" className={labelClass}>Delivery Notes (optional)</label>
                                <input id="co-notes" type="text" name="notes"
                                    placeholder="Leave at door, ring bell twice…" className={inputClass} />
                            </div>

                            {/* Mini total */}
                            <div className="flex justify-between items-center px-4 py-3.5 rounded-2xl
                              bg-gradient-to-br from-orange-50 to-amber-50
                              dark:from-orange-900/10 dark:to-amber-900/5
                              border border-orange-200/40 dark:border-orange-800/20">
                                <span className="text-sm font-bold text-[#1a0f05]/60 dark:text-[#f5ede0]/60">
                                    Order total</span>
                                <span id="co-form-total-display" className="text-lg font-black grad-text">
                                    {totalPrice}</span>
                            </div>

                            <button id="co-submit-btn" type="submit" disabled={submitting}
                                className="w-full py-[18px] rounded-full font-extrabold text-sm tracking-[0.12em]
                           uppercase text-white bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
                           shadow-[0_8px_30px_rgba(255,100,0,0.35)] mt-1
                           hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                                {submitting ? 'Placing order…' : '🥭 Place Order'}
                            </button>

                            <p className="text-center text-[0.68rem] text-[#1a0f05]/35 dark:text-[#f5ede0]/35
                            tracking-wide">🔒 Your information is safe &amp; secure</p>
                        </form>
                    </div>
                )}

                {/* ── Step 3: Success ── */}
                {step === 'success' && (
                    <div id="checkout-step-success" className="px-7 py-10 text-center">
                        <div className="text-6xl mb-4" style={{ animation: 'bounceIn 0.6s ease both' }}>🥭</div>
                        <h3 className="text-2xl font-black text-[#1a0f05] dark:text-[#f5ede0] mb-2">
                            Order Placed!</h3>
                        <p id="co-success-name" className="text-sm text-[#1a0f05]/60 dark:text-[#f5ede0]/60 mb-6">
                            Thank you{orderName ? `, ${orderName}` : ''}! We'll confirm your order via email shortly.
                        </p>
                        <div className="p-5 rounded-[18px] text-left mb-7
                            bg-gradient-to-br from-orange-50 to-amber-50
                            dark:from-orange-900/10 dark:to-amber-900/5
                            border border-orange-200/50 dark:border-orange-800/20">
                            <p id="co-success-detail"
                                className="text-sm text-[#1a0f05]/80 dark:text-[#f5ede0]/80 leading-7"
                                dangerouslySetInnerHTML={{
                                    __html: `📦 <strong>${modalQty} bottle${modalQty > 1 ? 's' : ''}</strong> of Raw Pressery Alphonso Mango Juice<br>
                           💰 <strong>${totalPrice}</strong><br>
                           🚚 FREE delivery · Expected in 2–4 business days<br>
                           ✅ Confirmation email on its way`,
                                }}
                            />
                        </div>
                        <button id="co-done-btn" onClick={onClose}
                            className="w-full py-4 rounded-full font-extrabold text-sm tracking-[0.12em]
                         uppercase text-white bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
                         shadow-[0_8px_30px_rgba(255,100,0,0.3)] hover:-translate-y-1 transition-all">
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
