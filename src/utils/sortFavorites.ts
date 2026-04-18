import type { MovieSummary } from '../types/movie'

export type FavoriteSortOption = 'title-asc' | 'title-desc' | 'rating-desc' | 'rating-asc'

export function sortFavorites(movies: MovieSummary[], option: FavoriteSortOption): MovieSummary[] {
  const copy = [...movies]
  switch (option) {
    case 'title-asc':
      copy.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }))
      break
    case 'title-desc':
      copy.sort((a, b) => b.title.localeCompare(a.title, 'pt-BR', { sensitivity: 'base' }))
      break
    case 'rating-desc':
      copy.sort((a, b) => b.vote_average - a.vote_average)
      break
    case 'rating-asc':
      copy.sort((a, b) => a.vote_average - b.vote_average)
      break
    default:
      break
  }
  return copy
}
