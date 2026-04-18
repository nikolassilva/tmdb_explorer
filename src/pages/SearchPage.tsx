import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getTmdbApiKey } from '../configureTmdb'
import { useFavorites } from '../context/useFavorites'
import { InfiniteScrollSentinel } from '../components/InfiniteScrollSentinel'
import { MovieCard } from '../components/MovieCard'
import { useInfiniteMovies } from '../hooks/useInfiniteMovies'

export function SearchPage(): JSX.Element {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const trimmed = query.trim()
  const hasKey = Boolean(getTmdbApiKey())
  const enabled = hasKey && Boolean(trimmed)

  const { isFavorite, toggleFavorite } = useFavorites()
  const { results, loading, error, hasMore, loadMore } = useInfiniteMovies('search', query, enabled)

  const title = useMemo(() => (trimmed ? `Resultados para “${trimmed}”` : 'Busca'), [trimmed])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {!trimmed ? (
          <p className="text-sm text-slate-400">Digite um termo na barra de busca para ver resultados.</p>
        ) : (
          <p className="text-sm text-slate-400">Os termos encontrados aparecem destacados nos títulos.</p>
        )}
      </div>

      {error ? (
        <p className="rounded-lg border border-rose-900/60 bg-rose-950/40 p-4 text-sm text-rose-100">{error}</p>
      ) : null}

      {!hasKey ? (
        <p className="text-sm text-slate-400">Configure sua chave da API para buscar filmes.</p>
      ) : null}

      {trimmed && hasKey ? (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={() => toggleFavorite(movie)}
                highlightQuery={trimmed}
              />
            ))}
          </div>

          {loading && results.length === 0 ? (
            <p className="text-center text-sm text-slate-400">Carregando…</p>
          ) : null}

          {!loading && results.length === 0 ? (
            <p className="text-center text-sm text-slate-400">Nenhum resultado encontrado.</p>
          ) : null}

          {loading && results.length > 0 ? (
            <p className="text-center text-sm text-slate-400">Carregando mais…</p>
          ) : null}

          <InfiniteScrollSentinel hasMore={hasMore} loading={loading} onLoadMore={loadMore} />
        </>
      ) : null}
    </div>
  )
}
