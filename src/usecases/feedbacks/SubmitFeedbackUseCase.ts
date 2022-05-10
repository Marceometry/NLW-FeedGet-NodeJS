import { InvalidFormatError, RequiredError } from '@/domain/errors'
import { FeedbackModel, UserModel } from '@/domain/models'
import { FeedbacksRepository } from '@/repositories'
import { MailAdapter } from '@/adapters'

export interface SubmitFeedbackUseCaseRequest extends FeedbackModel {
  user: UserModel
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(data: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot, user } = data

    if (!type) throw new RequiredError('type')
    if (!comment) throw new RequiredError('comment')
    if (!user.id) throw new RequiredError('user.id')
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new InvalidFormatError('screenshot')
    }

    const { id } = await this.feedbacksRepository.create({
      ...data,
      userId: user.id,
    })

    await this.mailAdapter.sendMail({ ...data, user })

    return { id }
  }
}
