import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'
import { buildPathForSearchSubmit, readSearchTermFromUrl, SEARCH_PATH } from './header.utils'

describe('header.utils', () => {
  describe('readSearchTermFromUrl', () => {
    it('returns empty when not on search route', () => {
      const params = new URLSearchParams({ q: 'x' })
      expect(readSearchTermFromUrl('/', params)).toBe('')
    })

    it('returns q from search route', () => {
      const params = new URLSearchParams({ q: 'matrix' })
      expect(readSearchTermFromUrl(SEARCH_PATH, params)).toBe('matrix')
    })
  })

  describe('buildPathForSearchSubmit', () => {
    it('navigates home when term is empty or only whitespace', () => {
      expect(buildPathForSearchSubmit('')).toBe('/')
      expect(buildPathForSearchSubmit('   ')).toBe('/')
    })

    it('encodes search path', () => {
      expect(buildPathForSearchSubmit('a b')).toBe(`${SEARCH_PATH}?q=${encodeURIComponent('a b')}`)
    })
  })
})

describe('Header', () => {
  it('renders brand and search field', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /TMDB Explorer/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /buscar filmes/i })).toBeInTheDocument()
  })
})
