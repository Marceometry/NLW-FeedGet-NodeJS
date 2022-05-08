import { MailAdapter, SendMailData } from '@/adapters'
import { FeedbackTypesEnum } from '@/domain/models'
import { transport } from '@/services'

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { comment, type, screenshot, username, email } = data

    const screenshotHTML = screenshot
      ? [`<p>Screenshot:</p>`, `<img src="${screenshot}">`]
      : []

    const html = [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
      `<h1>Olá, ${username}! Temos um novo feedback.</h1>`,
      `<p>Tipo do feedback: ${FeedbackTypesEnum[type]}</p>`,
      `<p>Comentário: ${comment}</p>`,
      ...screenshotHTML,
      `</div>`,
    ].join('\n')

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: `${username} <${email}>`,
      subject: `Novo feedback - ${FeedbackTypesEnum[type]}`,
      html,
    })
  }
}
