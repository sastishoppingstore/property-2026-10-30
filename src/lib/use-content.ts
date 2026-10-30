import { useContext } from 'react'
import { ContentCtx, type ContentState } from './content-store'

export const useContent = () => useContext(ContentCtx)

/** Convenience accessor for the call sites that only need listings. */
export const useProperties = () => useContext(ContentCtx).properties

export type { ContentState }
