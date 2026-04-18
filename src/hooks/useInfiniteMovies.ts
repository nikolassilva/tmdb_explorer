import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchPopularMovies, searchMovies } from '../api/tmdbApi'
import type { MovieSummary } from '../types/movie'

type Mode = 'popular' | 'search'

/**
 * Paginated TMDB lists with append-on-scroll semantics.
 * Resets when `enabled`, `mode`, or `query` change; uses a ref to avoid overlapping fetches.
 */
export function useInfiniteMovies(mode: Mode, query: string, enabled: boolean) {
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<MovieSummary[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    if (!enabled) {
      setResults([])
      setPage(1)
      setTotalPages(1)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false // ignore stale responses if deps change mid-flight (e.g. StrictMode)
    setResults([])
    setPage(1)
    setTotalPages(1)
    setError(null)

    async function loadFirstPage() {
      if (mode === 'search' && !query.trim()) {
        setLoading(false)
        return
      }

      loadingRef.current = true
      setLoading(true)
      try {
        const data =
          mode === 'popular'
            ? await fetchPopularMovies(1)
            : await searchMovies(query.trim(), 1)
        if (cancelled) return
        setResults(data.results)
        setTotalPages(Math.max(data.total_pages, 1))
        setPage(1)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erro ao carregar filmes')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
          loadingRef.current = false
        }
      }
    }

    void loadFirstPage()

    return () => {
      cancelled = true
    }
  }, [enabled, mode, query])

  const loadMore = useCallback(async () => {
    if (!enabled || loadingRef.current) return
    if (page >= totalPages) return
    if (mode === 'search' && !query.trim()) return

    const nextPage = page + 1
    loadingRef.current = true
    setLoading(true)
    setError(null)
    try {
      const data =
        mode === 'popular'
          ? await fetchPopularMovies(nextPage)
          : await searchMovies(query.trim(), nextPage)
      setResults((prev) => [...prev, ...data.results])
      setPage(nextPage)
      setTotalPages(Math.max(data.total_pages, 1))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar filmes')
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [enabled, mode, page, query, totalPages])

  const hasMore = page < totalPages

  return { results, loading, error, hasMore, loadMore }
}
