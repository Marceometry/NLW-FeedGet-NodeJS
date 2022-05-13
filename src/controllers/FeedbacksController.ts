import { Request, Response } from 'express'
import { MailgunMailAdapter } from '@/adapters'
import { FeedbackModel } from '@/domain/models'
import {
  PrismaFeedbacksRepository,
  PrismaUsersRepository,
} from '@/repositories'
import {
  DeleteAllFeedbacksUseCase,
  DeleteFeedbackUseCase,
  DeleteManyFeedbacksUseCase,
  GetFeedbacksListUseCase,
  GetUserByIdUseCase,
  SubmitFeedbackUseCase,
} from '@/usecases'

export class FeedbacksController {
  private prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  private prismaUsersRepository = new PrismaUsersRepository()
  private nodemailerMailAdapter = new MailgunMailAdapter()
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
  private deleteFeedbackUseCase = new DeleteFeedbackUseCase(
    this.prismaFeedbacksRepository
  )
  private deleteAllFeedbacksUseCase = new DeleteAllFeedbacksUseCase(
    this.prismaFeedbacksRepository
  )
  private deleteManyFeedbacksUseCase = new DeleteManyFeedbacksUseCase(
    this.prismaFeedbacksRepository
  )

  public create = async (req: Request, res: Response) => {
    const data: FeedbackModel = req.body

    try {
      const user = await this.getUserByIdUseCase.execute(data.clientId)
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
    const clientId = req.query.clientId as string

    try {
      const response = await this.getFeedbacksListUseCase.execute(clientId)
      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }

  public delete = async (req: Request, res: Response) => {
    const id = req.query.id as string

    try {
      const response = await this.deleteFeedbackUseCase.execute(id)
      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }

  public deleteAll = async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string

    try {
      const response = await this.deleteAllFeedbacksUseCase.execute(clientId)
      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }

  public deleteMany = async (req: Request, res: Response) => {
    const { feedbacks } = req.body

    try {
      const response = await this.deleteManyFeedbacksUseCase.execute(feedbacks)
      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }
}
