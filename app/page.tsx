"use client"

import { useEffect, useState } from "react"
import Dashboard from "@/components/dashboard/dashboard"
import { DashboardProvider } from "@/lib/context/dashboard-context"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  )
}
