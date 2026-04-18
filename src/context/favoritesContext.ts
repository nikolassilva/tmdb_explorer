import { createContext } from 'react'
import type { MovieSummary } from '../types/movie'

export type FavoritesContextValue = {
  favorites: MovieSummary[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (movie: MovieSummary) => void
  removeFavorite: (id: number) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
