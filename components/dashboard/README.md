# FinBoard Dashboard Components

## Overview

FinBoard is a customizable finance dashboard that allows users to create real-time financial data widgets.

## Key Features

### 1. Widget Management
- **Add Widgets**: Create new widgets by connecting to financial APIs
- **Remove Widgets**: Delete unwanted widgets with one click
- **Rearrange**: Drag-and-drop functionality to reorganize widget layout
- **Configure**: Each widget has customizable refresh intervals

### 2. Widget Types
- **Generic**: Display JSON data from any API
- **Stock**: Specialized stock quote display with price and change indicators
- **Crypto**: Cryptocurrency price and performance data
- **Chart**: Line charts for time-series data
- **Table**: Paginated table view for array data

### 3. Data Integration
- **Flexible API Support**: Works with any REST API endpoint
- **API Testing**: Built-in test functionality to validate endpoints
- **Real-time Updates**: Automatic refresh with configurable intervals
- **Error Handling**: Graceful error states and retry mechanisms

### 4. Persistence
- **Local Storage**: Dashboard state persists across sessions
- **Export/Import**: Backup and restore dashboard configurations
- **State Recovery**: Automatic restoration on page reload

### 5. Theme Support
- **Dark Mode**: Default dark theme optimized for finance data
- **Theme Toggle**: Easy switching between light and dark modes
- **Persistent Theme**: Theme preference saved to localStorage

## API Examples

### Stock APIs
- Alpha Vantage: https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_KEY
- Finnhub: https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY
- Polygon.io: https://api.polygon.io/v3/quotes/latest?ticker=AAPL&apiKey=YOUR_KEY

### Crypto APIs
- CoinGecko (free): https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
- Kraken: https://api.kraken.com/0/public/Ticker?pair=XBTUSD

## File Structure

\`\`\`
components/
├── dashboard/
│   ├── dashboard.tsx (Main dashboard container)
│   ├── header.tsx (Header with controls)
│   ├── widget-grid.tsx (Widget layout with drag-drop)
│   ├── widget-card.tsx (Individual widget display)
│   ├── add-widget-modal.tsx (Add widget form)
│   └── README.md (This file)
├── widgets/
│   ├── stock-widget.tsx (Stock display)
│   ├── crypto-widget.tsx (Crypto display)
│   ├── chart-widget.tsx (Chart rendering)
│   └── table-widget.tsx (Table with pagination)
└── theme-provider.tsx (Theme switching logic)

lib/
├── context/
│   └── dashboard-context.tsx (State management)
├── services/
│   ├── api-service.ts (API fetching & caching)
│   ├── stock-service.ts (Stock data helpers)
│   ├── crypto-service.ts (Crypto data helpers)
│   └── storage-service.ts (Export/import functionality)
└── hooks/
    └── use-local-storage.ts (Storage hook)
\`\`\`

## Getting Started

1. **Add a Widget**: Click "Add Widget" button
2. **Configure**: Enter widget name, API URL, and refresh interval
3. **Test**: Click "Test" to verify the API endpoint works
4. **Create**: Click "Add Widget" to create it
5. **Monitor**: Widget will automatically refresh at specified intervals
6. **Rearrange**: Drag widgets to reorder them on the dashboard

## Advanced Features

- Export your dashboard configuration to JSON
- Import previously exported configurations
- All widgets are responsive and mobile-friendly
- Real-time error handling and recovery

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Efficient re-renders with React Context
- Local data caching to reduce API calls
- Lazy loading of chart and table components
- Responsive grid layout with CSS Grid

## API Rate Limiting

Each financial API has rate limits. Configure refresh intervals appropriately:
- Free tier APIs: 30-60 second intervals
- Paid APIs: 5-10 second intervals
- Check your API provider's documentation for limits
