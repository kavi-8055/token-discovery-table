import { memo, ReactNode } from 'react';
import Image from 'next/image';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Token } from '@/lib/redux/slices/tokensSlice';
import { TrendingUp, Users, Droplet, Calendar } from 'lucide-react';
import { PercentageChange } from '@/components/atoms/PercentageChange';

interface TokenPopoverProps {
  token: Token;
  children: ReactNode;
}

export const TokenPopover = memo(function TokenPopover({
  token,
  children,
}: TokenPopoverProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80" align="start">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={token.imageUrl || '/token-placeholder.svg'}
                alt={token.name}
                fill
                className="rounded-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{token.name}</h3>
              <p className="text-sm text-muted-foreground">{token.symbol}</p>
            </div>
          </div>

          {/* Price Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Current Price</p>
              <p className="text-lg font-bold">${token.price.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">24h Change</p>
              <PercentageChange value={token.priceChange24h} />
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Market Cap
              </span>
              <span className="font-medium">
                ${(token.marketCap / 1000000).toFixed(2)}M
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Droplet className="h-4 w-4" />
                Liquidity
              </span>
              <span className="font-medium">
                ${(token.liquidity / 1000).toFixed(2)}K
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Holders
              </span>
              <span className="font-medium">{token.holders.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Created
              </span>
              <span className="font-medium">{formatDate(token.createdAt)}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
});