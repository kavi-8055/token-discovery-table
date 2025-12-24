import { memo, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  previousPrice?: number;
  decimals?: number;
  prefix?: string;
  className?: string;
}

export const PriceDisplay = memo(function PriceDisplay({
  price,
  previousPrice,
  decimals = 6,
  prefix = '$',
  className,
}: PriceDisplayProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevPriceRef = useRef(previousPrice);

  useEffect(() => {
    if (
      spanRef.current &&
      prevPriceRef.current !== undefined &&
      prevPriceRef.current !== price
    ) {
      const direction = price > prevPriceRef.current ? 'price-up' : 'price-down';
      
      // Add animation class
      spanRef.current.classList.add(direction);

      const timer = setTimeout(() => {
        spanRef.current?.classList.remove(direction);
      }, 600);

      prevPriceRef.current = price;

      return () => clearTimeout(timer);
    }
    prevPriceRef.current = price;
  }, [price]);

  return (
    <span
      ref={spanRef}
      className={cn('font-mono transition-colors-smooth', className)}
    >
      {prefix}{price.toFixed(decimals)}
    </span>
  );
});