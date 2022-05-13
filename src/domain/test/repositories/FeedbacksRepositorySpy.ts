import { FeedbacksRepository } from '@/repositories'
import { mockFeedbacks } from '../mocks'

export class FeedbacksRepositorySpy implements FeedbacksRepository {
  callsCount = 0
  createResponse = { id: 'id' }
  getListResponse = mockFeedbacks()
  deleteResponse = true

  async create() {
    this.callsCount++

    return this.createResponse
  }

  async getList() {
    this.callsCount++

    return this.getListResponse
  }

  async delete() {
    this.callsCount++

    return this.deleteResponse
  }

  async deleteAll() {
    this.callsCount++

    return this.deleteResponse
  }

  async deleteMany() {
    this.callsCount++

    return this.deleteResponse
  }
}
