import {
  UserCreateData,
  UserGetByIdData,
  UsersRepository,
} from '@/repositories'
import { prisma } from '@/services'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateData) {
    const { email, username } = data

    return await prisma.user.create({
      data: {
        email,
        username,
      },
    })
  }

  async getById(data: UserGetByIdData) {
    const { id } = data

    const response = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return response!
  }
}
