import { useEffect, useState, type ReactNode } from 'react'
import { fetchContent, fetchProperties } from './api'
import { ContentCtx, STATIC_CONTENT, type ContentState } from './content-store'

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(STATIC_CONTENT)

  useEffect(() => {
    let cancelled = false

    const apply = (patch: Partial<ContentState>) => {
      if (cancelled) return
      setState((prev) => ({ ...prev, ...patch, source: 'db' }))
    }

    fetchProperties().then((list) => {
      // Ignore an empty response: a blank database should not blank the site.
      if (list && list.length > 0) apply({ properties: list })
    })

    fetchContent().then((content) => {
      if (!content) return
      const patch: Partial<ContentState> = {}
      for (const key of ['cities', 'testimonials', 'services', 'team', 'milestones', 'offices'] as const) {
        const value = content[key]
        if (Array.isArray(value) && value.length > 0) {
          Object.assign(patch, { [key]: value })
        }
      }
      if (content.settings && Object.keys(content.settings).length > 0) {
        patch.settings = { ...STATIC_CONTENT.settings, ...content.settings }
      }
      if (Object.keys(patch).length > 0) apply(patch)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return <ContentCtx.Provider value={state}>{children}</ContentCtx.Provider>
}
