import { useState, useCallback, useRef } from 'react';
import { CONFIG } from '../constants/config';

/**
 * Provides showToast() which auto-dismisses after CONFIG.TOAST_DURATION_MS.
 */
export function useToast() {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = useCallback((msg: string) => {
        setMessage(msg);
        setVisible(true);
        if (timerRef.current) { clearTimeout(timerRef.current); }
        timerRef.current = setTimeout(() => setVisible(false), CONFIG.TOAST_DURATION_MS);
    }, []);

    return { message, visible, showToast };
}
