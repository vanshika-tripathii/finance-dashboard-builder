"use client"

import type { Widget } from "@/lib/context/dashboard-context"
import { useState } from "react"

interface TableWidgetProps {
  widget: Widget
}

export function TableWidget({ widget }: TableWidgetProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  if (widget.loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border border-slate-700 border-t-red-500"></div>
      </div>
    )
  }

  if (widget.error) {
    return <div className="text-red-400/80 text-sm p-4 bg-red-500/10 rounded">{widget.error}</div>
  }

  const data = Array.isArray(widget.apiResponse)
    ? widget.apiResponse
    : widget.apiResponse?.results || widget.apiResponse?.data || []

  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-slate-400 text-sm p-4">No data available</div>
  }

  const columns = Object.keys(data[0] || {}).slice(0, 4)
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              {columns.map((col) => (
                <th key={col} className="text-left py-2 px-2 text-slate-400 font-medium text-xs uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                {columns.map((col) => (
                  <td key={col} className="py-2 px-2 text-white text-xs truncate max-w-[100px]">
                    {String(row[col]).slice(0, 50)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Page {currentPage + 1} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-white"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
