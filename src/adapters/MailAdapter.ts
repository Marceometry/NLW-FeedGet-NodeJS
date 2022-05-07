import { FeedbackModel } from '@/domain/models'

export interface SendMailData extends FeedbackModel {}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>
}
