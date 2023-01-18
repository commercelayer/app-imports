import { getUiStatus } from './utils'

// getUiStatus
describe('getUiStatus', () => {
  test('should return `progress` status for the `<StatusIcon>` component, when import job is `in_progress`', () => {
    expect(getUiStatus('in_progress')).toBe('progress')
  })

  test('should return `danger` status for the `<StatusIcon>` component when import job is `interrupted`', () => {
    expect(getUiStatus('interrupted')).toBe('danger')
  })

  test('should return `success` status for the `<StatusIcon>` component when import job is `completed`', () => {
    expect(getUiStatus('completed')).toBe('success')
  })

  test('should return `pending` status for the `<StatusIcon>` component when import job is `pending`', () => {
    expect(getUiStatus('pending')).toBe('pending')
  })

  test('should return `pending` status for the `<StatusIcon>` component when import job is unknown', () => {
    expect(getUiStatus('')).toBe('pending')
    expect(getUiStatus(undefined)).toBe('pending')
    expect(getUiStatus('some-not-recognized-text')).toBe('pending')
  })
})
