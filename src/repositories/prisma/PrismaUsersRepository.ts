import { UserModel } from '@/domain/models'
import { UsersRepository } from '@/repositories'
import { prisma } from '@/services'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserModel) {
    const { email, username, name, avatar_url, github_id } = data

    return await prisma.user.create({
      data: {
        name,
        email,
        username,
        avatar_url,
        github_id,
        createdAt: new Date().toISOString(),
      },
    })
  }
  async delete(id: string) {
    await prisma.feedback.deleteMany({
      where: {
        clientId: id,
      },
    })

    const user = await prisma.user.delete({
      where: {
        id,
      },
    })

    return user
  }

  async update(email: string, id: string) {
    const user = await prisma.user.update({
      data: {
        email,
        updatedAt: new Date().toISOString(),
      },
      where: {
        id,
      },
    })

    return user
  }

  async getById(id: string) {
    const response = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return response
  }

  async getByGithubId(github_id: number) {
    const response = await prisma.user.findUnique({
      where: {
        github_id,
      },
    })

    return response
  }
}
