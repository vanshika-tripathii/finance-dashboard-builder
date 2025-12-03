"use client"

import { useEffect, useState } from "react"
import { useDashboard } from "@/lib/context/dashboard-context"
import Header from "./header"
import WidgetGrid from "./widget-grid"
import AddWidgetModal from "./add-widget-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const { state } = useDashboard()

  useEffect(() => {
    const hasVisited = localStorage.getItem("finboard-visited")
    if (hasVisited) {
      setShowWelcome(false)
    } else {
      localStorage.setItem("finboard-visited", "true")
    }

    // Apply theme to document root
    const root = document.documentElement
    if (state.theme === "light") {
      root.classList.remove("dark")
    } else {
      root.classList.add("dark")
    }
  }, [state.theme])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header widgetCount={state.widgets.length} onAddClick={() => setIsAddModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Build Your Finance Dashboard</h2>
            <p className="text-slate-400 mb-4 max-w-md">
              Create custom widgets by connecting to any financial API. Track stocks, crypto, and more in real-time.
            </p>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6 max-w-md text-left">
              <h3 className="text-white font-semibold mb-3">Getting Started:</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">1.</span>
                  <span>Click "Add Widget" to create a new widget</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">2.</span>
                  <span>Enter a widget name and API endpoint</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">3.</span>
                  <span>Test the API and configure refresh rate</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 flex-shrink-0">4.</span>
                  <span>Drag widgets to rearrange your layout</span>
                </li>
              </ul>
            </div>

            <Button onClick={() => setIsAddModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Widget
            </Button>
          </div>
        ) : (
          <WidgetGrid />
        )}
      </main>

      <AddWidgetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
