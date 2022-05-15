import { UsersRepository } from '@/repositories'
import { mockUser } from '@/domain/test'

export class UsersRepositorySpy implements UsersRepository {
  callsCount = 0
  createResponse = mockUser()
  getByIdResponse = mockUser()
  getByGithubIdResponse = mockUser()

  async create() {
    this.callsCount++

    return this.createResponse
  }

  async delete() {
    this.callsCount++

    return this.createResponse
  }

  async update() {
    this.callsCount++

    return this.createResponse
  }

  async getById() {
    this.callsCount++

    return this.getByIdResponse
  }

  async getByGithubId() {
    this.callsCount++

    return this.getByGithubIdResponse
  }
}
