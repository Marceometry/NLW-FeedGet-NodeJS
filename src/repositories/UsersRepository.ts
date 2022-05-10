import { UserModel } from '@/domain/models'

export interface UsersRepository {
  create: (data: UserModel) => Promise<UserModel>
  getById: (id: string) => Promise<UserModel | null>
  getByGithubId: (id: number) => Promise<UserModel | null>
}
