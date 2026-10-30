import { createContext, type ReactNode } from 'react'
import {
  properties as staticProperties,
  cities as staticCities,
  testimonials as staticTestimonials,
  services as staticServices,
  team as staticTeam,
  milestones as staticMilestones,
  offices as staticOffices,
  WHATSAPP,
  PHONE,
  EMAIL,
  type Property,
} from './data'
import type { SiteContent, Source } from './api'

/**
 * Content lives in MySQL via /api/*.php, but the app starts from the bundled
 * copy in data.ts and swaps in the database response when it arrives.
 *
 * That ordering is deliberate: the first paint is byte-identical to the
 * static-only build, so there is no loading flash, no layout shift and no
 * animation restart. If the API is missing, slow or erroring, nothing changes —
 * the site keeps serving the bundled data instead of breaking.
 */

export interface ContentState {
  properties: Property[]
  cities: typeof staticCities
  testimonials: typeof staticTestimonials
  services: typeof staticServices
  team: typeof staticTeam
  milestones: typeof staticMilestones
  offices: typeof staticOffices
  settings: SiteContent['settings']
  source: Source
}

export const STATIC_CONTENT: ContentState = {
  properties: staticProperties,
  cities: staticCities,
  testimonials: staticTestimonials,
  services: staticServices,
  team: staticTeam,
  milestones: staticMilestones,
  offices: staticOffices,
  settings: { whatsapp: WHATSAPP, phone: PHONE, email: EMAIL },
  source: 'static',
}

export const ContentCtx = createContext<ContentState>(STATIC_CONTENT)

export type { ReactNode }
