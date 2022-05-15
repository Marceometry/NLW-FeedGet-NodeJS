import { RequiredError } from '@/domain/errors'
import { UsersRepository } from '@/repositories'

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    if (!id) throw new RequiredError('id')

    return await this.usersRepository.delete(id)
  }
}
