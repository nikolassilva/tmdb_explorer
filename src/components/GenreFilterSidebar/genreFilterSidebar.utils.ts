import type { MovieGenre } from '../../types/movie'

/** Label for the mobile trigger (current selection summary). */
export function getSelectedGenreLabel(genres: MovieGenre[], selectedGenreId: number | null): string {
  if (selectedGenreId === null) return 'Todos'
  return genres.find((g) => g.id === selectedGenreId)?.name ?? 'Gênero'
}
