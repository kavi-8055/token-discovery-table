import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Coins, Activity } from 'lucide-react';

interface StatsBarProps {
  totalTokens: number;
  totalVolume: number;
  totalMarketCap: number;
  avgChange: number;
}

export const StatsBar = memo(function StatsBar({
  totalTokens,
  totalVolume,
  totalMarketCap,
  avgChange,
}: StatsBarProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Tokens</p>
            <p className="text-xl font-bold">{totalTokens}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-xl font-bold">{formatNumber(totalVolume)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="text-xl font-bold">{formatNumber(totalMarketCap)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${avgChange >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            <TrendingUp className={`h-5 w-5 ${avgChange >= 0 ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Change</p>
            <p className={`text-xl font-bold ${avgChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
});