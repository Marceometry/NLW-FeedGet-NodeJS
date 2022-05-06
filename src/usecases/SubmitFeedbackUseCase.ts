import { MailAdapter } from '@/adapters'
import { FeedbacksRepository } from '@/repositories'
import { FeedbackModel } from '@/domain/models'

type SubmitFeedbackUseCaseRequest = FeedbackModel

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(req: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = req

    const { id } = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    })

    return { id }
  }
}
