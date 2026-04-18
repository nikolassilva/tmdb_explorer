/** Search results route (fixed path; query string holds the term). */
export const SEARCH_PATH = '/search' as const

/**
 * Reads the search term from the URL when the current page is search.
 */
export function readSearchTermFromUrl(pathname: string, searchParams: URLSearchParams): string {
  if (pathname !== SEARCH_PATH) return ''
  return searchParams.get('q') ?? ''
}

/**
 * Navigation target after submitting the search form.
 * Trims the term so whitespace-only input is treated as empty (home).
 */
export function buildPathForSearchSubmit(term: string): string {
  const trimmed = term.trim()
  if (!trimmed) return '/'
  return `${SEARCH_PATH}?q=${encodeURIComponent(trimmed)}`
}
