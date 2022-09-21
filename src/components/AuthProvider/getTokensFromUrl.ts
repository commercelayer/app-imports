import { isEmpty } from 'lodash-es'

export const getTokensFromUrl = (): {
  accessToken: string
  refreshToken: string
  clientId: string
} => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('accessToken')
    const refreshToken = params.get('refreshToken')
    const clientId = params.get('clientId')

    return {
      accessToken: isEmpty(accessToken) ? '' : (accessToken as string),
      refreshToken: isEmpty(refreshToken) ? '' : (refreshToken as string),
      clientId: isEmpty(clientId) ? '' : (clientId as string)
    }
  }

  return {
    accessToken: '',
    refreshToken: '',
    clientId: ''
  }
}
