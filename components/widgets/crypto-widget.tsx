"use client"

import type { Widget } from "@/lib/context/dashboard-context"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CryptoWidgetProps {
  widget: Widget
}

export function CryptoWidget({ widget }: CryptoWidgetProps) {
  if (widget.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-red-500"></div>
      </div>
    )
  }

  if (widget.error) {
    return <div className="text-red-400/80 text-sm p-4 bg-red-500/10 rounded">{widget.error}</div>
  }

  const data = widget.apiResponse || {}

  let price = 0
  let change24h = 0
  let symbol = "N/A"

  // Handle CoinGecko format
  if (data.bitcoin) {
    price = data.bitcoin.usd || 0
    symbol = "BTC"
  } else if (data.ethereum) {
    price = data.ethereum.usd || 0
    symbol = "ETH"
  } else if (data.price) {
    price = data.price
    change24h = data.change24h || 0
    symbol = data.symbol || "N/A"
  }

  const isPositive = change24h >= 0

  return (
    <div className={`p-4 rounded-lg ${isPositive ? "bg-green-500/10" : "bg-red-500/10"}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm">Cryptocurrency</span>
        <span className="text-white font-bold text-lg">{symbol}</span>
      </div>

      <div className="mb-4">
        <div className="text-white text-3xl font-bold">
          ${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </div>
        {change24h !== 0 && (
          <div className={`flex items-center gap-1 mt-1 ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-semibold">
              {isPositive ? "+" : ""}
              {change24h.toFixed(2)}% (24h)
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
