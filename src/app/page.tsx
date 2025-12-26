'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setTokens, updateTokenPrice } from '@/lib/redux/slices/tokensSlice';
import { generateMockTokens } from '@/lib/services/mockData';
import { mockWebSocket } from '@/lib/services/websocket';
import { TokenTable } from '@/components/organisms/TokenTable';
import { TokenGrid } from '@/components/organisms/TokenGrid';
import { TokenDetailsModal } from '@/components/organisms/TokenDetailsModal';
import { Token } from '@/lib/redux/slices/tokensSlice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { StatsBar } from '@/components/molecules/StatsBar';
import { FilterDropdown } from '@/components/molecules/FilterDropdown';
import { SearchBar } from '@/components/molecules/SearchBar';

type CategoryType = 'new' | 'final' | 'migrated';

export default function Home() {
  const dispatch = useAppDispatch();
  const { tokens, loading } = useAppSelector((state) => state.tokens);
  
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilters, setPriceFilters] = useState({
    rising: true,
    falling: true,
  });
  
  // Store previous prices - simple state approach
  const [priceHistory] = useState<Map<string, number>>(new Map());

  // Initialize tokens
  useEffect(() => {
    const mockTokens = generateMockTokens();
    dispatch(setTokens(mockTokens));

    // Connect WebSocket for real-time updates
    mockWebSocket.connect(mockTokens);

    const unsubscribe = mockWebSocket.onPriceUpdate((tokenId, price, priceChange24h) => {
      dispatch(updateTokenPrice({ id: tokenId, price, priceChange24h }));
    });

    return () => {
      mockWebSocket.disconnect();
      unsubscribe();
    };
  }, [dispatch]);

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token);
    setModalOpen(true);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((value: string, checked: boolean) => {
    setPriceFilters(prev => ({ ...prev, [value]: checked }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setPriceFilters({ rising: true, falling: true });
  }, []);

  const filteredTokens = useMemo(() => {
    let filtered = tokens.filter(token => token.category === activeCategory);

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        token =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query)
      );
    }

    // Apply price change filters
    if (!priceFilters.rising || !priceFilters.falling) {
      filtered = filtered.filter(token => {
        if (priceFilters.rising && token.priceChange24h >= 0) return true;
        if (priceFilters.falling && token.priceChange24h < 0) return true;
        return false;
      });
    }

    return filtered;
  }, [tokens, activeCategory, searchQuery, priceFilters]);

  // Calculate stats for current category
  const stats = useMemo(() => {
    const categoryTokens = tokens.filter(t => t.category === activeCategory);
    return {
      total: categoryTokens.length,
      totalVolume: categoryTokens.reduce((sum, t) => sum + t.volume24h, 0),
      totalMarketCap: categoryTokens.reduce((sum, t) => sum + t.marketCap, 0),
      avgChange: categoryTokens.length > 0
        ? categoryTokens.reduce((sum, t) => sum + t.priceChange24h, 0) / categoryTokens.length
        : 0,
    };
  }, [tokens, activeCategory]);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Axiom Trade</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Real-time token discovery and analytics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <LayoutList className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Table</span>
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Grid</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as CategoryType)}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="new">New Pairs</TabsTrigger>
              <TabsTrigger value="final">Final Stretch</TabsTrigger>
              <TabsTrigger value="migrated">Migrated</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <SearchBar onSearch={handleSearch} value={searchQuery} />
              <FilterDropdown
                filters={[
                  { label: 'Rising', value: 'rising', checked: priceFilters.rising },
                  { label: 'Falling', value: 'falling', checked: priceFilters.falling },
                ]}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Stats Bar */}
          <StatsBar
            totalTokens={stats.total}
            totalVolume={stats.totalVolume}
            totalMarketCap={stats.totalMarketCap}
            avgChange={stats.avgChange}
          />

          <TabsContent value="new">
            <div className="block lg:hidden">
              <TokenGrid
                tokens={filteredTokens}
                loading={loading}
                previousPrices={priceHistory}
                onTokenClick={handleTokenClick}
                onClearFilters={handleClearFilters}
              />
            </div>
            <div className="hidden lg:block">
              {viewMode === 'table' ? (
                <TokenTable
                  tokens={filteredTokens}
                  loading={loading}
                  previousPrices={priceHistory}
                  onTokenClick={handleTokenClick}
                  onClearFilters={handleClearFilters}
                />
              ) : (
                <TokenGrid
                  tokens={filteredTokens}
                  loading={loading}
                  previousPrices={priceHistory}
                  onTokenClick={handleTokenClick}
                  onClearFilters={handleClearFilters}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="final">
            <div className="block lg:hidden">
              <TokenGrid
                tokens={filteredTokens}
                loading={loading}
                previousPrices={priceHistory}
                onTokenClick={handleTokenClick}
              />
            </div>
            <div className="hidden lg:block">
              {viewMode === 'table' ? (
                <TokenTable
                  tokens={filteredTokens}
                  loading={loading}
                  previousPrices={priceHistory}
                  onTokenClick={handleTokenClick}
                />
              ) : (
                <TokenGrid
                  tokens={filteredTokens}
                  loading={loading}
                  previousPrices={priceHistory}
                  onTokenClick={handleTokenClick}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="migrated">
            <div className="block lg:hidden">
              <TokenGrid
                tokens={filteredTokens}
                loading={loading}
                previousPrices={priceHistory}
                onTokenClick={handleTokenClick}
              />
            </div>
            <div className="hidden lg:block">
              {viewMode === 'table' ? (
                <TokenTable
                  tokens={filteredTokens}
                  loading={loading}
                  previousPrices={priceHistory}
                  onTokenClick={handleTokenClick}
                />
              ) : (
                <TokenGrid
                  tokens={filteredTokens}
                  loading={loading}
                  previousPrices={priceHistory}
                  onTokenClick={handleTokenClick}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Token Details Modal */}
      <TokenDetailsModal
        token={selectedToken}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </main>
  );
}