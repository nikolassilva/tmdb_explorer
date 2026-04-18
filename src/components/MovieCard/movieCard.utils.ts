import type { ReactNode } from 'react'
import { highlightTitle } from '../../utils/highlight'

/** Full poster URL for card thumbnails (TMDB `w300` profile). */
export function posterUrl(path: string | null): string | undefined {
  if (!path) return undefined
  return `https://image.tmdb.org/t/p/w300${path}`
}

/** Plain title or highlighted segments when `highlightQuery` is non-empty. */
export function movieCardTitleContent(title: string, highlightQuery?: string): ReactNode {
  const q = highlightQuery?.trim()
  if (!q) return title
  return highlightTitle(title, q)
}
