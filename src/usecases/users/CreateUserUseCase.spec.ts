import { UsersRepositorySpy, mockUser } from '@/domain/test'
import { CreateUserUseCase } from '.'

const usersRepositorySpy = new UsersRepositorySpy()

const submitUser = new CreateUserUseCase(usersRepositorySpy)

const payload = mockUser()

describe('Create user', () => {
  it('should be able to submit a user', async () => {
    await submitUser.execute(payload)

    expect(usersRepositorySpy.callsCount).toBe(1)
  })

  it('should throw an error if name is empty', async () => {
    const promise = submitUser.execute({ ...payload, name: '' })

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if username is empty', async () => {
    const promise = submitUser.execute({ ...payload, username: '' })

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if github_id is empty', async () => {
    const promise = submitUser.execute({ ...payload, github_id: null as any })

    expect(promise).rejects.toThrow()
  })
})
