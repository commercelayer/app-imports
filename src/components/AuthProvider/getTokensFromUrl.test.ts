import { getTokensFromUrl } from './getTokensFromUrl'

describe('Read JWT from URL', () => {
  const { location } = window
  beforeAll(function clearLocation () {
    delete (window as any).location
    ;(window as any).location = {
      ...location,
      href: 'http://domain.com',
      search: ''
    }
  })
  afterAll(function resetLocation () {
    window.location = location
  })

  test('accessToken, refreshToken and clientId are in URL query string', () => {
    window.location.search = '?accessToken=eyJhbGciOiJIUzUxMiJ9&refreshToken=eyJhabc134&clientId=zxcVBnMASd'
    const { accessToken, refreshToken, clientId } = getTokensFromUrl()
    expect(accessToken).toBe('eyJhbGciOiJIUzUxMiJ9')
    expect(refreshToken).toBe('eyJhabc134')
    expect(clientId).toBe('zxcVBnMASd')
  })

  test('only accessToken is in URL query string', () => {
    window.location.search = '?accessToken=eyJhbGciOiJIUzUxMiJ9'
    const { accessToken, refreshToken } = getTokensFromUrl()
    expect(accessToken).toBe('eyJhbGciOiJIUzUxMiJ9')
    expect(refreshToken).toBe('')
  })

  test('Query string is empty', () => {
    window.location.search = ''
    const { accessToken, refreshToken } = getTokensFromUrl()
    expect(accessToken).toBe('')
    expect(refreshToken).toBe('')
  })
})
