import { useMemo, useState } from 'react'
import { getSelectedGenreLabel } from './genreFilterSidebar.utils'
import { GenreNavList } from './GenreFilterSidebar.navList'
import type { GenreFilterSidebarProps } from './GenreFilterSidebar.types'

/** Left genre menu: fixed drawer on small screens, sticky column from `md` up. */
export function GenreFilterSidebar({
  genres,
  selectedGenreId,
  onSelectGenre,
  loading,
  error,
}: GenreFilterSidebarProps): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false)

  const selectedLabel = useMemo(
    () => getSelectedGenreLabel(genres, selectedGenreId),
    [genres, selectedGenreId],
  )

  return (
    <>
      <div className="mb-3 flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-medium text-slate-100 shadow-sm transition hover:border-slate-600 hover:bg-slate-800"
          aria-expanded={mobileOpen}
          aria-controls="genre-filter-panel"
        >
          <span className="text-lg leading-none" aria-hidden>
            ☰
          </span>
          Gêneros
          <span className="truncate text-slate-400">· {selectedLabel}</span>
        </button>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[55] bg-black/60 md:hidden"
          aria-label="Fechar menu de gêneros"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        id="genre-filter-panel"
        className={[
          'fixed bottom-0 left-0 top-0 z-[60] flex w-[min(20rem,88vw)] flex-col border-r border-slate-800 bg-slate-950 shadow-2xl transition-transform duration-200 ease-out md:sticky md:top-20 md:z-0 md:h-[calc(100vh-6rem)] md:max-h-[calc(100vh-6rem)] md:w-56 md:translate-x-0 md:flex-shrink-0 md:rounded-xl md:border md:shadow-none md:pointer-events-auto',
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full pointer-events-none md:translate-x-0',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-3 py-3 md:border-0 md:px-3 md:pt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Gênero</h2>
          <button
            type="button"
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {error ? (
          <p className="px-3 py-2 text-xs text-rose-300">{error}</p>
        ) : loading ? (
          <p className="px-3 py-4 text-sm text-slate-500">Carregando gêneros…</p>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <GenreNavList
              genres={genres}
              selectedGenreId={selectedGenreId}
              onSelectGenre={onSelectGenre}
              onAfterSelect={() => setMobileOpen(false)}
            />
          </div>
        )}
      </aside>
    </>
  )
}
