import { UserModel } from '@/domain/models'

export type UserCreateData = UserModel

export interface UserCreateResponse {
  id: string
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<UserCreateResponse>
}
