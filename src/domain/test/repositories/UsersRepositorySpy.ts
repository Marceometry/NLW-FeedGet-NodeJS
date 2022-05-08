import { UsersRepository } from '@/repositories'

export class UsersRepositorySpy implements UsersRepository {
  callsCount = 0
  responseCreate = { id: 'id' }
  responseGetById = { email: 'email', username: 'username' }

  async create() {
    this.callsCount++

    return this.responseCreate
  }

  async getById() {
    this.callsCount++

    return this.responseGetById
  }
}
