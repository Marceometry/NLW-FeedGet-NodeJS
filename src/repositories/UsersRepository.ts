import { UserModel } from '@/domain/models'

export type UserCreateData = UserModel

export type UserGetByIdData = {
  id: string
}

export type UserCreateResponse = {
  id: string
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<UserCreateResponse>
  getById: (data: UserGetByIdData) => Promise<UserModel>
}
