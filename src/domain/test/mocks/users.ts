import { UserModel } from '@/domain/models'

export const mockUser = (): UserModel => ({
  id: 'id',
  email: 'email',
  username: 'username',
  name: 'name',
  avatar_url: 'avatar',
  github_id: 1,
})
