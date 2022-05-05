import { FeedbackCreateData, FeedbacksRepository } from '..'
import { prisma } from '../../prisma'

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    const { type, comment, screenshot } = data

    const { id } = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    })

    return { id }
  }
}
