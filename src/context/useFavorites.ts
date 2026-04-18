import { useContext } from 'react'
import { FavoritesContext, type FavoritesContextValue } from './favoritesContext'

/** Must be used under `FavoritesProvider`. */
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}
