import { MailAdapter } from '@/adapters'

export class MailAdapterSpy implements MailAdapter {
  callsCount = 0

  async sendMail() {
    this.callsCount++
  }
}
