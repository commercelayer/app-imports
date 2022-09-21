import { makeStorageKey } from './storage'

describe('makeStorageKey', () => {
  const { location } = window
  beforeAll(function clearLocation() {
    delete (window as any).location
    ;(window as any).location = {
      ...location,
      hostname: ''
    }
  })
  afterAll(function resetLocation() {
    window.location = location
  })

  test('should return the storage key for clientId', () => {
    window.location.hostname = 'myorg.commercelayer.app'
    const key = makeStorageKey({
      currentApp: 'imports',
      item: 'clientId'
    })

    expect(key).to.equal('imports:myorg:clientId')
  })

  test('should return the storage key for refreshToken', () => {
    window.location.hostname = 'my-org.commercelayer.app'
    const key = makeStorageKey({
      currentApp: 'imports',
      item: 'refreshToken'
    })

    expect(key).to.equal('imports:my-org:refreshToken')
  })
})
