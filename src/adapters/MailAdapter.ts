import { FeedbackModel, UserModel } from '@/domain/models'

export interface SendMailData extends FeedbackModel {
  user: UserModel
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>
}
