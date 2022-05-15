import { UserModel } from '@/domain/models'

export interface UsersRepository {
  create: (data: UserModel) => Promise<UserModel>
  delete: (id: string) => Promise<UserModel>
  update: (email: string, id: string) => Promise<UserModel>
  getById: (id: string) => Promise<UserModel | null>
  getByGithubId: (id: number) => Promise<UserModel | null>
}
