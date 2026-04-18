import { useIntersectionLoadMore } from './infiniteScrollSentinel.hooks'
import type { InfiniteScrollSentinelProps } from './InfiniteScrollSentinel.types'

/** Invisible anchor observed to trigger the next page load. */
export function InfiniteScrollSentinel({ hasMore, loading, onLoadMore }: InfiniteScrollSentinelProps): JSX.Element {
  const ref = useIntersectionLoadMore({ hasMore, loading, onLoadMore })

  return <div ref={ref} className="h-10 w-full shrink-0" aria-hidden />
}
