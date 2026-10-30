import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface FavCtx {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
}

const Ctx = createContext<FavCtx>({ ids: [], toggle: () => {}, has: () => false })
const KEY = 'ppp-saved'

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* storage unavailable */
    }
  }, [ids])

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const value = useMemo<FavCtx>(
    () => ({ ids, toggle, has: (id: string) => ids.includes(id) }),
    [ids, toggle],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useFavorites = () => useContext(Ctx)
