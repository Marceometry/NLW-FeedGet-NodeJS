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
      },
    })
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
