import nodemailer from 'nodemailer'
import 'dotenv/config'

const smtpReady =
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  !process.env.SMTP_PASS.includes('your-')

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
  },
})

if (!smtpReady) {
  console.warn('⚠  SMTP credentials not configured — emails will not be sent.')
  console.warn('   Set SMTP_USER and SMTP_PASS in server/.env')
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

  await transporter.sendMail({
    from: `"Mighty TechX Website" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: data.email,
    subject: `New Enquiry from ${data.name} — ${data.service || 'General'}`,
    html,
  })
}
