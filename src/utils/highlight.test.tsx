import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { escapeRegExp, highlightTitle } from './highlight'

describe('escapeRegExp', () => {
  it('escapes regex metacharacters', () => {
    expect(escapeRegExp('a+b')).toBe('a\\+b')
  })
})

describe('highlightTitle', () => {
  it('returns plain title when query is empty', () => {
    const { container } = render(<>{highlightTitle('Matrix', '   ')}</>)
    expect(container.textContent).toBe('Matrix')
    expect(screen.queryByRole('mark')).not.toBeInTheDocument()
  })

  it('wraps matches in mark', () => {
    render(<>{highlightTitle('Star Wars', 'war')}</>)
    const mark = screen.getByRole('mark')
    expect(mark.textContent?.toLowerCase()).toContain('war')
  })
})
