import type { MovieSummary } from '../../types/movie'

export type MovieCardProps = {
  movie: MovieSummary
  isFavorite: boolean
  onToggleFavorite: () => void
  highlightQuery?: string
  showTrash?: boolean
  onRemove?: () => void
}
