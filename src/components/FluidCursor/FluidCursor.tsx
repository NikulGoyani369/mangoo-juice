import { useEffect, useRef } from 'react';
import { CONFIG } from '../../constants/config';

/** Custom fluid cursor that lerp-follows the mouse. */
export function FluidCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ mouseX: 0, mouseY: 0, cursorX: 0, cursorY: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) { return; }

        const onMouseMove = (e: MouseEvent) => {
            pos.current.mouseX = e.clientX;
            pos.current.mouseY = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        let rafId: number;
        const lerp = () => {
            const p = pos.current;
            p.cursorX += (p.mouseX - p.cursorX) * CONFIG.LERP_FACTOR;
            p.cursorY += (p.mouseY - p.cursorY) * CONFIG.LERP_FACTOR;
            cursor.style.transform =
                `translate(${p.cursorX}px, ${p.cursorY}px) translate(-50%, -50%)`;
            rafId = requestAnimationFrame(lerp);
        };
        rafId = requestAnimationFrame(lerp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return <div id="fluid-cursor" ref={cursorRef} />;
}
