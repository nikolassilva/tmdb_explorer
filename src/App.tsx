import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FavoritesPage } from './pages/FavoritesPage'
import { HomePage } from './pages/HomePage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { SearchPage } from './pages/SearchPage'

/** Top-level route configuration nested under `Layout`. */
export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  )
}
