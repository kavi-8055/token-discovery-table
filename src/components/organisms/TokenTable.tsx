import { memo, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TokenRow } from '@/components/molecules/TokenRow';
import { TokenTableSkeleton } from '@/components/atoms/TokenSkeleton';
import { NoSearchResults } from '@/components/atoms/EmptyState';
import { Token } from '@/lib/redux/slices/tokensSlice';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TokenTableProps {
  tokens: Token[];
  loading?: boolean;
  previousPrices?: Map<string, number>;
  onTokenClick?: (token: Token) => void;
  onClearFilters?: () => void;
}

type SortField = keyof Token;
type SortOrder = 'asc' | 'desc';

// Move SortIcon outside of component
const SortIcon = ({ 
  field, 
  sortField, 
  sortOrder 
}: { 
  field: SortField; 
  sortField: SortField; 
  sortOrder: SortOrder;
}) => {
  if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
  return sortOrder === 'asc' ? (
    <ArrowUp className="ml-2 h-4 w-4" />
  ) : (
    <ArrowDown className="ml-2 h-4 w-4" />
  );
};

export const TokenTable = memo(function TokenTable({
  tokens,
  loading,
  previousPrices,
  onTokenClick,
  onClearFilters,
}: TokenTableProps) {
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [tokens, sortField, sortOrder]);

  if (loading) {
    return <TokenTableSkeleton rows={8} />;
  }

  if (tokens.length === 0) {
    return <NoSearchResults onClear={onClearFilters || (() => {})} />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="rounded-md border min-w-[800px]">
        <Table>
          <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('name')}
                className="hover:bg-transparent"
              >
                Token
                <SortIcon field="name" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('price')}
                className="hover:bg-transparent"
              >
                Price
                <SortIcon field="price" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('priceChange24h')}
                className="hover:bg-transparent"
              >
                24h %
                <SortIcon field="priceChange24h" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('volume24h')}
                className="hover:bg-transparent"
              >
                Volume
                <SortIcon field="volume24h" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('marketCap')}
                className="hover:bg-transparent"
              >
                Market Cap
                <SortIcon field="marketCap" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('liquidity')}
                className="hover:bg-transparent"
              >
                Liquidity
                <SortIcon field="liquidity" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('holders')}
                className="hover:bg-transparent"
              >
                Holders
                <SortIcon field="holders" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTokens.map((token) => (
            <TokenRow
              key={token.id}
              token={token}
              previousPrice={previousPrices?.get(token.id)}
              onClick={() => onTokenClick?.(token)}
            />
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
});