// ── Shared TypeScript types ──────────────────────────────────

export interface PriceInfo {
    symbol: string;
    sale: number;
    original: number;
    label: string;
    flag: string;
}

export type PriceTable = Record<string, PriceInfo>;

export interface CartState {
    count: number;
    quantity: number;
}

export interface ToastState {
    message: string;
    visible: boolean;
}

export interface ThemeColors {
    bg: string;
    vigRing: string;
    vigGrad: string;
}

export type ScrollStage = 'intro' | 'story' | 'purchase';

export type CheckoutStep = 'summary' | 'form' | 'success';
