import { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PercentageChangeProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export const PercentageChange = memo(function PercentageChange({
  value,
  showIcon = true,
  className,
}: PercentageChangeProps) {
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        'flex items-center gap-1 font-medium',
        isPositive ? 'text-green-600' : 'text-red-600',
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      <span>{isPositive ? '+' : ''}{value.toFixed(2)}%</span>
    </div>
  );
});