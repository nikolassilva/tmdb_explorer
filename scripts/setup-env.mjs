/**
 * Creates `.env` from `.env.example` when missing (safe for first clone).
 * Run via: `npm run setup` (after `npm install`) or standalone `node scripts/setup-env.mjs`.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = join(root, '.env')
const examplePath = join(root, '.env.example')

if (!existsSync(examplePath)) {
  console.error('[setup-env] Missing .env.example — nothing to copy.')
  process.exit(1)
}

if (existsSync(envPath)) {
  console.log('[setup-env] .env already exists — skipped copy.')
} else {
  copyFileSync(examplePath, envPath)
  console.log('[setup-env] Created .env from .env.example')
  console.log('[setup-env] Edit .env and set VITE_TMDB_API_KEY before running the app.')
}
