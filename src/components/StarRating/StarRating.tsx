import { useState } from 'react';
import { RATING_MESSAGES } from '../../constants/config';

interface Props {
    onRate?: (rating: number) => void;
}

/** Interactive 5-star rating widget. */
export function StarRating({ onRate }: Props) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRate = (value: number) => {
        setRating(value);
        onRate?.(value);
    };

    return (
        <div className="text-center">
            <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        data-value={star}
                        className="star-btn"
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        onClick={() => handleRate(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
                            style={{
                                fill: (hover || rating) >= star ? '#ff6b00' : 'none',
                                stroke: (hover || rating) >= star ? '#ff6b00' : 'currentColor',
                            }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </button>
                ))}
            </div>
            <p id="rating-label" className="text-sm font-semibold opacity-60">
                {rating > 0 ? RATING_MESSAGES[rating] : 'Tap to rate'}
            </p>
        </div>
    );
}
