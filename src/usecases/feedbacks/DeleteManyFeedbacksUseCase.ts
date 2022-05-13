import { RequiredError } from '@/domain/errors'
import { FeedbacksRepository } from '@/repositories'

export class DeleteManyFeedbacksUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(feedbacks: string[]) {
    if (!feedbacks?.length) throw new RequiredError('feedbacks')

    return await this.feedbacksRepository.deleteMany(feedbacks)
  }
}
