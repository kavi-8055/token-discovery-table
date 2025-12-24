import { Token } from '../redux/slices/tokensSlice';
import { simulatePriceUpdate } from './mockData';

type PriceUpdateCallback = (tokenId: string, price: number, priceChange24h: number) => void;

export class MockWebSocket {
  private intervalId: NodeJS.Timeout | null = null;
  private callbacks: Set<PriceUpdateCallback> = new Set();
  private tokens: Token[] = [];

  connect(tokens: Token[]) {
    this.tokens = tokens;
    
    // Simulate real-time updates every 2-5 seconds
    this.intervalId = setInterval(() => {
      if (this.tokens.length === 0) return;
      
      // Update 1-3 random tokens
      const numUpdates = Math.floor(Math.random() * 3) + 1;
      const tokensToUpdate = this.getRandomTokens(numUpdates);
      
      tokensToUpdate.forEach(token => {
        const update = simulatePriceUpdate(token);
        this.callbacks.forEach(callback => {
          callback(token.id, update.price, update.priceChange24h);
        });
      });
    }, 2000 + Math.random() * 3000);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.callbacks.clear();
  }

  onPriceUpdate(callback: PriceUpdateCallback) {
    this.callbacks.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  private getRandomTokens(count: number): Token[] {
    const shuffled = [...this.tokens].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, this.tokens.length));
  }
}

// Singleton instance
export const mockWebSocket = new MockWebSocket();