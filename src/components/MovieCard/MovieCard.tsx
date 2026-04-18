import { Link } from 'react-router-dom'
import { HeartIcon, TrashIcon } from './MovieCard.icons'
import type { MovieCardProps } from './MovieCard.types'
import { movieCardTitleContent, posterUrl } from './movieCard.utils'

/** Poster tile with rating, favorite toggle, and optional remove-from-list control. */
export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  highlightQuery,
  showTrash,
  onRemove,
}: MovieCardProps): JSX.Element {
  const src = posterUrl(movie.poster_path)
  const titleContent = movieCardTitleContent(movie.title, highlightQuery)

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
