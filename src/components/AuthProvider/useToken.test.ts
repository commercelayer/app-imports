import { renderHook } from '@testing-library/react'
import { useTokens } from './useTokens'

describe('useTokens', () => {
  const { location } = window
  beforeAll(function clearLocation () {
    delete (window as any).location
    ;(window as any).location = {
      ...location,
      search: ''
    }
  })
  afterAll(function resetLocation () {
    window.location = location
  })

  it('accessToken, refreshToken and clientId should be defined', () => {
    window.location.search = '?accessToken=eyJhbGciOiJIUzUxMiJ9&refreshToken=eyJhabc134&clientId=zxcVBnMASd'
    const { result: { current } } = renderHook(() => useTokens({ currentApp: 'imports' }))
    expect(current.accessToken).toBe('eyJhbGciOiJIUzUxMiJ9')
    expect(current.refreshToken).toBe('eyJhabc134')
    expect(current.clientId).toBe('zxcVBnMASd')
  })

  it('accessToken only should be defined', () => {
    window.location.search = '?accessToken=eyJhbGciOiJIUzUxMiJ9'
    const { result: { current } } = renderHook(() => useTokens({ currentApp: 'imports' }))
    expect(current.accessToken).toBe('eyJhbGciOiJIUzUxMiJ9')
    expect(current.refreshToken).toBe(undefined)
    expect(current.clientId).toBe(undefined)
  })

  it('should return undefined for empty or missing params', () => {
    window.location.search = '?refreshToken=&accessToken='
    const { result: { current } } = renderHook(() => useTokens({ currentApp: 'imports' }))
    expect(current.accessToken).toBe(undefined)
    expect(current.refreshToken).toBe(undefined)
    expect(current.clientId).toBe(undefined)
  })
})
