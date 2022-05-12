import { JwtAdapter } from '@/adapters'
import { UserModel } from '@/domain/models'
import { sign, verify } from 'jsonwebtoken'

export class JsonWebTokenJwtAdapter implements JwtAdapter {
  generateToken(user: UserModel) {
    const token = sign({ user }, process.env.JWT_SECRET || '', {
      subject: user.id,
      expiresIn: '1d',
    })

    return token
  }

  verifyToken(token: string) {
    const response = verify(token, process.env.JWT_SECRET || '')
    console.log({ response })
    return response as string
  }
}
