import { NotFoundError, RequiredError } from '@/domain/errors'
import { UsersRepository } from '@/repositories'

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    if (!id) throw new RequiredError('id')

    const user = await this.usersRepository.getById(id)

    if (!user) throw new NotFoundError('User')

    return user
  }
}
