import { Pool } from 'pg'

// Strip sslmode from the URL — we control SSL via the ssl option below
// to avoid a conflict that causes SELF_SIGNED_CERT_IN_CHAIN errors
const dbUrl = process.env.DATABASE_URL?.replace(/[?&]sslmode=\w+/, '')

export const pool = dbUrl
  ? new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    })
  : null

if (!dbUrl) {
  console.warn('⚠  DATABASE_URL not set — DB features disabled.')
}

export async function initDb() {
  if (!pool) return
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id          SERIAL PRIMARY KEY,
        name        TEXT NOT NULL,
        email       TEXT NOT NULL,
        phone       TEXT NOT NULL,
        company     TEXT NOT NULL,
        service     TEXT,
        message     TEXT NOT NULL,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS page_views (
        id          SERIAL PRIMARY KEY,
        ip          TEXT,
        referrer    TEXT,
        user_agent  TEXT,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `)
    console.log('✓ DB tables ready')
  } catch (err) {
    console.error('DB init failed:', err)
  }
}
