import { Request, Response } from 'express'
import { NodemailerMailAdapter } from '@/adapters'
import {
  PrismaFeedbacksRepository,
  PrismaUsersRepository,
} from '@/repositories'
import { GetUserByIdUseCase, SubmitFeedbackUseCase } from '@/usecases'
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

  public create = async (req: Request, res: Response) => {
    const data: FeedbackModel = req.body

    try {
      const { email, username } = await this.getUserByIdUseCase.execute({
        id: data.userId,
      })
      const { id } = await this.submitFeedbackUseCase.execute({
        ...data,
        username,
        email,
      })
      return res.status(201).json({ id })
    } catch (error: any) {
      return res.status(error.statusCode).json(error.message)
    }
  }
}
