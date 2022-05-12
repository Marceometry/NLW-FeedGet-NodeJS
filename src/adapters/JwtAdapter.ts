import { UserModel } from '@/domain/models'

export interface JwtAdapter {
  generateToken: (user: UserModel) => string
  verifyToken: (token: string) => string
}
