import { type FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export function Header(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const searchFromUrl = location.pathname === '/search' ? (params.get('q') ?? '') : ''
  const [term, setTerm] = useState(searchFromUrl)

  useEffect(() => {
    setTerm(searchFromUrl)
  }, [searchFromUrl])

  function onSubmit(e: FormEvent): void {
    e.preventDefault()
    const q = term.trim()
    if (!q) {
      navigate('/')
      return
    }
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center justify-between gap-4 sm:justify-start">
          <Link to="/" className="text-lg font-bold tracking-tight text-amber-400">
            TMDB Explorer
          </Link>
          <Link
            to="/favorites"
            className="text-sm font-medium text-slate-200 underline-offset-4 hover:text-white hover:underline sm:hidden"
          >
            Favoritos
          </Link>
        </div>

        <form onSubmit={onSubmit} className="flex flex-1 items-center gap-2">
          <label htmlFor="global-search" className="sr-only">
            Buscar filmes
          </label>
          <input
            id="global-search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar filmes..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Buscar
          </button>
        </form>

        <nav className="hidden sm:block">
          <Link
            to="/favorites"
            className="text-sm font-medium text-slate-200 underline-offset-4 hover:text-white hover:underline"
          >
            Favoritos
          </Link>
        </nav>
      </div>
    </header>
  )
}
