import { UsersRepositorySpy } from '@/domain/test'
import { GetUserByGithubIdUseCase } from '.'

const usersRepositorySpy = new UsersRepositorySpy()

const getUser = new GetUserByGithubIdUseCase(usersRepositorySpy)

describe('Get user by github id', () => {
  it('should be able to get a user', async () => {
    await getUser.execute(1)

    expect(usersRepositorySpy.callsCount).toBe(1)
  })

  it('should throw an error if id is empty', async () => {
    const promise = getUser.execute(null as any)

    expect(promise).rejects.toThrow()
  })
})
