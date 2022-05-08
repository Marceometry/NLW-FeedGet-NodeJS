import { RequiredError } from '@/domain/errors'
import { UserModel } from '@/domain/models'
import { UsersRepository } from '@/repositories'

type CreateUserUseCaseRequest = UserModel

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserUseCaseRequest) {
    const { email, username } = data

    if (!email) throw new RequiredError('email')
    if (!username) throw new RequiredError('username')

    const { id } = await this.usersRepository.create(data)

    return { id }
  }
}
