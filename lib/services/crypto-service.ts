// Cryptocurrency data fetching
export interface CryptoData {
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  timestamp: string
}

// Popular crypto API endpoints
export const CRYPTO_API_EXAMPLES = {
  coingecko: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true",
  coinmarketcap:
    "https://api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&CMC_PRO_API_KEY=YOUR_API_KEY",
  kraken: "https://api.kraken.com/0/public/Ticker?pair=XBTUSD",
}

// Mock crypto data generator for demo
export function generateMockCryptoData(symbol = "BTC"): CryptoData {
  const basePrice = symbol === "BTC" ? Math.random() * 50000 + 20000 : Math.random() * 3000
  const change = (Math.random() - 0.5) * 1000

  return {
    symbol,
    price: basePrice,
    change24h: change,
    marketCap: Math.random() * 1000000000000,
    volume24h: Math.random() * 100000000000,
    timestamp: new Date().toISOString(),
  }
}
