import axios from 'axios'
import { getTmdbApiKey } from '../configureTmdb'
import type { MovieDetails, MovieGenre, PaginatedMovies } from '../types/movie'

/** Shared Axios instance for TMDB v3 (API key injected per request). */
export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

tmdbApi.interceptors.request.use((config) => {
  const key = getTmdbApiKey()
  // TMDB v3 accepts `api_key` as a query param on every request.
  config.params = { ...config.params, api_key: key || undefined }
  return config
})

/** GET /genre/movie/list (localized genre names). */
export async function fetchMovieGenres(): Promise<MovieGenre[]> {
  const { data } = await tmdbApi.get<{ genres: MovieGenre[] }>('/genre/movie/list', {
    params: { language: 'pt-BR' },
  })
  return data.genres
}

/** GET /movie/popular */
export async function fetchPopularMovies(page: number): Promise<PaginatedMovies> {
  const { data } = await tmdbApi.get<PaginatedMovies>('/movie/popular', { params: { page } })
  return data
}

/**
 * GET /discover/movie — TMDB-recommended way to filter by genre.
 * Uses popularity sort so the list stays comparable to “popular” when a genre is selected.
 */
export async function fetchDiscoverMoviesByGenre(genreId: number, page: number): Promise<PaginatedMovies> {
  const { data } = await tmdbApi.get<PaginatedMovies>('/discover/movie', {
    params: {
      page,
      with_genres: genreId,
      sort_by: 'popularity.desc',
      language: 'pt-BR',
      include_adult: false,
    },
  })
  return data
}

/** GET /search/movie */
export async function searchMovies(query: string, page: number): Promise<PaginatedMovies> {
  const { data } = await tmdbApi.get<PaginatedMovies>('/search/movie', {
    params: { query, page },
  })
  return data
}

/** GET /movie/{id} */
export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`)
  return data
}
