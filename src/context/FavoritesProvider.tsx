import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { MovieSummary } from '../types/movie'
import { FavoritesContext } from './favoritesContext'
import {
  FAVORITES_STORAGE_KEY,
  favoritesReducer,
  loadFavoritesFromStorage,
  normalizeMovie,
} from './favoritesReducer'

/** Holds favorites in memory, syncs to `localStorage`, and exposes actions via context. */
export function FavoritesProvider({ children }: { children: ReactNode }): JSX.Element {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => loadFavoritesFromStorage())

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback((id: number) => favorites.some((m) => m.id === id), [favorites])

  const toggleFavorite = useCallback((movie: MovieSummary) => {
    dispatch({ type: 'TOGGLE', movie: normalizeMovie(movie) })
  }, [])

  const removeFavorite = useCallback((id: number) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, toggleFavorite, removeFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
