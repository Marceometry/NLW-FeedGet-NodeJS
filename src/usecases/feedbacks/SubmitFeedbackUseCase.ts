import { InvalidFormatError, RequiredError } from '@/domain/errors'
import { FeedbackModel, FeedbackTypesEnum } from '@/domain/models'
import { FeedbacksRepository } from '@/repositories'
import { MailAdapter } from '@/adapters'

export interface SubmitFeedbackUseCaseRequest extends FeedbackModel {
  username: string
  email: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(data: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot, username, email, userId } = data

    if (!type) throw new RequiredError('type')
    if (!comment) throw new RequiredError('comment')
    if (!userId) throw new RequiredError('userId')
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new InvalidFormatError('screenshot')
    }

    const { id } = await this.feedbacksRepository.create({ ...data, userId })

    await this.mailAdapter.sendMail({ ...data, email, username })

    return { id }
  }
}
