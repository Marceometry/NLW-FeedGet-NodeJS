import { FeedbacksRepository } from '@/repositories'

export class FeedbacksRepositorySpy implements FeedbacksRepository {
  callsCount = 0
  response = { id: 'id' }

  async create() {
    this.callsCount++

    return this.response
  }
}
