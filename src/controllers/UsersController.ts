import { PrismaUsersRepository } from '@/repositories'
import { CreateUserUseCase } from '@/usecases'
import { Request, Response } from 'express'

export class UsersController {
  private prismaUsersRepository = new PrismaUsersRepository()
  private createUserUseCase = new CreateUserUseCase(this.prismaUsersRepository)

  public create = async (req: Request, res: Response) => {
    const data = req.body

    const { id } = await this.createUserUseCase.execute(data)

    return res.status(201).json({ id })
  }
}
