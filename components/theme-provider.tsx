"use client"

import type React from "react"

import { useDashboard } from "@/lib/context/dashboard-context"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { state } = useDashboard()

  // Theme switching is handled within the Dashboard component using useDashboard

  return <>{children}</>
}
