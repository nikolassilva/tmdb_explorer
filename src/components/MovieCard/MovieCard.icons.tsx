/**
 * SVG icons for favorite and remove actions on the movie card.
 */
export type HeartIconProps = {
  filled: boolean
}

export function HeartIcon({ filled }: HeartIconProps): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className={filled ? 'text-rose-400' : 'text-slate-200'}>
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        d="M12 21s-7.2-4.35-9.6-8.1C.6 9.9 2.1 6 6 6c1.95 0 3.45 1.05 4.5 2.55C11.55 7.05 13.05 6 15 6c3.9 0 5.4 3.9 3.6 6.9C16.2 16.65 12 21 12 21Z"
      />
    </svg>
  )
}

export function TrashIcon(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-current">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M9 3h6M4 7h16M6 7l1 14h10l1-14M10 11v6M14 11v6"
      />
    </svg>
  )
}
