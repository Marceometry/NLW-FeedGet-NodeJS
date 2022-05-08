import { UserCreateData, UsersRepository } from '@/repositories'
import { prisma } from '@/services'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateData) {
    const { email, username } = data

    const { id } = await prisma.user.create({
      data: {
        email,
        username,
      },
    })

    return { id }
  }
}
