import { memo } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PriceDisplay } from '@/components/atoms/PriceDisplay';
import { PercentageChange } from '@/components/atoms/PercentageChange';
import { Token } from '@/lib/redux/slices/tokensSlice';
import { cn } from '@/lib/utils';

interface TokenCardProps {
  token: Token;
  previousPrice?: number;
  onClick?: () => void;
  className?: string;
}

export const TokenCard = memo(function TokenCard({
  token,
  previousPrice,
  onClick,
  className,
}: TokenCardProps) {
  return (
    <Card
      className={cn(
        'p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Token Image */}
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image
            src={token.imageUrl || '/token-placeholder.svg'}
            alt={token.name}
            fill
            className="rounded-full object-cover"
            unoptimized
          />
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm truncate">{token.name}</h3>
            <PriceDisplay
              price={token.price}
              previousPrice={previousPrice}
              decimals={4}
              className="text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{token.symbol}</span>
            <PercentageChange value={token.priceChange24h} className="text-xs" />
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div>
              <span className="text-muted-foreground">Vol:</span>{' '}
              <span className="font-medium">
                ${(token.volume24h / 1000).toFixed(1)}K
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">MCap:</span>{' '}
              <span className="font-medium">
                ${(token.marketCap / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});