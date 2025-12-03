"use client"

import { type Widget, useDashboard } from "@/lib/context/dashboard-context"
import { Trash2, RefreshCw, GripVertical } from "lucide-react"
import { StockWidget } from "@/components/widgets/stock-widget"
import { CryptoWidget } from "@/components/widgets/crypto-widget"
import { ChartWidget } from "@/components/widgets/chart-widget"
import { TableWidget } from "@/components/widgets/table-widget"

interface WidgetCardProps {
  widget: Widget
}

export default function WidgetCard({ widget }: WidgetCardProps) {
  const { removeWidget, fetchWidgetData } = useDashboard()

  const renderWidgetContent = () => {
    switch (widget.widgetType) {
      case "stock":
        return <StockWidget widget={widget} />
      case "crypto":
        return <CryptoWidget widget={widget} />
      case "chart":
        return <ChartWidget widget={widget} />
      case "table":
        return <TableWidget widget={widget} />
      default:
        return <GenericWidget widget={widget} />
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all h-full flex flex-col group cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
            <h3 className="text-white font-semibold truncate">{widget.name}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {widget.lastUpdated ? `Updated ${new Date(widget.lastUpdated).toLocaleTimeString()}` : "Never updated"}
          </p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => fetchWidgetData(widget.id)}
            disabled={widget.loading}
            className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-red-400 disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${widget.loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => removeWidget(widget.id)}
            className="p-1.5 hover:bg-red-500/20 rounded transition-colors text-slate-400 hover:text-red-400"
            title="Remove widget"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 mb-4 min-h-[120px] bg-slate-900/80 rounded p-3 overflow-y-auto">
        {renderWidgetContent()}
      </div>

      <div className="text-xs text-slate-600 break-all font-mono">{widget.apiUrl}</div>
    </div>
  )
}

function GenericWidget({ widget }: { widget: Widget }) {
  const formatValue = (value: any): string => {
    if (typeof value === "string") return value
    if (typeof value === "number") return `$${value.toFixed(2)}`
    if (typeof value === "boolean") return value ? "Yes" : "No"
    return JSON.stringify(value)
  }

  const renderData = () => {
    if (widget.loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-red-500"></div>
        </div>
      )
    }

    if (widget.error) {
      return (
        <div className="text-red-400/80 text-sm p-3 bg-red-500/10 rounded space-y-2">
          <p className="font-semibold">Error: {widget.error}</p>
          <p className="text-xs text-slate-300">Try:</p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li>Checking the API URL is correct</li>
            <li>Verifying the API endpoint is accessible</li>
            <li>Using a free API like CoinGecko or Coinbase</li>
            <li>Clicking refresh to retry the request</li>
          </ul>
        </div>
      )
    }

    if (!widget.data && !widget.apiResponse) {
      return <div className="text-slate-400 text-sm">No data available</div>
    }

    const data = widget.apiResponse || widget.data
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      const entries = Object.entries(data).slice(0, 6)
      return (
        <div className="space-y-3">
          {entries.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-sm border-b border-slate-700/50 pb-2">
              <span className="text-slate-400 capitalize text-xs truncate">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              <span className="text-white font-semibold ml-2 text-right">{formatValue(value)}</span>
            </div>
          ))}
        </div>
      )
    }

    return <div className="text-white text-lg font-bold">{formatValue(data)}</div>
  }

  return renderData()
}
