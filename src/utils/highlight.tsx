import { Fragment, type ReactNode } from 'react'

/** Escapes user-provided search text before embedding it in a RegExp. */
export function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Wraps case-insensitive matches of `query` in `<mark>` for display in titles. */
export function highlightTitle(title: string, query: string): ReactNode {
  const trimmed = query.trim()
  if (!trimmed) return title

  const pattern = new RegExp(`(${escapeRegExp(trimmed)})`, 'gi')
  const parts = title.split(pattern)

  return parts.map((part, index) => {
    if (part.toLowerCase() === trimmed.toLowerCase()) {
      return (
        <mark key={index} className="rounded bg-amber-200/90 px-0.5 text-inherit dark:bg-amber-500/40">
          {part}
        </mark>
      )
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}
