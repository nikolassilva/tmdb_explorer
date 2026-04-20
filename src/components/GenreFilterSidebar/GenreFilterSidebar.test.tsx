import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { MovieGenre } from '../../types/movie'
import { GenreFilterSidebar } from './GenreFilterSidebar'
import { getSelectedGenreLabel } from './genreFilterSidebar.utils'

const sampleGenres: MovieGenre[] = [
  { id: 28, name: 'Ação' },
  { id: 10749, name: 'Romance' },
]

describe('genreFilterSidebar.utils', () => {
  it('returns Todos when no genre selected', () => {
    expect(getSelectedGenreLabel(sampleGenres, null)).toBe('Todos')
  })

  it('returns genre name when id matches', () => {
    expect(getSelectedGenreLabel(sampleGenres, 28)).toBe('Ação')
  })

  it('returns fallback when id is unknown', () => {
    expect(getSelectedGenreLabel(sampleGenres, 999)).toBe('Gênero')
  })
})

describe('GenreFilterSidebar', () => {
  it('calls onSelectGenre when a genre is chosen', async () => {
    const user = userEvent.setup()
    const onSelectGenre = jest.fn()

    render(
      <GenreFilterSidebar
        genres={sampleGenres}
        selectedGenreId={null}
        onSelectGenre={onSelectGenre}
        loading={false}
        error={null}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Ação' }))
    expect(onSelectGenre).toHaveBeenCalledWith(28)
  })
})
