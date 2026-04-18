import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { InfiniteScrollSentinel } from './InfiniteScrollSentinel'

beforeAll(() => {
  globalThis.IntersectionObserver = class {
    observe = jest.fn()
    unobserve = jest.fn()
    disconnect = jest.fn()
    takeRecords = jest.fn(() => [])
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver
})

describe('InfiniteScrollSentinel', () => {
  it('renders sentinel node', () => {
    const onLoadMore = jest.fn()
    const { container } = render(
      <InfiniteScrollSentinel hasMore loading={false} onLoadMore={onLoadMore} />,
    )
    const node = container.firstChild as HTMLElement
    expect(node).toHaveClass('h-10')
    expect(node).toHaveAttribute('aria-hidden', 'true')
  })
})
