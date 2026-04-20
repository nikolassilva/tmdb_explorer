import type { MovieGenre } from '../../types/movie'

export type GenreFilterSidebarProps = {
  genres: MovieGenre[]
  selectedGenreId: number | null
  onSelectGenre: (genreId: number | null) => void
  loading: boolean
  error: string | null
}
