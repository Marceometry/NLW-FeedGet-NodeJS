import { UsersRepositorySpy } from '@/domain/test'
import { UserModel } from '@/domain/models'
import { CreateUserUseCase } from '..'

const feedbacksRepositorySpy = new UsersRepositorySpy()

const submitUser = new CreateUserUseCase(feedbacksRepositorySpy)

const payload: UserModel = {
  email: 'email@email.com',
  username: 'username',
}

describe('Create user', () => {
  it('should be able to submit a feedback', async () => {
    await submitUser.execute(payload)

    expect(feedbacksRepositorySpy.callsCount).toBe(1)
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
