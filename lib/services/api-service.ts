// Financial data fetching and caching service
interface CacheEntry {
  data: any
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_DURATION = 60000 // 60 seconds

export async function fetchWithCache(url: string, forceRefresh = false) {
  if (!forceRefresh) {
    const cached = cache.get(url)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    cache.set(url, { data, timestamp: Date.now() })
    return data
  } catch (error) {
    throw error instanceof Error ? error : new Error("Unknown error")
  }
}

export function clearCache() {
  cache.clear()
}

// Helper to extract nested values from API responses
export function extractValue(obj: any, path: string): any {
  return path.split(".").reduce((current, prop) => current?.[prop], obj)
}

// Format financial values
export function formatFinancialValue(value: any, type: "currency" | "percentage" | "number" = "number") {
  if (typeof value !== "number") return String(value)

  switch (type) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    case "percentage":
      return `${(value * 100).toFixed(2)}%`
    default:
      return value.toLocaleString("en-US", { maximumFractionDigits: 2 })
  }
}
