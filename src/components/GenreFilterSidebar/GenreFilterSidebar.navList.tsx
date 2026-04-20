import type { MovieGenre } from '../../types/movie'

export type GenreNavListProps = {
  genres: MovieGenre[]
  selectedGenreId: number | null
  onSelectGenre: (genreId: number | null) => void
  onAfterSelect?: () => void
}

function genreButtonClass(selected: boolean): string {
  return selected
    ? 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/40'
    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
}

/** Scrollable list of genre options plus “Todos”. */
export function GenreNavList({
  genres,
  selectedGenreId,
  onSelectGenre,
  onAfterSelect,
}: GenreNavListProps): JSX.Element {
  function pick(id: number | null): void {
    onSelectGenre(id)
    onAfterSelect?.()
  }

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Filtrar por gênero">
      <button
        type="button"
        onClick={() => pick(null)}
        className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition ${genreButtonClass(selectedGenreId === null)}`}
      >
        Todos
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() => pick(g.id)}
          className={`rounded-lg px-3 py-2 text-left text-sm transition ${genreButtonClass(selectedGenreId === g.id)}`}
        >
          {g.name}
        </button>
      ))}
    </nav>
  )
}
