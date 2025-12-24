import { memo } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Token } from '@/lib/redux/slices/tokensSlice';
import { PriceDisplay } from '@/components/atoms/PriceDisplay';
import { PercentageChange } from '@/components/atoms/PercentageChange';
import { Badge } from '@/components/ui/badge';
import { Users, Droplet, TrendingUp, Calendar } from 'lucide-react';

interface TokenDetailsModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenDetailsModal = memo(function TokenDetailsModal({
  token,
  open,
  onOpenChange,
}: TokenDetailsModalProps) {
  if (!token) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image
                src={token.imageUrl || '/token-placeholder.svg'}
                alt={token.name}
                fill
                className="rounded-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="text-xl font-bold">{token.name}</div>
              <div className="text-sm text-muted-foreground">{token.symbol}</div>
            </div>
            <Badge variant="outline" className="ml-auto">
              {token.category}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Price Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Current Price</div>
              <PriceDisplay price={token.price} decimals={6} className="text-2xl" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">24h Change</div>
              <PercentageChange value={token.priceChange24h} className="text-xl" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Market Cap
              </div>
              <div className="text-lg font-semibold">
                ${(token.marketCap / 1000000).toFixed(2)}M
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Volume 24h
              </div>
              <div className="text-lg font-semibold">
                ${(token.volume24h / 1000).toFixed(2)}K
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplet className="h-4 w-4" />
                Liquidity
              </div>
              <div className="text-lg font-semibold">
                ${(token.liquidity / 1000).toFixed(2)}K
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Holders
              </div>
              <div className="text-lg font-semibold">
                {token.holders.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium">{formatDate(token.createdAt)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});