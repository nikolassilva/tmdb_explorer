import axios from 'axios'
import { getTmdbApiKey } from '../configureTmdb'
import type { MovieDetails, PaginatedMovies } from '../types/movie'

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

tmdbApi.interceptors.request.use((config) => {
  const key = getTmdbApiKey()
  config.params = { ...config.params, api_key: key || undefined }
  return config
})

export async function fetchPopularMovies(page: number): Promise<PaginatedMovies> {
  const { data } = await tmdbApi.get<PaginatedMovies>('/movie/popular', { params: { page } })
  return data
}

export async function searchMovies(query: string, page: number): Promise<PaginatedMovies> {
  const { data } = await tmdbApi.get<PaginatedMovies>('/search/movie', {
    params: { query, page },
  })
  return data
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`)
  return data
}
