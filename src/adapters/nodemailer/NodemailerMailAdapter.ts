import { MailAdapter, SendMailData } from '@/adapters'
import { transport } from '@/services'

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
