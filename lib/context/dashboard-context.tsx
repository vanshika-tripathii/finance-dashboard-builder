"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"

export interface Widget {
  id: string
  name: string
  apiUrl: string
  refreshInterval: number
  widgetType: "generic" | "stock" | "crypto" | "chart"
  data: any
  loading: boolean
  error: string | null
  lastUpdated: number
  apiResponse?: any
  fieldMappings?: Record<string, string>
}

export interface DashboardState {
  widgets: Widget[]
  theme: "light" | "dark"
}

interface DashboardContextType {
  state: DashboardState
  addWidget: (widget: Omit<Widget, "id" | "data" | "loading" | "error" | "lastUpdated">) => void
  removeWidget: (id: string) => void
  updateWidget: (id: string, updates: Partial<Widget>) => void
  reorderWidgets: (fromIndex: number, toIndex: number) => void
  toggleTheme: () => void
  fetchWidgetData: (id: string) => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

const STORAGE_KEY = "finboard-dashboard"
const DEFAULT_STATE: DashboardState = {
  widgets: [],
  theme: "dark",
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DashboardState>(DEFAULT_STATE)
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setState(parsed)
      } catch (e) {
        console.error("Failed to parse stored dashboard state:", e)
      }
    }
    setHydrated(true)
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state, hydrated])

  const addWidget = (widget: Omit<Widget, "id" | "data" | "loading" | "error" | "lastUpdated">) => {
    const id = Date.now().toString()
    setState((prev) => ({
      ...prev,
      widgets: [
        ...prev.widgets,
        {
          ...widget,
          id,
          data: null,
          loading: false,
          error: null,
          lastUpdated: 0,
        },
      ],
    }))
  }

  const removeWidget = (id: string) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.filter((w) => w.id !== id),
    }))
  }

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setState((prev) => ({
      ...prev,
      widgets: prev.widgets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    }))
  }

  const reorderWidgets = (fromIndex: number, toIndex: number) => {
    setState((prev) => {
      const newWidgets = [...prev.widgets]
      const [removed] = newWidgets.splice(fromIndex, 1)
      newWidgets.splice(toIndex, 0, removed)
      return { ...prev, widgets: newWidgets }
    })
  }

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }))
  }

  const fetchWidgetData = useCallback(
    async (id: string) => {
      const widget = state.widgets.find((w) => w.id === id)
      if (!widget) return

      updateWidget(id, { loading: true, error: null })

      try {
        const response = await fetch(widget.apiUrl, {
          headers: {
            Accept: "application/json",
          },
        })
        if (!response.ok) throw new Error(`API error: ${response.status}`)

        const data = await response.json()
        updateWidget(id, {
          data,
          apiResponse: data,
          loading: false,
          lastUpdated: Date.now(),
          error: null,
        })
      } catch (error) {
        updateWidget(id, {
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    },
    [state],
  )

  return (
    <DashboardContext.Provider
      value={{
        state,
        addWidget,
        removeWidget,
        updateWidget,
        reorderWidgets,
        toggleTheme,
        fetchWidgetData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return context
}
