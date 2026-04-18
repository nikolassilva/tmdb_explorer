import { useEffect, useRef } from 'react'

type Props = {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
}

export function InfiniteScrollSentinel({ hasMore, loading, onLoadMore }: Props): JSX.Element {
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
      { rootMargin: '480px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  return <div ref={ref} className="h-10 w-full shrink-0" aria-hidden />
}
