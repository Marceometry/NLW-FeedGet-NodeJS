import { AuthAdapter } from '@/adapters'
import { mockUser } from '@/domain/test'

export class AuthAdapterSpy implements AuthAdapter {
  callsCount = 0
  response = mockUser()

  async authenticate() {
    this.callsCount++

    return this.response
  }
}
