/** Minimal movie fields used in grids and stored favorites. */
export interface MovieSummary {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}

/** Full detail payload from GET /movie/{id}. */
export interface MovieDetails extends MovieSummary {
  backdrop_path: string | null
  release_date: string
  overview: string
  genres: { id: number; name: string }[]
}

/** Common TMDB paginated list shape for popular and search endpoints. */
export interface PaginatedMovies {
  page: number
  results: MovieSummary[]
  total_pages: number
}
