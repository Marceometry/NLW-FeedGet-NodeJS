import { FeedbackModel } from '@/domain/models'
import { FeedbacksRepository } from '@/repositories'
import { prisma } from '@/services'

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackModel) {
    const { type, comment, screenshot, userId } = data

    const { id } = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
        userId,
      },
    })

    return { id }
  }

  async getList(userId: string) {
    const response = await prisma.feedback.findMany({
      where: {
        userId,
      },
    })

    return response as FeedbackModel[]
  }
}
