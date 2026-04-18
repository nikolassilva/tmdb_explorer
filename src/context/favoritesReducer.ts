import type { MovieSummary } from '../types/movie'

export const FAVORITES_STORAGE_KEY = 'tmdb-favorites'

export type FavoritesAction =
  | { type: 'HYDRATE'; movies: MovieSummary[] }
  | { type: 'TOGGLE'; movie: MovieSummary }
  | { type: 'REMOVE'; id: number }

export function favoritesReducer(state: MovieSummary[], action: FavoritesAction): MovieSummary[] {
  switch (action.type) {
    case 'HYDRATE':
      return action.movies
    case 'TOGGLE': {
      const exists = state.some((m) => m.id === action.movie.id)
      if (exists) {
        return state.filter((m) => m.id !== action.movie.id)
      }
      return [...state, normalizeMovie(action.movie)]
    }
    case 'REMOVE':
      return state.filter((m) => m.id !== action.id)
    default:
      return state
  }
}

export function normalizeMovie(movie: MovieSummary): MovieSummary {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
  }
}

export function loadFavoritesFromStorage(): MovieSummary[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isMovieSummary)
  } catch {
    return []
  }
}

function isMovieSummary(value: unknown): value is MovieSummary {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'number' &&
    typeof v.title === 'string' &&
    (v.poster_path === null || typeof v.poster_path === 'string') &&
    typeof v.vote_average === 'number'
  )
}
