import { RequiredError } from '@/domain/errors'
import { UsersRepository } from '@/repositories'

export class GetUserByGithubIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number) {
    if (!id) throw new RequiredError('id')

    return await this.usersRepository.getByGithubId(id)
  }
}
