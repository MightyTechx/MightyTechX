import { Resend } from 'resend'
import 'dotenv/config'

// Lazy-init so a missing key doesn't crash the server on startup
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(key)
  }
  return _resend
}

export interface MailPayload {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export async function sendContactMail(data: MailPayload) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0e1628;color:#fff;border-radius:16px;padding:36px;border:1px solid rgba(130,177,255,0.2)">
      <h2 style="color:#82b1ff;margin-bottom:24px">New Contact Form Submission — Mighty TechX</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.55);width:140px">Full Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08)">${data.name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.55)">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08)"><a href="mailto:${data.email}" style="color:#82b1ff">${data.email}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.55)">Phone</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08)">${data.phone}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.55)">Company / Country</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08)">${data.company}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.55)">Service</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#82b1ff">${data.service || 'Not specified'}</td></tr>
      </table>
      <div style="margin-top:24px">
        <p style="color:rgba(255,255,255,0.55);margin-bottom:8px">Message</p>
        <p style="background:rgba(255,255,255,0.05);padding:16px;border-radius:10px;line-height:1.7">${data.message}</p>
      </div>
      <p style="margin-top:32px;font-size:12px;color:rgba(255,255,255,0.3)">Sent via Mighty TechX contact form</p>
    </div>
  `

  await getResend().emails.send({
    from: 'onboarding@resend.dev',
    to: 'mightyproitsolutions@gmail.com',
    replyTo: data.email,
    subject: `New Enquiry from ${data.name} — ${data.service || 'General'}`,
    html,
  })
}
