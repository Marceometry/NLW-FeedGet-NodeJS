import { PrismaUsersRepository } from '@/repositories'
import { CreateUserUseCase, GetUserByIdUseCase } from '@/usecases'
import { Request, Response } from 'express'

export class UsersController {
  private prismaUsersRepository = new PrismaUsersRepository()
  private createUserUseCase = new CreateUserUseCase(this.prismaUsersRepository)
  private getUserByIdUseCase = new GetUserByIdUseCase(
    this.prismaUsersRepository
  )

  public create = async (req: Request, res: Response) => {
    const data = req.body

    try {
      const response = await this.createUserUseCase.execute(data)

      return res.status(201).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  public getById = async (req: Request, res: Response) => {
    const data = { id: req.params.id }

    try {
      const response = await this.getUserByIdUseCase.execute(data)

      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
