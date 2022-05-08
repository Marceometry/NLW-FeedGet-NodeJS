import { FeedbackCreateData, FeedbacksRepository } from '@/repositories'
import { prisma } from '@/services'

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
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
}
