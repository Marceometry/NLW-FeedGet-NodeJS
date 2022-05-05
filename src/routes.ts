import { Router } from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const router = Router()

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e1cbe926bc4ffc',
    pass: '9ca2c617ececed',
  },
})

router.post('/feedback', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Marcelino Teixeira <marcelino.teixeira.dev@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n'),
  })

  return res.status(201).json({ data: feedback })
})

export { router }
