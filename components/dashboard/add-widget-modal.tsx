"use client"

import type React from "react"

import { useState } from "react"
import { useDashboard } from "@/lib/context/dashboard-context"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface AddWidgetModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddWidgetModal({ isOpen, onClose }: AddWidgetModalProps) {
  const { addWidget, fetchWidgetData, state } = useDashboard()
  const [formData, setFormData] = useState({
    name: "",
    apiUrl: "",
    refreshInterval: 30,
    widgetType: "generic" as const,
  })
  const [testing, setTesting] = useState(false)
  const [testError, setTestError] = useState<string | null>(null)
  const [testSuccess, setTestSuccess] = useState(false)

  const handleTestApi = async () => {
    setTesting(true)
    setTestError(null)
    setTestSuccess(false)
    try {
      const response = await fetch(formData.apiUrl)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      await response.json()
      setTestSuccess(true)
    } catch (error) {
      setTestError(error instanceof Error ? error.message : "Test failed")
    }
    setTesting(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.apiUrl) {
      setTestError("Please fill in all fields")
      return
    }

    const newWidget = {
      name: formData.name,
      apiUrl: formData.apiUrl,
      refreshInterval: formData.refreshInterval,
      widgetType: formData.widgetType,
    }

    addWidget(newWidget)

    setFormData({ name: "", apiUrl: "", refreshInterval: 30, widgetType: "generic" })
    setTestError(null)
    setTestSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Add New Widget</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Widget Name</label>
            <input
              type="text"
              placeholder="e.g., Bitcoin Price Tracker"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Widget Type</label>
            <select
              value={formData.widgetType}
              onChange={(e) => setFormData({ ...formData, widgetType: e.target.value as any })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              <option value="generic">Generic Data</option>
              <option value="stock">Stock Quote</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="chart">Line Chart</option>
              <option value="table">Table Data</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">API URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., https://api.example.com/data"
                value={formData.apiUrl}
                onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <Button
                type="button"
                onClick={handleTestApi}
                disabled={!formData.apiUrl || testing}
                variant="outline"
                className="border-slate-700 hover:bg-slate-800 bg-transparent"
              >
                {testing ? "Testing..." : "Test"}
              </Button>
            </div>
            {testError && <p className="text-xs text-red-400 mt-1">{testError}</p>}
            {testSuccess && <p className="text-xs text-green-400 mt-1">✓ API test successful!</p>}
            <div className="mt-3 p-2 bg-slate-800/50 rounded text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Example API URLs:</p>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    apiUrl:
                      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",
                  })
                }
                className="block hover:text-red-400 truncate w-full text-left"
              >
                • Bitcoin (CoinGecko)
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    apiUrl:
                      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
                  })
                }
                className="block hover:text-red-400 truncate w-full text-left"
              >
                • Ethereum (CoinGecko)
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, apiUrl: "https://api.coinbase.com/v2/exchange-rates?currency=USD" })
                }
                className="block hover:text-red-400 truncate w-full text-left"
              >
                • Exchange Rates (Coinbase)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Refresh Interval (seconds)</label>
            <input
              type="number"
              min="5"
              max="3600"
              value={formData.refreshInterval}
              onChange={(e) => setFormData({ ...formData, refreshInterval: Number.parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 hover:bg-slate-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              Add Widget
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
