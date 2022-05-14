import { RequiredError } from '@/domain/errors'
import { UsersRepository } from '@/repositories'

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(email: string, id: string) {
    if (!id) throw new RequiredError('id')
    if (!email) throw new RequiredError('email')

    return await this.usersRepository.update(email, id)
  }
}
