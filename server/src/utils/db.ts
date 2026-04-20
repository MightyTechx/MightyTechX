import { Pool } from 'pg'

// Uses DATABASE_URL from .env — password's "@" is URL-encoded as %40
export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for Supabase
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    })
  : null

if (!pool) {
  console.warn('⚠  DATABASE_URL not set — contact submissions will not be saved to DB.')
}
