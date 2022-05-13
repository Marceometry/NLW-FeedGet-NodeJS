import { JwtAdapter } from '@/adapters'
import { UserModel } from '@/domain/models'
import { sign, verify } from 'jsonwebtoken'

export class JsonWebTokenJwtAdapter implements JwtAdapter {
  jwtSecret

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || ''
  }

  generateToken(user: UserModel) {
    const token = sign({ user }, this.jwtSecret, {
      subject: user.id,
      expiresIn: '1d',
    })

    return token
  }

  verifyToken(token: string) {
    const { sub } = verify(token, this.jwtSecret)

    return sub as string
  }
}
