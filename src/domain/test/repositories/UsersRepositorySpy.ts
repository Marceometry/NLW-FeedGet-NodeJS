import { UsersRepository } from '@/repositories'

export class UsersRepositorySpy implements UsersRepository {
  callsCount = 0
  response = { id: 'id' }

  async create() {
    this.callsCount++

    return this.response
  }
}
