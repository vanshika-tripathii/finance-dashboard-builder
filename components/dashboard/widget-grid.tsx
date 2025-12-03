"use client"

import type React from "react"
import { useDashboard } from "@/lib/context/dashboard-context"
import WidgetCard from "./widget-card"
import { useEffect, useState, useRef } from "react"

export default function WidgetGrid() {
  const { state, fetchWidgetData, reorderWidgets } = useDashboard()
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null)
  const fetchedWidgetsRef = useRef<Set<string>>(new Set())
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    // Only fetch widgets that haven't been fetched yet
    state.widgets.forEach((widget) => {
      if (!fetchedWidgetsRef.current.has(widget.id)) {
        fetchedWidgetsRef.current.add(widget.id)
        fetchWidgetData(widget.id)
      }
    })

    // Clear old intervals
    intervalsRef.current.forEach((interval) => clearInterval(interval))
    intervalsRef.current = []

    // Set up refresh intervals for all widgets
    state.widgets.forEach((widget) => {
      const interval = setInterval(() => fetchWidgetData(widget.id), widget.refreshInterval * 1000)
      intervalsRef.current.push(interval)
    })

    return () => {
      intervalsRef.current.forEach((interval) => clearInterval(interval))
    }
  }, [state.widgets.length, state.widgets.map((w) => w.id).join(",")]) // Only re-run when widget count/IDs change

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDraggedOverIndex(index)
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()

    if (draggedId) {
      const fromIndex = state.widgets.findIndex((w) => w.id === draggedId)
      if (fromIndex !== targetIndex) {
        reorderWidgets(fromIndex, targetIndex)
      }
    }

    setDraggedId(null)
    setDraggedOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDraggedOverIndex(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
      {state.widgets.map((widget, index) => (
        <div
          key={widget.id}
          draggable
          onDragStart={() => handleDragStart(widget.id)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`transition-all duration-200 ${
            draggedId === widget.id
              ? "opacity-40 scale-95"
              : draggedOverIndex === index
                ? "ring-2 ring-red-500/80 scale-105"
                : ""
          }`}
        >
          <WidgetCard widget={widget} />
        </div>
      ))}
    </div>
  )
}
