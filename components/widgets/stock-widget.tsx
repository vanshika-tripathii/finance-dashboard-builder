"use client"

import type { Widget } from "@/lib/context/dashboard-context"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StockWidgetProps {
  widget: Widget
}

export function StockWidget({ widget }: StockWidgetProps) {
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

  // Extract common stock data patterns
  let price = 0
  let change = 0
  let changePercent = 0
  let symbol = "N/A"

  // Try different common API response formats
  if (data["Global Quote"]) {
    const q = data["Global Quote"]
    price = Number.parseFloat(q["05. price"]) || 0
    change = Number.parseFloat(q["09. change"]) || 0
    changePercent = Number.parseFloat(q["10. change percent"]) || 0
    symbol = q["01. symbol"] || "N/A"
  } else if (data.c) {
    price = data.c
    change = data.d || 0
    changePercent = data.dp || 0
    symbol = data.t || "N/A"
  } else if (typeof data === "object") {
    // Generic fallback
    price = Number.parseFloat(data.price || data.last || 0)
    change = Number.parseFloat(data.change || 0)
  }

  const isPositive = change >= 0
  const arrowColor = isPositive ? "text-green-400" : "text-red-400"
  const bgColor = isPositive ? "bg-green-500/10" : "bg-red-500/10"

  return (
    <div className={`p-4 rounded-lg ${bgColor}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm">Symbol</span>
        <span className="text-white font-bold text-lg">{symbol}</span>
      </div>

      <div className="mb-4">
        <div className="text-white text-3xl font-bold">${price.toFixed(2)}</div>
        <div className={`flex items-center gap-1 mt-1 ${arrowColor}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-semibold">
            {isPositive ? "+" : ""}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  )
}
