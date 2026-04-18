export interface MovieSummary {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}

export interface MovieDetails extends MovieSummary {
  backdrop_path: string | null
  release_date: string
  overview: string
  genres: { id: number; name: string }[]
}

export interface PaginatedMovies {
  page: number
  results: MovieSummary[]
  total_pages: number
}
