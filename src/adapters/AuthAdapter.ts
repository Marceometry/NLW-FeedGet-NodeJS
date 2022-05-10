import { UserModel } from '@/domain/models'

export interface AuthAdapter {
  authenticate: (code: string) => Promise<UserModel | null>
}
