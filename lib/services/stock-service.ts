// Stock-specific data fetching
export interface StockQuote {
  symbol: string
  price: number
  change: number
  changePercent: number
  timestamp: string
}

export interface StockData {
  quote?: StockQuote
  company?: any
  news?: any[]
  chart?: any
}

// Popular stock API endpoints (users can use their own keys)
export const STOCK_API_EXAMPLES = {
  alphavantage: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_API_KEY",
  finnhub: "https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY",
  yfinance: "https://query1.finance.yahoo.com/v10/finance/quoteSummary/AAPL?modules=price",
  polygon: "https://api.polygon.io/v3/quotes/latest?ticker=AAPL&apiKey=YOUR_API_KEY",
}

// Mock stock data generator for demo purposes
export function generateMockStockData(symbol = "AAPL"): StockData {
  const basePrice = Math.random() * 200 + 50
  const change = (Math.random() - 0.5) * 10

  return {
    quote: {
      symbol,
      price: basePrice,
      change,
      changePercent: change / basePrice,
      timestamp: new Date().toISOString(),
    },
    company: {
      name: symbol === "AAPL" ? "Apple Inc." : symbol,
      industry: "Technology",
      marketCap: "3.2T",
      pe: "28.5",
    },
  }
}
