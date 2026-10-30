import type { Property } from './data'

const BASE = '/api'
const TIMEOUT_MS = 6000

export interface SiteSettings {
  whatsapp: string
  phone: string
  email: string
}

export interface SiteContent {
  cities: typeof import('./data').cities
  testimonials: typeof import('./data').testimonials
  services: typeof import('./data').services
  team: typeof import('./data').team
  milestones: typeof import('./data').milestones
  offices: typeof import('./data').offices
  settings: SiteSettings
}

type Source = 'db' | 'static'

async function getJSON<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T | null> {
  const qs = new URLSearchParams()
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v !== undefined && v !== '') qs.set(k, String(v))
  }
  const url = `${BASE}/${path}${qs.toString() ? `?${qs}` : ''}`

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: 'application/json' },
      cache: 'no-cache',
    })
    if (!res.ok) return null
    const body = await res.json()
    if (!body || body.ok !== true) return null
    return body as T
  } catch {
    // Offline, 404 (API not deployed yet), timeout, or malformed JSON.
    // The caller keeps the bundled static data, so the site still works.
    return null
  } finally {
    clearTimeout(timer)
  }
}

export async function fetchProperties(): Promise<Property[] | null> {
  const body = await getJSON<{ properties: Property[] }>('properties.php')
  if (!body || !Array.isArray(body.properties)) return null
  return body.properties
}

export async function fetchContent(): Promise<Partial<SiteContent> | null> {
  return await getJSON<Partial<SiteContent>>('content.php')
}

export type { Source }
