import { getTmdbApiKey } from '../configureTmdb'
import { useFavorites } from '../context/useFavorites'
import { InfiniteScrollSentinel } from '../components/InfiniteScrollSentinel'
import { MovieCard } from '../components/MovieCard'
import { useInfiniteMovies } from '../hooks/useInfiniteMovies'

/** `/` — popular movies with infinite scroll. */
export function HomePage(): JSX.Element {
  const hasKey = Boolean(getTmdbApiKey())
  const { isFavorite, toggleFavorite } = useFavorites()
  const { results, loading, error, hasMore, loadMore } = useInfiniteMovies('popular', '', hasKey)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Filmes populares</h1>
        <p className="text-sm text-slate-400">Descubra o que está em alta no TMDB.</p>
      </div>

      {error ? (
        <p className="rounded-lg border border-rose-900/60 bg-rose-950/40 p-4 text-sm text-rose-100">{error}</p>
      ) : null}

      {!hasKey ? (
        <p className="text-sm text-slate-400">Configure sua chave da API para carregar os filmes.</p>
      ) : null}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
  )
}
