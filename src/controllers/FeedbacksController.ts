import { Request, Response } from 'express'
import { NodemailerMailAdapter } from '@/adapters'
import { PrismaFeedbacksRepository } from '@/repositories'
import { SubmitFeedbackUseCase } from '@/usecases'
import { FeedbackModel } from '@/domain/models'

export class FeedbacksController {
  private prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  private nodemailerMailAdapter = new NodemailerMailAdapter()
  private submitFeedbackUseCase = new SubmitFeedbackUseCase(
    this.prismaFeedbacksRepository,
    this.nodemailerMailAdapter
  )

  public create = async (req: Request, res: Response) => {
    const data: FeedbackModel = req.body

    const { id } = await this.submitFeedbackUseCase.execute(data)

    return res.status(201).json({ id })
  }
}
