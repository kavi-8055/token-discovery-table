import { memo } from 'react';
import Image from 'next/image';
import { TableCell, TableRow } from '@/components/ui/table';
import { PriceDisplay } from '@/components/atoms/PriceDisplay';
import { PercentageChange } from '@/components/atoms/PercentageChange';
import { TooltipWrapper } from '@/components/atoms/TooltipWrapper';
import { TokenPopover } from '@/components/molecules/TokenPopover';
import { Token } from '@/lib/redux/slices/tokensSlice';
import { Users, Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenRowProps {
  token: Token;
  previousPrice?: number;
  onClick?: () => void;
  className?: string;
}

export const TokenRow = memo(function TokenRow({
  token,
  previousPrice,
  onClick,
  className,
}: TokenRowProps) {
  const formatNumber = (num: number, compact = true) => {
    if (compact) {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
      return `$${num.toFixed(2)}`;
    }
    return num.toLocaleString();
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TableRow
      className={cn(
        'hover:bg-muted/50 cursor-pointer transition-colors',
        className
      )}
      onClick={onClick}
    >
      {/* Token Info */}
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <div onClick={handleImageClick}>
            <TokenPopover token={token}>
              <div className="relative h-8 w-8 flex-shrink-0 cursor-help">
                <Image
                  src={token.imageUrl || '/token-placeholder.svg'}
                  alt={token.name}
                  fill
                  className="rounded-full object-cover"
                  unoptimized
                />
              </div>
            </TokenPopover>
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate">{token.name}</div>
            <div className="text-xs text-muted-foreground">{token.symbol}</div>
          </div>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell>
        <PriceDisplay
          price={token.price}
          previousPrice={previousPrice}
          decimals={4}
        />
      </TableCell>

      {/* 24h Change */}
      <TableCell>
        <PercentageChange value={token.priceChange24h} />
      </TableCell>

      {/* Volume */}
      <TableCell className="text-sm">
        {formatNumber(token.volume24h)}
      </TableCell>

      {/* Market Cap */}
      <TableCell className="text-sm">
        {formatNumber(token.marketCap)}
      </TableCell>

      {/* Liquidity */}
      <TableCell>
        <TooltipWrapper content="Total liquidity available for trading">
          <div className="flex items-center gap-1 text-sm">
            <Droplet className="h-3 w-3 text-blue-500" />
            {formatNumber(token.liquidity)}
          </div>
        </TooltipWrapper>
      </TableCell>

      {/* Holders */}
      <TableCell>
        <TooltipWrapper content="Number of unique token holders">
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-3 w-3 text-purple-500" />
            {token.holders.toLocaleString()}
          </div>
        </TooltipWrapper>
      </TableCell>
    </TableRow>
  );
});