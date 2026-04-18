import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/useFavorites'
import { MovieCard } from '../components/MovieCard'
import { sortFavorites, type FavoriteSortOption } from '../utils/sortFavorites'

export function FavoritesPage(): JSX.Element {
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites()
  const [sort, setSort] = useState<FavoriteSortOption>('title-asc')

  const sorted = useMemo(() => sortFavorites(favorites, sort), [favorites, sort])

  if (favorites.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
        <EmptyIllustration />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Nenhum favorito ainda</h1>
          <p className="text-sm text-slate-400">
            Explore a home, favorite filmes que você curtiu e eles aparecerão aqui.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Explorar filmes
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Favoritos</h1>
          <p className="text-sm text-slate-400">{favorites.length} filme(s) salvos neste dispositivo.</p>
        </div>

        <label className="flex flex-col gap-1 text-sm text-slate-300">
          <span className="text-xs uppercase tracking-wide text-slate-500">Ordenar</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as FavoriteSortOption)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="title-asc">Título (A–Z)</option>
            <option value="title-desc">Título (Z–A)</option>
            <option value="rating-desc">Nota (maior → menor)</option>
            <option value="rating-asc">Nota (menor → maior)</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {sorted.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={() => toggleFavorite(movie)}
            showTrash
            onRemove={() => removeFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  )
}

function EmptyIllustration(): JSX.Element {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" aria-hidden className="text-slate-600">
      <rect x="10" y="20" width="140" height="80" rx="12" fill="currentColor" opacity="0.15" />
      <path
        d="M40 85 L55 55 L70 75 L90 45 L120 85 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="52" cy="40" r="6" fill="currentColor" opacity="0.35" />
    </svg>
  )
}
