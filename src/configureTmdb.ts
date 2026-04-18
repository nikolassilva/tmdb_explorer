/** In-memory TMDB API key set at app bootstrap (keeps `import.meta.env` out of test doubles). */
let apiKey = ''

/** Call once from `main.tsx` with `import.meta.env.VITE_TMDB_API_KEY`. */
export function configureTmdb(key: string): void {
  apiKey = key
}

/** Returns the key configured for outgoing TMDB requests. */
export function getTmdbApiKey(): string {
  return apiKey
}
