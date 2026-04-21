import { Router, Request, Response } from 'express'
import { sendContactMail } from '../utils/mailer'
import { pool } from '../utils/db'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone, company, service, message } = req.body

  if (!name || !email || !phone || !company || !message) {
    res.status(400).json({ message: 'Please fill in all required fields.' })
    return
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRx.test(email)) {
    res.status(400).json({ message: 'Please enter a valid email address.' })
    return
  }

  // 1. Save to DB — non-fatal; a DB outage should not block the user
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO contacts (name, email, phone, company, service, message)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, email, phone, company, service ?? null, message]
      )
      console.log('Contact saved to DB')
    } catch (dbErr) {
      console.error('DB insert failed (continuing anyway):', dbErr)
    }
  } else {
    console.warn('No DB pool — DATABASE_URL missing, skipping save.')
  }

  // 2. Send email — non-fatal; skipped when Resend is not configured
  if (process.env.RESEND_API_KEY) {
    try {
      await sendContactMail({ name, email, phone, company, service, message })
    } catch (mailErr) {
      console.error('Mail send failed:', mailErr)
    }
  } else {
    console.warn('RESEND_API_KEY not set — submission saved to DB only.')
  }

  res.json({ message: 'Message sent successfully!' })
})

export default router
