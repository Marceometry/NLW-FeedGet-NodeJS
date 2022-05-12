import { Request, Response, NextFunction } from 'express'
import { JsonWebTokenJwtAdapter } from '@/adapters'

const jwtAdapter = new JsonWebTokenJwtAdapter()

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      errorCode: 'token.invalid',
    })
  }

  const [, token] = authToken.split(' ')

  try {
    jwtAdapter.verifyToken(token)
    return next()
  } catch (error) {
    return res.status(401).json({
      errorCode: 'token.expired',
    })
  }
}
