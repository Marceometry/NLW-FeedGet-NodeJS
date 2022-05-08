import { FeedbackModel } from '@/domain/models'

export interface SendMailData extends FeedbackModel {
  username: string
  email: string
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>
}
