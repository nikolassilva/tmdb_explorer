import { useEffect, useRef, type RefObject } from 'react'
import { INFINITE_SCROLL_ROOT_MARGIN } from './infiniteScrollSentinel.config'
import type { InfiniteScrollSentinelProps } from './InfiniteScrollSentinel.types'

type UseArgs = Pick<InfiniteScrollSentinelProps, 'hasMore' | 'loading' | 'onLoadMore'>

/**
 * Observes the sentinel element and calls `onLoadMore` when it intersects the viewport (plus root margin).
 */
export function useIntersectionLoadMore({ hasMore, loading, onLoadMore }: UseArgs): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      { rootMargin: INFINITE_SCROLL_ROOT_MARGIN },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  return ref
}
