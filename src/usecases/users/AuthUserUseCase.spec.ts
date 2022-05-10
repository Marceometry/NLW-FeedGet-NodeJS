import { AuthAdapterSpy } from '@/domain/test'
import { AuthUserUseCase } from '.'

const authAdapterSpy = new AuthAdapterSpy()

const getUser = new AuthUserUseCase(authAdapterSpy)

describe('Auth user', () => {
  it('should be able to get a user', async () => {
    await getUser.execute('code')

    expect(authAdapterSpy.callsCount).toBe(1)
  })

  it('should throw an error if code is empty', async () => {
    const promise = getUser.execute('')

    expect(promise).rejects.toThrow()
  })
})
