interface Props {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

/** Quantity +/- stepper shared by the main page and checkout modal. */
export function QuantityStepper({ quantity, onIncrease, onDecrease }: Props) {
    return (
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
            <button
                id="qty-minus"
                onClick={onDecrease}
                className="w-8 h-8 rounded-full bg-[#1a0f05]/10 flex items-center justify-center hover:bg-orange-500/20 transition-colors font-bold text-lg"
                aria-label="Decrease quantity"
            >−</button>
            <span id="qty-display" className="w-6 text-center font-black text-lg">{quantity}</span>
            <button
                id="qty-plus"
                onClick={onIncrease}
                className="w-8 h-8 rounded-full bg-[#1a0f05]/10 flex items-center justify-center hover:bg-orange-500/20 transition-colors font-bold text-lg"
                aria-label="Increase quantity"
            >+</button>
        </div>
    );
}
