"use client"

import type { Widget } from "@/lib/context/dashboard-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartWidgetProps {
  widget: Widget
}

export function ChartWidget({ widget }: ChartWidgetProps) {
  if (widget.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-blue-500"></div>
      </div>
    )
  }

  if (widget.error || !widget.apiResponse) {
    return (
      <div className="text-slate-400 text-sm p-4 h-64 flex items-center justify-center">Unable to load chart data</div>
    )
  }

  const data = Array.isArray(widget.apiResponse)
    ? widget.apiResponse
    : widget.apiResponse["Time Series (Daily)"]
      ? Object.entries(widget.apiResponse["Time Series (Daily)"])
          .slice(0, 30)
          .reverse()
          .map(([date, values]: any) => ({
            date: new Date(date).toLocaleDateString(),
            price: Number.parseFloat(values["4. close"]),
          }))
      : []

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-slate-400 text-sm p-4 h-64 flex items-center justify-center">No chart data available</div>
    )
  }

  return (
    <div className="w-full h-64 -mx-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} domain="dataMin - 5" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
