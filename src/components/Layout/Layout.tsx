import { Outlet } from 'react-router-dom'
import { getTmdbApiKey } from '../../configureTmdb'
import { Header } from '../Header'

/** Root chrome: header, optional API-key notice, and routed `<Outlet />`. */
export function Layout(): JSX.Element {
  const hasKey = Boolean(getTmdbApiKey())

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      {!hasKey ? (
        <div className="border-b border-amber-900/60 bg-amber-950/40 px-4 py-2 text-center text-sm text-amber-100">
          Defina <code className="rounded bg-black/30 px-1">VITE_TMDB_API_KEY</code> no arquivo{' '}
          <code className="rounded bg-black/30 px-1">.env</code> (veja <code className="rounded bg-black/30 px-1">.env.example</code>
          ).
        </div>
      ) : null}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
