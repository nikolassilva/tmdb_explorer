import { sortFavorites } from './sortFavorites'
import type { MovieSummary } from '../types/movie'

const movies: MovieSummary[] = [
  { id: 1, title: 'Beta', poster_path: null, vote_average: 7 },
  { id: 2, title: 'Alpha', poster_path: null, vote_average: 9 },
  { id: 3, title: 'Gama', poster_path: null, vote_average: 8 },
]

describe('sortFavorites', () => {
  it('sorts by title A-Z', () => {
    const sorted = sortFavorites(movies, 'title-asc').map((m) => m.title)
    expect(sorted).toEqual(['Alpha', 'Beta', 'Gama'])
  })

  it('sorts by title Z-A', () => {
    const sorted = sortFavorites(movies, 'title-desc').map((m) => m.title)
    expect(sorted).toEqual(['Gama', 'Beta', 'Alpha'])
  })

  it('sorts by rating high to low', () => {
    const sorted = sortFavorites(movies, 'rating-desc').map((m) => m.id)
    expect(sorted).toEqual([2, 3, 1])
  })

  it('sorts by rating low to high', () => {
    const sorted = sortFavorites(movies, 'rating-asc').map((m) => m.id)
    expect(sorted).toEqual([1, 3, 2])
  })
})
