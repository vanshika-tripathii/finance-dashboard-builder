"use client"

import { useDashboard } from "@/lib/context/dashboard-context"
import { Button } from "@/components/ui/button"
import { Plus, Moon, Sun, Download, Upload } from "lucide-react"
import { downloadDashboardBackup, createRestoreFile } from "@/lib/services/storage-service"
import { useState } from "react"

interface HeaderProps {
  widgetCount: number
  onAddClick: () => void
}

export default function Header({ widgetCount, onAddClick }: HeaderProps) {
  const { toggleTheme, state, updateWidget, addWidget } = useDashboard()
  const [showMenu, setShowMenu] = useState(false)

  const handleExport = () => {
    downloadDashboardBackup(state)
    setShowMenu(false)
  }

  const handleImport = () => {
    createRestoreFile((backup) => {
      // Clear existing widgets
      state.widgets.forEach((w) => {
        // We'll handle this in the import logic
      })

      // Add imported widgets
      backup.widgets.forEach((widget) => {
        const { id, ...widgetData } = widget
        addWidget(widgetData)
      })
      setShowMenu(false)
    })
  }

  const handleClearDashboard = () => {
    if (confirm("Are you sure you want to clear all widgets? This action cannot be undone.")) {
      localStorage.removeItem("finboard-dashboard")
      window.location.reload()
    }
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8L5.257 19.879A2 2 0 005 16.972V5a2 2 0 012-2h12a2 2 0 012 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Finance Dashboard</h1>
            <p className="text-sm text-slate-400">
              {widgetCount} active widget{widgetCount !== 1 ? "s" : ""} • Real-time data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="border-slate-700 hover:bg-slate-800"
            >
              ⋮
            </Button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={handleExport}
                  className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export Dashboard
                </button>
                <button
                  onClick={handleImport}
                  className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Import Dashboard
                </button>
                <div className="border-t border-slate-700 my-2"></div>
                <button
                  onClick={handleClearDashboard}
                  className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear Dashboard
                </button>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="border-slate-700 hover:bg-slate-800 bg-transparent"
          >
            {state.theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button onClick={onAddClick} className="bg-red-600 hover:bg-red-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Widget
          </Button>
        </div>
      </div>
    </header>
  )
}
