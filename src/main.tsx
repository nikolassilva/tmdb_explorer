import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { configureTmdb } from './configureTmdb'
import { FavoritesProvider } from './context/FavoritesProvider'
import './index.css'
import App from './App.tsx'

// TMDB key must be set before any API call (tests call `configureTmdb` themselves).
configureTmdb(import.meta.env.VITE_TMDB_API_KEY ?? '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
