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
    const { type, comment, screenshot } = data

    const userId = '63c5d1b2-f628-4622-90c0-baab7a3520f2'
    const username = ''
    const email = ''

    if (!type) throw new RequiredError('type')
    if (!comment) throw new RequiredError('comment')
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new InvalidFormatError('screenshot')
    }

    const { id } = await this.feedbacksRepository.create({ ...data, userId })

    await this.mailAdapter.sendMail({ ...data, email, username })

    return { id }
  }
}
