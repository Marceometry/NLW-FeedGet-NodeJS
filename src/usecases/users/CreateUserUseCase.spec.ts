import { UsersRepositorySpy } from '@/domain/test'
import { UserModel } from '@/domain/models'
import { CreateUserUseCase } from '..'

const usersRepositorySpy = new UsersRepositorySpy()

const submitUser = new CreateUserUseCase(usersRepositorySpy)

const payload: UserModel = {
  email: 'email@email.com',
  username: 'username',
}

describe('Create user', () => {
  it('should be able to submit a user', async () => {
    await submitUser.execute(payload)

    expect(usersRepositorySpy.callsCount).toBe(1)
  })

  it('should throw an error if username is empty', async () => {
    const promise = submitUser.execute({ ...payload, username: '' })

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if email is empty', async () => {
    const promise = submitUser.execute({ ...payload, email: '' })

    expect(promise).rejects.toThrow()
  })
})
