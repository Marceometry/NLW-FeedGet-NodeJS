import { UsersRepositorySpy } from '@/domain/test'
import { GetUserByIdUseCase } from '..'

const usersRepositorySpy = new UsersRepositorySpy()

const submitUser = new GetUserByIdUseCase(usersRepositorySpy)

const payload = { id: 'id' }

describe('Get user by id', () => {
  it('should be able to submit a user', async () => {
    await submitUser.execute(payload)

    expect(usersRepositorySpy.callsCount).toBe(1)
  })

  it('should throw an error if id is empty', async () => {
    const promise = submitUser.execute({ id: '' })

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if user is empty', async () => {
    usersRepositorySpy.responseGetById = null as any

    const promise = submitUser.execute(payload)

    expect(promise).rejects.toThrow()
  })
})
