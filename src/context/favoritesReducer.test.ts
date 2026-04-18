import { favoritesReducer, normalizeMovie } from './favoritesReducer'
import type { MovieSummary } from '../types/movie'

const sample: MovieSummary = {
  id: 1,
  title: 'Sample',
  poster_path: '/p.jpg',
  vote_average: 8.2,
}

describe('favoritesReducer', () => {
  it('hydrates list', () => {
    const next = favoritesReducer([], { type: 'HYDRATE', movies: [sample] })
    expect(next).toHaveLength(1)
    expect(next[0]?.id).toBe(1)
  })

  it('toggles movie on and off', () => {
    const afterAdd = favoritesReducer([], { type: 'TOGGLE', movie: sample })
    expect(afterAdd).toHaveLength(1)

    const afterRemove = favoritesReducer(afterAdd, { type: 'TOGGLE', movie: sample })
    expect(afterRemove).toHaveLength(0)
  })

  it('removes by id', () => {
    const state = [sample]
    const next = favoritesReducer(state, { type: 'REMOVE', id: 1 })
    expect(next).toHaveLength(0)
  })
})

describe('normalizeMovie', () => {
  it('keeps only required fields', () => {
    const movie = { ...sample }
    const normalized = normalizeMovie(movie)
    expect(Object.keys(normalized).sort()).toEqual(['id', 'poster_path', 'title', 'vote_average'].sort())
  })
})
