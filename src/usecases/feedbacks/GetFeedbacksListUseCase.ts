import { RequiredError } from '@/domain/errors'
import { FeedbacksRepository } from '@/repositories'

export class GetFeedbacksListUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(userId: string) {
    if (!userId) throw new RequiredError('userId')

    return await this.feedbacksRepository.getList(userId)
  }
}
