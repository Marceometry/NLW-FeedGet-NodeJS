import { AuthAdapterSpy } from '@/domain/test'
import { AuthenticationUseCase } from '.'

const authAdapterSpy = new AuthAdapterSpy()

const getUser = new AuthenticationUseCase(authAdapterSpy)

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
