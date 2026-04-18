import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { configureTmdb } from '../../configureTmdb'
import { FavoritesProvider } from '../../context/FavoritesProvider'
import type { MovieSummary } from '../../types/movie'
import { MovieCard } from './MovieCard'
import { movieCardTitleContent, posterUrl } from './movieCard.utils'

const movie: MovieSummary = {
  id: 42,
  title: 'Sample movie',
  poster_path: '/poster.jpg',
  vote_average: 8.4,
}

function renderCard(props: Partial<ComponentProps<typeof MovieCard>> = {}) {
  const merged = {
    movie,
    isFavorite: false,
    onToggleFavorite: jest.fn(),
    ...props,
  }

  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <MovieCard {...merged} />
      </FavoritesProvider>
    </MemoryRouter>,
  )
}

describe('movieCard.utils', () => {
  describe('posterUrl', () => {
    it('returns undefined for null path', () => {
      expect(posterUrl(null)).toBeUndefined()
    })

    it('builds TMDB w300 URL', () => {
      expect(posterUrl('/abc.jpg')).toBe('https://image.tmdb.org/t/p/w300/abc.jpg')
    })
  })

  describe('movieCardTitleContent', () => {
    it('returns plain title when highlight is empty', () => {
      expect(movieCardTitleContent('Sample Title', '   ')).toBe('Sample Title')
    })
  })
})

describe('MovieCard', () => {
  beforeEach(() => {
    configureTmdb('test-key')
  })

  it('calls onToggleFavorite when heart is clicked', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = jest.fn()
    renderCard({ onToggleFavorite })

    await user.click(screen.getByRole('button', { name: /favoritos/i }))
    expect(onToggleFavorite).toHaveBeenCalledTimes(1)
  })

  it('shows trash and calls onRemove', async () => {
    const user = userEvent.setup()
    const onRemove = jest.fn()
    renderCard({ showTrash: true, onRemove })

    await user.click(screen.getByRole('button', { name: /excluir da lista/i }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
