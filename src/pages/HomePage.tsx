import { useEffect, useState } from 'react'
import { fetchMovieGenres } from '../api/tmdbApi'
import { getTmdbApiKey } from '../configureTmdb'
import { GenreFilterSidebar } from '../components/GenreFilterSidebar'
import { InfiniteScrollSentinel } from '../components/InfiniteScrollSentinel'
import { MovieCard } from '../components/MovieCard'
import { useFavorites } from '../context/useFavorites'
import { useInfiniteMovies } from '../hooks/useInfiniteMovies'
import type { MovieGenre } from '../types/movie'

/** `/` — popular movies with infinite scroll and optional genre filter (TMDB discover). */
export function HomePage(): JSX.Element {
  const hasKey = Boolean(getTmdbApiKey())
  const { isFavorite, toggleFavorite } = useFavorites()
  const [genres, setGenres] = useState<MovieGenre[]>([])
  const [genresLoading, setGenresLoading] = useState(false)
  const [genresError, setGenresError] = useState<string | null>(null)
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null)

  const { results, loading, error, hasMore, loadMore } = useInfiniteMovies('popular', '', hasKey, {
    genreId: selectedGenreId,
  })

  useEffect(() => {
    if (!hasKey) {
      setGenres([])
      setGenresError(null)
      return
    }

    let cancelled = false
    setGenresLoading(true)
    setGenresError(null)

    void (async () => {
      try {
        const list = await fetchMovieGenres()
        if (!cancelled) setGenres(list)
      } catch (e) {
        if (!cancelled) {
          setGenresError(e instanceof Error ? e.message : 'Erro ao carregar gêneros')
        }
      } finally {
        if (!cancelled) setGenresLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [hasKey])

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
      {hasKey ? (
        <GenreFilterSidebar
          genres={genres}
          selectedGenreId={selectedGenreId}
          onSelectGenre={setSelectedGenreId}
          loading={genresLoading}
          error={genresError}
        />
      ) : null}

      <div className="min-w-0 flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Filmes populares</h1>
          <p className="text-sm text-slate-400">
            {selectedGenreId === null
              ? 'Descubra o que está em alta no TMDB.'
              : 'Lista filtrada por gênero (ordenada por popularidade no TMDB).'}
          </p>
        </div>

        {error ? (
          <p className="rounded-lg border border-rose-900/60 bg-rose-950/40 p-4 text-sm text-rose-100">{error}</p>
        ) : null}

        {!hasKey ? (
          <p className="text-sm text-slate-400">Configure sua chave da API para carregar os filmes.</p>
        ) : null}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={() => toggleFavorite(movie)}
            />
          ))}
        </div>

        {loading && results.length === 0 ? (
          <p className="text-center text-sm text-slate-400">Carregando…</p>
        ) : null}

        {loading && results.length > 0 ? (
          <p className="text-center text-sm text-slate-400">Carregando mais…</p>
        ) : null}

        <InfiniteScrollSentinel hasMore={hasMore} loading={loading} onLoadMore={loadMore} />
      </div>
    </div>
  )
}
