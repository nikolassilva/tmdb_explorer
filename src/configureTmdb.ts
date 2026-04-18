let apiKey = ''

export function configureTmdb(key: string): void {
  apiKey = key
}

export function getTmdbApiKey(): string {
  return apiKey
}
