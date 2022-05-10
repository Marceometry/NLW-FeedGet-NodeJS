import { RequiredError } from '@/domain/errors'
import { UserModel } from '@/domain/models'
import { UsersRepository } from '@/repositories'

type CreateUserUseCaseRequest = UserModel

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserUseCaseRequest) {
    const { username, name, github_id } = data

    if (!name) throw new RequiredError('name')
    if (!username) throw new RequiredError('username')
    if (!github_id) throw new RequiredError('github_id')

    return await this.usersRepository.create(data)
  }
}
