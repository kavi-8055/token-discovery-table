import { Token } from '../redux/slices/tokensSlice';

const tokenNames = [
  'Pepe Coin', 'Shiba Classic', 'Moon Token', 'Rocket Finance',
  'Diamond Hands', 'Bull Token', 'Safe Moon', 'Doge Killer',
  'Elon Mars', 'King Shiba', 'Meta Token', 'Floki Inu',
  'Baby Doge', 'Akita Inu', 'Kishu Inu', 'Hoge Finance'
];

const tokenSymbols = [
  'PEPE', 'SHIB', 'MOON', 'RKT', 'DMND', 'BULL', 'SAFE', 'DGKL',
  'MARS', 'KING', 'META', 'FLOKI', 'BABY', 'AKITA', 'KISHU', 'HOGE'
];

function generateMockToken(index: number, category: 'new' | 'final' | 'migrated'): Token {
  const basePrice = Math.random() * 10;
  const priceChange = (Math.random() - 0.5) * 50;
  
  return {
    id: `token-${category}-${index}`,
    name: tokenNames[index % tokenNames.length],
    symbol: tokenSymbols[index % tokenSymbols.length],
    price: basePrice,
    priceChange24h: priceChange,
    volume24h: Math.random() * 1000000,
    marketCap: Math.random() * 10000000,
    liquidity: Math.random() * 500000,
    holders: Math.floor(Math.random() * 10000),
    createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    category,
    imageUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${category}${index}`,
  };
}

export function generateMockTokens(): Token[] {
  const tokens: Token[] = [];
  
  // Generate tokens for each category
  for (let i = 0; i < 5; i++) {
    tokens.push(generateMockToken(i, 'new'));
  }
  for (let i = 0; i < 5; i++) {
    tokens.push(generateMockToken(i + 5, 'final'));
  }
  for (let i = 0; i < 5; i++) {
    tokens.push(generateMockToken(i + 10, 'migrated'));
  }
  
  return tokens;
}

export function simulatePriceUpdate(token: Token): { price: number; priceChange24h: number } {
  const priceChangePercent = (Math.random() - 0.5) * 2; // -1% to +1%
  const newPrice = token.price * (1 + priceChangePercent / 100);
  const newPriceChange = token.priceChange24h + priceChangePercent;
  
  return {
    price: newPrice,
    priceChange24h: newPriceChange,
  };
}