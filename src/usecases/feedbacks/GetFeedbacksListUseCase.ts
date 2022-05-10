import { RequiredError } from '@/domain/errors'
import { FeedbacksRepository } from '@/repositories'

export class GetFeedbacksListUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(clientId: string) {
    if (!clientId) throw new RequiredError('clientId')

    return await this.feedbacksRepository.getList(clientId)
  }
}
