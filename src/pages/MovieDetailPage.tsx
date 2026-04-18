import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchMovieDetails } from '../api/tmdbApi'
import { getTmdbApiKey } from '../configureTmdb'
import { useFavorites } from '../context/useFavorites'
import type { MovieDetails } from '../types/movie'

/** Prefer original backdrop; fall back to a large poster when backdrop is missing. */
function heroImage(movie: MovieDetails): string | undefined {
  if (movie.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  }
  if (movie.poster_path) {
    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  }
  return undefined
}

/** `/movie/:id` — detail view and favorite toggle. */
export function MovieDetailPage(): JSX.Element | null {
  const { id } = useParams()
  const movieId = Number(id)
  const hasKey = Boolean(getTmdbApiKey())
  const { isFavorite, toggleFavorite } = useFavorites()

  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasKey || !Number.isFinite(movieId)) {
      setMovie(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    void (async () => {
      try {
        const data = await fetchMovieDetails(movieId)
        if (!cancelled) setMovie(data)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erro ao carregar o filme')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [hasKey, movieId])

  if (!Number.isFinite(movieId)) {
    return <p className="text-slate-400">Identificador inválido.</p>
  }

  if (!hasKey) {
    return <p className="text-slate-400">Configure sua chave da API para ver detalhes.</p>
  }

  if (loading && !movie) {
    return <p className="text-slate-400">Carregando…</p>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg border border-rose-900/60 bg-rose-950/40 p-4 text-sm text-rose-100">{error}</p>
        <Link to="/" className="text-amber-400 hover:underline">
          Voltar para a home
        </Link>
      </div>
    )
  }

  if (!movie) {
    return null
  }

  const img = heroImage(movie)
  const favorite = isFavorite(movie.id)
  const summary: Pick<MovieDetails, 'id' | 'title' | 'poster_path' | 'vote_average'> = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-amber-400 hover:underline">
        ← Voltar
      </Link>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-2/5">
          {img ? (
            <img
              src={img}
              alt=""
              className="w-full rounded-xl border border-slate-800 object-cover shadow-2xl shadow-black/40 md:max-h-[70vh]"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-500">
              Sem imagem disponível
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm text-amber-300">
              <span aria-hidden>★</span>
              <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
              <span className="text-slate-400">/ 10</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span key={g.id} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200">
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-sm text-slate-400">
            Lançamento:{' '}
            <span className="text-slate-200">
              {movie.release_date ? new Date(movie.release_date).toLocaleDateString('pt-BR') : '—'}
            </span>
          </p>

          <p className="leading-relaxed text-slate-200">{movie.overview || 'Sem sinopse disponível.'}</p>

          <button
            type="button"
            onClick={() => toggleFavorite(summary)}
            className={
              favorite
                ? 'inline-flex items-center justify-center rounded-lg border border-rose-700 bg-rose-950/60 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-900/60'
                : 'inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400'
            }
          >
            {favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    </div>
  )
}
