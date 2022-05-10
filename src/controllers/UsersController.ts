import { Request, Response } from 'express'
import axios from 'axios'
import { PrismaUsersRepository } from '@/repositories'
import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  GetUserByGithubIdUseCase,
} from '@/usecases'
import { NotFoundError } from '@/domain/errors'

export class UsersController {
  private prismaUsersRepository = new PrismaUsersRepository()
  private createUserUseCase = new CreateUserUseCase(this.prismaUsersRepository)
  private getUserByIdUseCase = new GetUserByIdUseCase(
    this.prismaUsersRepository
  )
  private getUserByGithubIdUseCase = new GetUserByGithubIdUseCase(
    this.prismaUsersRepository
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
      const body = {
        code,
        client_id: process.env.GITHUB_CLIENT_ID as string,
        client_secret: process.env.GITHUB_CLIENT_SECRET as string,
        redirect_uri: process.env.GITHUB_CLIENT_REDIRECT_URI as string,
      }
      const { data } = await axios.post(
        `https://github.com/login/oauth/access_token`,
        body
      )

      const params = new URLSearchParams(data)
      const access_token = params.get('access_token')
      const { data: user } = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: 'token ' + access_token,
        },
      })

      const userExists = await this.getUserByGithubIdUseCase.execute(user.id)
      if (userExists) return res.status(200).json(userExists)

      const payload = {
        username: user.login,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        github_id: user.id,
      }
      const response = await this.createUserUseCase.execute(payload)
      return res.status(201).json(response)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }
}
