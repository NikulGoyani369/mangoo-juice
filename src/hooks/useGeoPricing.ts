import { useState, useEffect } from 'react';
import { PRICES, formatPrice } from '../constants/config';
import type { PriceInfo } from '../types';

interface GeoPricingResult {
    pricing: PriceInfo;
    saleText: string;
    origText: string;
    isLoading: boolean;
}

/**
 * Fetches the user's country from ipapi.co and returns the
 * matching price info. Falls back to DEFAULT on any error.
 */
export function useGeoPricing(): GeoPricingResult {
    const [pricing, setPricing] = useState<PriceInfo>(PRICES['DEFAULT']);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then((data: { country_code?: string }) => {
                if (cancelled) { return; }
                const code = data.country_code ?? 'DEFAULT';
                const matched = PRICES[code] ?? PRICES['DEFAULT'];
                setPricing(matched);
            })
            .catch(() => {
                if (!cancelled) { setPricing(PRICES['DEFAULT']); }
            })
            .finally(() => {
                if (!cancelled) { setIsLoading(false); }
            });
        return () => { cancelled = true; };
    }, []);

    return {
        pricing,
        saleText: formatPrice(pricing.symbol, pricing.sale),
        origText: formatPrice(pricing.symbol, pricing.original),
        isLoading,
    };
}
