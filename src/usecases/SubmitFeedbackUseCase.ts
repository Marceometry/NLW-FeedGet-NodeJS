import { InvalidFormatError, RequiredError } from '@/domain/errors'
import { FeedbackModel } from '@/domain/models'
import { FeedbacksRepository } from '@/repositories'
import { MailAdapter } from '@/adapters'

type SubmitFeedbackUseCaseRequest = FeedbackModel

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(req: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = req

    if (!type) throw new RequiredError('type')
    if (!comment) throw new RequiredError('comment')
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new InvalidFormatError('screenshot')
    }

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
