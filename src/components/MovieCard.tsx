import { Link } from 'react-router-dom'
import type { MovieSummary } from '../types/movie'
import { highlightTitle } from '../utils/highlight'

function posterSrc(path: string | null): string | undefined {
  if (!path) return undefined
  return `https://image.tmdb.org/t/p/w300${path}`
}

type Props = {
  movie: MovieSummary
  isFavorite: boolean
  onToggleFavorite: () => void
  highlightQuery?: string
  showTrash?: boolean
  onRemove?: () => void
}

export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  highlightQuery,
  showTrash,
  onRemove,
}: Props): JSX.Element {
  const src = posterSrc(movie.poster_path)
  const titleContent = highlightQuery ? highlightTitle(movie.title, highlightQuery) : movie.title

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/20 transition hover:border-slate-600">
      <Link to={`/movie/${movie.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-800">
          {src ? (
            <img
              src={src}
              alt={movie.title}
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">Sem imagem</div>
          )}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-amber-300">
            <span aria-hidden>★</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-50">{titleContent}</h2>
        </div>
      </Link>

      <div className="absolute right-2 top-2 flex gap-2">
        <button
          type="button"
          className="rounded-full bg-black/60 p-2 text-slate-100 backdrop-blur transition hover:bg-black/80"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleFavorite()
          }}
        >
          <HeartIcon filled={isFavorite} />
        </button>
        {showTrash && onRemove ? (
          <button
            type="button"
            className="rounded-full bg-black/60 p-2 text-rose-300 backdrop-blur transition hover:bg-black/80"
            aria-label="Excluir da lista de favoritos"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onRemove()
            }}
          >
            <TrashIcon />
          </button>
        ) : null}
      </div>
    </article>
  )
}

function HeartIcon({ filled }: { filled: boolean }): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className={filled ? 'text-rose-400' : 'text-slate-200'}>
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        d="M12 21s-7.2-4.35-9.6-8.1C.6 9.9 2.1 6 6 6c1.95 0 3.45 1.05 4.5 2.55C11.55 7.05 13.05 6 15 6c3.9 0 5.4 3.9 3.6 6.9C16.2 16.65 12 21 12 21Z"
      />
    </svg>
  )
}

function TrashIcon(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-current">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M9 3h6M4 7h16M6 7l1 14h10l1-14M10 11v6M14 11v6"
      />
    </svg>
  )
}
