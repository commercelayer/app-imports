import { catchInvalidToken } from './catchInvalidToken'

describe('catchInvalidToken', () => {
  it('should catch an invalid token error when is a CommerceLayer 401 error', () => {
    const event = {
      reason: {
        errors: [
          {
            code: 'INVALID_TOKEN',
            detail: 'The access token you provided is invalid.',
            status: '401',
            title: 'Invalid token'
          },
          {
            code: 'SOMETHING_ELSE',
            detail: 'Generic'
          }
        ]
      }
    } as unknown as PromiseRejectionEvent
    expect(catchInvalidToken(event)).toBe(true)
  })

  it('should ignore other CommerceLayer Api errors', () => {
    const event = {
      reason: {
        errors: [
          {
            code: 'SOMETHING_ELSE',
            detail: 'Sku not found'
          }
        ]
      }
    } as unknown as PromiseRejectionEvent
    expect(catchInvalidToken(event)).toBe(false)
  })

  it('should ignore the event when reson.errors is not a CL array', () => {
    expect(catchInvalidToken({
      reason: {
        errors: ['invalid']
      }
    } as unknown as PromiseRejectionEvent)).toBe(false)

    expect(catchInvalidToken({
      reason: {
        errors: true
      }
    } as unknown as PromiseRejectionEvent)).toBe(false)

    expect(catchInvalidToken({
      reason: {
        errors: false
      }
    } as unknown as PromiseRejectionEvent)).toBe(false)

    expect(catchInvalidToken({
      reason: {}
    } as unknown as PromiseRejectionEvent)).toBe(false)

    expect(catchInvalidToken({
      reason: []
    } as unknown as PromiseRejectionEvent)).toBe(false)

    expect(catchInvalidToken({
      reason: true
    } as unknown as PromiseRejectionEvent)).toBe(false)
  })

  it('should ignore all other errors', () => {
    const event = {
      reason: 'Generic'
    } as unknown as PromiseRejectionEvent
    expect(catchInvalidToken(event)).toBe(false)
  })

  it('should ignore empty events', () => {
    const event = {} as unknown as PromiseRejectionEvent
    expect(catchInvalidToken(event)).toBe(false)
  })
})
