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

  try {
    // 1. Save to DB
    if (pool) {
      try {
        await pool.query(
          `INSERT INTO contacts (name, email, phone, company, service, message)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [name, email, phone, company, service ?? null, message]
        )
        console.log('Contact saved to DB')
      } catch (dbErr) {
        console.error('DB insert failed:', dbErr)
        throw dbErr
      }
    } else {
      console.warn('No DB pool — DATABASE_URL missing, skipping save.')
    }

    // 2. Send email — never fail the response if unconfigured
    const smtpReady =
      process.env.SMTP_PASS &&
      process.env.SMTP_PASS.length > 10 &&
      !process.env.SMTP_PASS.startsWith('your-')

    if (smtpReady) {
      try {
        await sendContactMail({ name, email, phone, company, service, message })
      } catch (mailErr) {
        console.error('Mail send failed (submission still saved):', mailErr)
      }
    } else {
      console.warn('SMTP not configured — submission saved to DB only.')
    }

    res.json({ message: 'Message sent successfully!' })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Contact route 500:', msg)
    res.status(500).json({ message: 'Failed to submit. Please try again later.' })
  }
})

export default router
