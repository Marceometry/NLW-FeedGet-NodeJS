import { RequiredError } from '@/domain/errors'
import { FeedbacksRepository } from '@/repositories'

export class DeleteFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(id: string) {
    if (!id) throw new RequiredError('id')

    return await this.feedbacksRepository.delete(id)
  }
}
