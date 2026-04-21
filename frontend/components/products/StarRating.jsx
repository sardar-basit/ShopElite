'use client';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, numReviews, size = 4, interactive = false, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onChange?.(star) : undefined}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
          disabled={!interactive}
        >
          <Star
            size={size * 4}
            className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-100'}
          />
        </button>
      ))}
      {numReviews !== undefined && (
        <span className="text-sm text-gray-500 ml-1">({numReviews})</span>
      )}
    </div>
  );
}
