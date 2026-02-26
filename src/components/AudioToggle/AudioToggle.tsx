import { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../../constants/config';

/** Background audio toggle button. */
export function AudioToggle() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(CONFIG.AUDIO_URL);
        audio.loop = true;
        audio.volume = CONFIG.AUDIO_VOLUME;
        audioRef.current = audio;
        return () => { audio.pause(); };
    }, []);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) { return; }
        if (playing) {
            audio.pause();
        } else {
            audio.play().catch((e: unknown) => console.warn('Audio play failed:', e));
        }
        setPlaying(p => !p);
    };

    return (
        <button
            id="audio-toggle"
            onClick={toggle}
            className={`flex items-center gap-2 transition-colors mr-6 ${playing ? 'text-orange-500' : 'text-[#1a0f05]/60 hover:text-orange-600'
                }`}
            aria-label={playing ? 'Pause music' : 'Play music'}
        >
            {playing ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z m9.414-5l3.536 3.536M15 13.536L18.536 10" />
                </svg>
            )}
            <span className="tracking-[0.15em]">Sound</span>
        </button>
    );
}
