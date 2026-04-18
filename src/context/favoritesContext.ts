import { createContext } from 'react'
import type { MovieSummary } from '../types/movie'

/** API consumed by `useFavorites` inside `FavoritesProvider`. */
export type FavoritesContextValue = {
  favorites: MovieSummary[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (movie: MovieSummary) => void
  removeFavorite: (id: number) => void
}

/** Default is null until `FavoritesProvider` mounts. */
export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
