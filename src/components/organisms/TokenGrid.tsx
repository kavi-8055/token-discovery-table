import { memo } from 'react';
import { TokenCard } from '@/components/molecules/TokenCard';
import { TokenTableSkeleton } from '@/components/atoms/TokenSkeleton';
import { NoSearchResults } from '@/components/atoms/EmptyState';
import { Token } from '@/lib/redux/slices/tokensSlice';

interface TokenGridProps {
  tokens: Token[];
  loading?: boolean;
  previousPrices?: Map<string, number>;
  onTokenClick?: (token: Token) => void;
  onClearFilters?: () => void;
}

export const TokenGrid = memo(function TokenGrid({
  tokens,
  loading,
  previousPrices,
  onTokenClick,
  onClearFilters,
}: TokenGridProps) {
  if (loading) {
    return <TokenTableSkeleton rows={6} />;
  }

  if (tokens.length === 0) {
    return <NoSearchResults onClear={onClearFilters || (() => {})} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tokens.map((token) => (
        <TokenCard
          key={token.id}
          token={token}
          previousPrice={previousPrices?.get(token.id)}
          onClick={() => onTokenClick?.(token)}
        />
      ))}
    </div>
  );
});