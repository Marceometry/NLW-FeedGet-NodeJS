import { FeedbackModel } from '@/domain/models'
import { FeedbacksRepository } from '@/repositories'
import { prisma } from '@/services'

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackModel) {
    const { type, comment, screenshot, clientId } = data

    const { id } = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
        clientId,
      },
    })

    return { id }
  }

  async getList(clientId: string) {
    const response = await prisma.feedback.findMany({
      where: {
        clientId,
      },
    })

    return response as FeedbackModel[]
  }

  async deleteAll(clientId: string) {
    const response = await prisma.feedback.deleteMany({
      where: {
        clientId,
      },
    })

    return !!response
  }

  async deleteMany(feedbacks: string[]) {
    const response = await prisma.feedback.deleteMany({
      where: {
        id: {
          in: feedbacks,
        },
      },
    })

    return !!response
  }

  async delete(id: string) {
    const response = await prisma.feedback.delete({
      where: {
        id,
      },
    })

    return !!response
  }
}
