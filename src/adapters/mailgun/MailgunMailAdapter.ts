import { MailAdapter, SendMailData } from '@/adapters'
import { FeedbackTypesEnum } from '@/domain/models'
import { mailer } from '@/services'
import { getEmailHtml } from './utils'

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
    const { type, user } = data

    const subject = `Novo feedback - ${FeedbackTypesEnum[type]}`

    const html = getEmailHtml(data)

    await mailer.send(user.email!, subject, html)
  }
}
