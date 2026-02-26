import { useState, useEffect, useCallback } from 'react';
import { THEME } from '../constants/config';

/**
 * Persists dark-mode state in localStorage and applies
 * the `dark` class to `<html>` + vignette overrides.
 */
export function useDarkMode() {
    const [isDark, setIsDark] = useState<boolean>(
        () => localStorage.getItem('darkMode') === 'true',
    );

    const applyTheme = useCallback((dark: boolean) => {
        document.documentElement.classList.toggle('dark', dark);
        document.body.classList.toggle('dark', dark);
        const t = dark ? THEME.dark : THEME.light;
        const vigRing = document.getElementById('vignette-ring');
        const vigGrad = document.getElementById('vignette-grad');
        if (vigRing) { vigRing.style.boxShadow = `inset 0 0 200px ${t.vigRing}`; }
        if (vigGrad) { vigGrad.style.background = t.vigGrad; }
        (window as Window & { _canvasBg?: string })._canvasBg = t.bg;
    }, []);

    useEffect(() => {
        applyTheme(isDark);
    }, [isDark, applyTheme]);

    const toggle = useCallback(() => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('darkMode', String(next));
            return next;
        });
    }, []);

    return { isDark, toggle };
}
