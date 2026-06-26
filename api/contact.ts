import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body ?? {}

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // TODO: plug email service here (Nodemailer + Brevo SMTP or Resend)
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'contact@fiindt.com',
  //   to: 'hello@fiindt.com',
  //   subject: `[Fiindt contact] ${subject}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // })

  console.log('[contact]', { name, email, subject, message: message.slice(0, 80) })

  return res.status(200).json({ ok: true })
}
