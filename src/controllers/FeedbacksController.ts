import { Request, Response } from 'express'
import { NodemailerMailAdapter } from '@/adapters'
import {
  PrismaFeedbacksRepository,
  PrismaUsersRepository,
} from '@/repositories'
import {
  GetFeedbacksListUseCase,
  GetUserByIdUseCase,
  SubmitFeedbackUseCase,
} from '@/usecases'
import { FeedbackModel } from '@/domain/models'

export class FeedbacksController {
  private prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  private prismaUsersRepository = new PrismaUsersRepository()
  private nodemailerMailAdapter = new NodemailerMailAdapter()
  private submitFeedbackUseCase = new SubmitFeedbackUseCase(
    this.prismaFeedbacksRepository,
    this.nodemailerMailAdapter
  )
  private getUserByIdUseCase = new GetUserByIdUseCase(
    this.prismaUsersRepository
  )
  private getFeedbacksListUseCase = new GetFeedbacksListUseCase(
    this.prismaFeedbacksRepository
  )

  public create = async (req: Request, res: Response) => {
    const data: FeedbackModel = req.body

    try {
      const user = await this.getUserByIdUseCase.execute(data.userId)
      const { id } = await this.submitFeedbackUseCase.execute({
        ...data,
        user,
      })
      return res.status(201).json({ id })
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }

  public getList = async (req: Request, res: Response) => {
    const userId = req.query.userId as string

    try {
      const response = await this.getFeedbacksListUseCase.execute(userId)
      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }
}
