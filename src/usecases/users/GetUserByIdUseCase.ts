import { RequiredError } from '@/domain/errors'
import { UserModel } from '@/domain/models'
import { UsersRepository } from '@/repositories'

type GetUserByIdUseCaseRequest = {
  id: string
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: GetUserByIdUseCaseRequest) {
    const { id } = data

    if (!id) throw new RequiredError('id')

    return await this.usersRepository.getById({ id })
  }
}
