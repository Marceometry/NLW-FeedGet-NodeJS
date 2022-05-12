import { Request, Response } from 'express'
import { PrismaUsersRepository } from '@/repositories'
import { GithubAuthAdapter, JsonWebTokenJwtAdapter } from '@/adapters'
import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  GetUserByGithubIdUseCase,
  AuthenticationUseCase,
  GenerateJwtTokenUseCase,
} from '@/usecases'

export class UsersController {
  private prismaUsersRepository = new PrismaUsersRepository()
  private githubAuthAdapter = new GithubAuthAdapter()
  private jsonWebTokenJwtAdapter = new JsonWebTokenJwtAdapter()
  private createUserUseCase = new CreateUserUseCase(this.prismaUsersRepository)
  private getUserByIdUseCase = new GetUserByIdUseCase(
    this.prismaUsersRepository
  )
  private getUserByGithubIdUseCase = new GetUserByGithubIdUseCase(
    this.prismaUsersRepository
  )
  private authenticationUseCase = new AuthenticationUseCase(
    this.githubAuthAdapter
  )
  private generateJwtTokenUseCase = new GenerateJwtTokenUseCase(
    this.jsonWebTokenJwtAdapter
  )

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
      const authUser = await this.authenticationUseCase.execute(code)

      let statusCode = 200
      let user = await this.getUserByGithubIdUseCase.execute(authUser.github_id)

      if (!user) {
        user = await this.createUserUseCase.execute(authUser)
        statusCode = 201
      }

      const token = this.generateJwtTokenUseCase.execute(user)

      const response = { user, token }

      return res.status(statusCode).json(response)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }
}
