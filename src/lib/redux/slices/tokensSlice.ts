import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  createdAt: string;
  category: 'new' | 'final' | 'migrated';
  imageUrl?: string;
}

interface TokensState {
  tokens: Token[];
  loading: boolean;
  error: string | null;
  sortBy: keyof Token;
  sortOrder: 'asc' | 'desc';
}

const initialState: TokensState = {
  tokens: [],
  loading: false,
  error: null,
  sortBy: 'marketCap',
  sortOrder: 'desc',
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.loading = false;
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number; priceChange24h: number }>) => {
      const token = state.tokens.find(t => t.id === action.payload.id);
      if (token) {
        token.price = action.payload.price;
        token.priceChange24h = action.payload.priceChange24h;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSorting: (state, action: PayloadAction<{ sortBy: keyof Token; sortOrder: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const { setTokens, updateTokenPrice, setLoading, setError, setSorting } = tokensSlice.actions;
export default tokensSlice.reducer;