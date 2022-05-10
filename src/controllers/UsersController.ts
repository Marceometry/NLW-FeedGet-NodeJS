import { Request, Response } from 'express'
import { PrismaUsersRepository } from '@/repositories'
import { GithubAuthAdapter, MailgunMailAdapter } from '@/adapters'
import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  GetUserByGithubIdUseCase,
  AuthUserUseCase,
} from '@/usecases'

export class UsersController {
  private prismaUsersRepository = new PrismaUsersRepository()
  private githubAuthAdapter = new GithubAuthAdapter()
  private createUserUseCase = new CreateUserUseCase(this.prismaUsersRepository)
  private getUserByIdUseCase = new GetUserByIdUseCase(
    this.prismaUsersRepository
  )
  private getUserByGithubIdUseCase = new GetUserByGithubIdUseCase(
    this.prismaUsersRepository
  )
  private AuthUserUseCase = new AuthUserUseCase(this.githubAuthAdapter)

  public create = async (req: Request, res: Response) => {
    const data = req.body

    try {
      const response = await this.createUserUseCase.execute(data)

      return res.status(201).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }

  public getById = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
      const response = await this.getUserByIdUseCase.execute(id)

      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }

  public getByGithubId = async (req: Request, res: Response) => {
    const id = req.body.id

    try {
      const response = await this.getUserByGithubIdUseCase.execute(id)

      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }

  public authenticate = async (req: Request, res: Response) => {
    const { code } = req.body

    try {
      const user = await this.AuthUserUseCase.execute(code)

      const userData = await this.getUserByGithubIdUseCase.execute(
        user.github_id
      )
      if (userData) return res.status(200).json(userData)

      const response = await this.createUserUseCase.execute(user)
      return res.status(201).json(response)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }

  public mail = async (req: Request, res: Response) => {
    const nodemailerMailAdapter = new MailgunMailAdapter()
    nodemailerMailAdapter.mail()
  }
}
