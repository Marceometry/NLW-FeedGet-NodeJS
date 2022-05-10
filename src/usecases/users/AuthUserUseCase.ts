import { AuthAdapter } from '@/adapters'
import { NotFoundError, RequiredError } from '@/domain/errors'

export class AuthUserUseCase {
  constructor(private authAdapter: AuthAdapter) {}

  async execute(code: string) {
    if (!code) throw new RequiredError('code')

    const user = await this.authAdapter.authenticate(code)

    if (!user) throw new NotFoundError('User')

    return user
  }
}
