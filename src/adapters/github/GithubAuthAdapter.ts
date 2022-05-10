import { AuthAdapter } from '@/adapters'
import axios from 'axios'

export class GithubAuthAdapter implements AuthAdapter {
  async authenticate(code: string) {
    const body = {
      code,
      client_id: process.env.GITHUB_CLIENT_ID as string,
      client_secret: process.env.GITHUB_CLIENT_SECRET as string,
      redirect_uri: process.env.GITHUB_REDIRECT_URI as string,
    }
    const { data: tokenData } = await axios.post(
      `https://github.com/login/oauth/access_token`,
      body
    )

    const params = new URLSearchParams(tokenData)
    const access_token = params.get('access_token')
    const { data } = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: 'token ' + access_token,
      },
    })

    const user = {
      username: data.login,
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url,
      github_id: data.id,
    }

    return user
  }
}
