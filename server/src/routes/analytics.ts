import { Router, Request, Response } from 'express'
import { pool } from '../utils/db'

const router = Router()

// Called by the frontend on every page load
router.post('/track', async (req: Request, res: Response) => {
  if (!pool) { res.json({ ok: true }); return }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown'

  const referrer = (req.headers.referer || req.body?.referrer || '') as string
  const userAgent = (req.headers['user-agent'] || '') as string

  try {
    await pool.query(
      `INSERT INTO page_views (ip, referrer, user_agent) VALUES ($1, $2, $3)`,
      [ip, referrer, userAgent]
    )
  } catch (err) {
    console.error('Failed to record page view:', err)
  }

  res.json({ ok: true })
})

// Simple analytics summary — protect with ANALYTICS_SECRET env var if needed
router.get('/stats', async (req: Request, res: Response) => {
  const secret = process.env.ANALYTICS_SECRET
  if (secret && req.query.secret !== secret) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  if (!pool) {
    res.json({ total: 0, today: 0, thisWeek: 0, recentReferrers: [] })
    return
  }

  try {
    const [total, today, thisWeek, referrers] = await Promise.all([
      pool.query(`SELECT COUNT(*) FROM page_views`),
      pool.query(`SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '1 day'`),
      pool.query(`SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days'`),
      pool.query(`
        SELECT referrer, COUNT(*) AS visits
        FROM page_views
        WHERE referrer != '' AND created_at >= NOW() - INTERVAL '30 days'
        GROUP BY referrer
        ORDER BY visits DESC
        LIMIT 10
      `),
    ])

    res.json({
      total:            Number(total.rows[0].count),
      today:            Number(today.rows[0].count),
      thisWeek:         Number(thisWeek.rows[0].count),
      recentReferrers:  referrers.rows,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Analytics query failed:', msg)
    res.status(500).json({ message: 'Failed to fetch stats', debug: msg })
  }
})

export default router
