import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '..'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e1cbe926bc4ffc',
    pass: '9ca2c617ececed',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { subject, body } = data

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Marcelino Teixeira <marcelino.teixeira.dev@gmail.com>',
      html: body,
      subject,
    })
  }
}
