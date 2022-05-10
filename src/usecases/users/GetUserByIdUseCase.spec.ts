import { UsersRepositorySpy } from '@/domain/test'
import { GetUserByIdUseCase } from '.'

const usersRepositorySpy = new UsersRepositorySpy()

const getUser = new GetUserByIdUseCase(usersRepositorySpy)

describe('Get user by id', () => {
  it('should be able to get a user', async () => {
    await getUser.execute('id')

    expect(usersRepositorySpy.callsCount).toBe(1)
  })

  it('should throw an error if id is empty', async () => {
    const promise = getUser.execute('')

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if user is empty', async () => {
    usersRepositorySpy.getById = null as any

    const promise = getUser.execute('id')

    expect(promise).rejects.toThrow()
  })
})
