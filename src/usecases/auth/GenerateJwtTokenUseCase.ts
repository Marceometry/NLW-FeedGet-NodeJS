import { JwtAdapter } from '@/adapters'
import { NotFoundError, RequiredError } from '@/domain/errors'
import { UserModel } from '@/domain/models'

export class GenerateJwtTokenUseCase {
  constructor(private jwtAdapter: JwtAdapter) {}

  async execute(user: UserModel) {
    if (!user?.id) throw new RequiredError('user')

    const token = this.jwtAdapter.generateToken(user)

    if (!token) throw new Error('Error generating auth token')

    return token
  }
}
