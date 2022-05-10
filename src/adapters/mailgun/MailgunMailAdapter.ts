import { MailAdapter, SendMailData } from '@/adapters'
import { FeedbackTypesEnum } from '@/domain/models'
import { mailer } from '@/services'

export class MailgunMailAdapter implements MailAdapter {
  constructor() {
    const apiKey = process.env.MAILGUN_API_KEY as string
    const domain = process.env.MAILGUN_DOMAIN as string
    const fromEmail = process.env.MAILGUN_FROM as string

    mailer.apiKey = apiKey
    mailer.domain = domain
    mailer.fromEmail = fromEmail
    mailer.fromTitle = 'Equipe FeedGet'
    mailer.init()
  }

  async sendMail(data: SendMailData) {
    const { comment, type, screenshot, user } = data

    const subject = `Novo feedback - ${FeedbackTypesEnum[type]}`

    const screenshotHTML = screenshot
      ? [`<p>Screenshot:</p>`, `<img src="${screenshot}">`]
      : []

    const html = [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
      `<h1>Olá, ${user.name}! Temos um novo feedback.</h1>`,
      `<p>Tipo do feedback: ${FeedbackTypesEnum[type]}</p>`,
      `<p>Comentário: ${comment}</p>`,
      ...screenshotHTML,
      `</div>`,
    ].join('\n')

    await mailer.send(user.email!, subject, html)
  }

  async mail() {
    await mailer.send('marceometry@gmail.com', 'teste', '<h1>teste</h1>')
  }
}
