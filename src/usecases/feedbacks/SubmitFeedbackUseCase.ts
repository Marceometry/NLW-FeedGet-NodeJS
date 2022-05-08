import { InvalidFormatError, RequiredError } from '@/domain/errors'
import { FeedbackModel, FeedbackTypesEnum } from '@/domain/models'
import { FeedbacksRepository } from '@/repositories'
import { MailAdapter } from '@/adapters'

type SubmitFeedbackUseCaseRequest = FeedbackModel

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(data: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot, userId } = data

    if (!type) throw new RequiredError('type')
    if (!comment) throw new RequiredError('comment')
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new InvalidFormatError('screenshot')
    }

    const { id } = await this.feedbacksRepository.create(data)

    await this.mailAdapter.sendMail(data)

    return { id }
  }
}
