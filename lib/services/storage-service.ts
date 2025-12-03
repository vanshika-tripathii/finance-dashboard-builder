// Dashboard configuration backup and export/import functionality

export interface DashboardBackup {
  version: string
  timestamp: string
  widgets: any[]
  theme: string
}

export function exportDashboard(state: any): string {
  const backup: DashboardBackup = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    widgets: state.widgets,
    theme: state.theme,
  }
  return JSON.stringify(backup, null, 2)
}

export function importDashboard(jsonString: string): DashboardBackup | null {
  try {
    const backup = JSON.parse(jsonString)
    if (!backup.version || !backup.widgets) {
      throw new Error("Invalid backup format")
    }
    return backup
  } catch (error) {
    console.error("Import failed:", error)
    return null
  }
}

export function downloadDashboardBackup(state: any) {
  const data = exportDashboard(state)
  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `finboard-backup-${new Date().toISOString().split("T")[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function createRestoreFile(callback: (backup: DashboardBackup) => void) {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = ".json"
  input.onchange = async (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const backup = importDashboard(text)
    if (backup) {
      callback(backup)
    } else {
      alert("Failed to import backup. Please check the file format.")
    }
  }
  input.click()
}
