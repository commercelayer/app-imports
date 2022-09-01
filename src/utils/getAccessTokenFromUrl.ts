import { isFalsy } from './isFalsy'

export const getAccessTokenFromUrl = (): string | null => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const value = params.get('accessToken')
    if (isFalsy(value)) {
      return null
    }

    return value
  }

  return null
}
