import { useEffect, useRef, useState, useCallback } from 'react';
import { CONFIG } from '../../constants/config';
import type { ScrollStage } from '../../types';

interface Props {
    onStageChange: (stage: ScrollStage) => void;
    canvasBg: string;
}

/**
 * Canvas Image Sequence Scroll Sequencer.
 * Preloads all 200 frames and maps scroll position → frame index.
 */
export function ScrollSequencer({ onStageChange, canvasBg }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(0);
    const [ready, setReady] = useState(false);

    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) { return; }
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) { return; }
        const img = imagesRef.current[index];
        if (!img?.complete) { return; }

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const offsetX = (canvas.width - img.width * ratio) / 2;
        const offsetY = (canvas.height - img.height * ratio) / 2;

        ctx.fillStyle = canvasBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, img.width * ratio, img.height * ratio);
    }, [canvasBg]);

    const updateScroll = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) { return; }
        const scrollTrack = document.getElementById('scroll-track');
        const maxScroll = scrollTrack
            ? scrollTrack.scrollHeight - window.innerHeight
            : 1;
        const fraction = Math.max(0, Math.min(1, document.documentElement.scrollTop / maxScroll));
        const frameIndex = Math.min(CONFIG.FRAME_COUNT - 1, Math.floor(fraction * CONFIG.FRAME_COUNT));
        drawFrame(frameIndex);

        if (fraction < CONFIG.SCROLL_STORY) { onStageChange('intro'); }
        else if (fraction < CONFIG.SCROLL_PURCHASE) { onStageChange('story'); }
        else { onStageChange('purchase'); }
    }, [drawFrame, onStageChange]);

    // Preload all frames
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) { return; }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let count = 0;
        const images: HTMLImageElement[] = [];
        imagesRef.current = images;

        for (let i = 1; i <= CONFIG.FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `${import.meta.env.BASE_URL}ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
            images.push(img);
            img.onload = () => {
                count++;
                setLoaded(count);
                if (count === 1) { drawFrame(0); }
                if (count === Math.min(15, CONFIG.FRAME_COUNT)) { setReady(true); }
            };
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Scroll + resize listeners
    useEffect(() => {
        if (!ready) { return; }
        let ticking = false;
        const onScroll = () => {
            if (ticking) { return; }
            requestAnimationFrame(() => { updateScroll(); ticking = false; });
            ticking = true;
        };
        const onResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                updateScroll();
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, [ready, updateScroll]);

    const progress = Math.floor((loaded / CONFIG.FRAME_COUNT) * 100);

    return (
        <>
            {/* Loading screen */}
            {!ready && (
                <div id="loader" style={{ opacity: ready ? 0 : 1 }}>
                    <p className="text-[0.65rem] tracking-[0.5em] uppercase font-bold opacity-40 mb-8">
                        Loading Experience
                    </p>
                    <div className="w-48 h-px bg-[#1a0f05]/10 relative overflow-hidden rounded-full mb-4">
                        <div
                            id="loading-bar"
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p id="loading-pct" className="text-4xl font-black grad-text">{progress}</p>
                    <p className="text-[0.55rem] tracking-[0.4em] uppercase opacity-30 mt-2">% loaded</p>
                </div>
            )}

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                id="sequence-canvas"
                className="absolute inset-0 z-0 w-full h-full object-cover"
            />
        </>
    );
}
