import { FeedbacksRepository } from '@/repositories'
import { mockFeedbacks } from '../mocks'

export class FeedbacksRepositorySpy implements FeedbacksRepository {
  callsCount = 0
  createResponse = { id: 'id' }
  getListResponse = mockFeedbacks()

  async create() {
    this.callsCount++

    return this.createResponse
  }

  async getList() {
    this.callsCount++

    return this.getListResponse
  }
}
