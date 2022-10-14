/* eslint-disable @typescript-eslint/naming-convention */
import { Import } from '@commercelayer/sdk'
import { formatDate, getProgressPercentage, getUiStatus } from './utils'

const mockImportTask = (
  processed_count: number | string,
  inputs_size: number | string
): Import => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    processed_count,
    inputs_size
  } as Import
}

describe('getProgressPercentage', () => {
  test('should return 100% when completed', () => {
    const job = mockImportTask(453, 453)
    expect(getProgressPercentage(job)).toMatchObject({
      value: 100,
      formatted: '100%'
    })
  })

  test('should return a rounded int', () => {
    const item = mockImportTask(3, 10)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 30,
      formatted: '30%'
    })
  })

  test('should return a rounded int (floor)', () => {
    const item = mockImportTask(124, 266)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 46,
      formatted: '46%'
    })
  })

  test('should return a zero', () => {
    const item = mockImportTask(0, 400)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 0,
      formatted: '0%'
    })
  })

  test('should always stay close to 99% when about to finish', () => {
    const item = mockImportTask(99999999, 100000000)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 99,
      formatted: '99%'
    })
  })

  test('should never exceed 100%', () => {
    const item = mockImportTask(400, 300)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 100,
      formatted: '100%'
    })
  })

  test('should also accept string', () => {
    const item = mockImportTask('30', 60)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 50,
      formatted: '50%'
    })
  })

  test('should not throw errors when total is zero', () => {
    const item = mockImportTask(10, 0)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 0,
      formatted: '0%'
    })
  })

  test('should not throw errors, but return 0%, when values are null or undefined', () => {
    // @ts-expect-error
    const item = mockImportTask(null, undefined)
    expect(getProgressPercentage(item)).toMatchObject({
      value: 0,
      formatted: '0%'
    })
  })
})

describe('formatDate', () => {
  test('Should return a nice date string', () => {
    const d = new Date(`10-14-2022`).toISOString()
    expect(formatDate(d)).toBe('Oct 14, 2022')
  })

  test('Should accept a date with no time', () => {
    const d = '2022-07-21'
    expect(formatDate(d)).toBe('Jul 21, 2022')
  })

  test('Should not break when date format is wrong', () => {
    const d = '20221T15:35:42.315Z'
    expect(formatDate(d)).toBe('N/A')
  })

  test('Should not break if date is empty string', () => {
    const d = ''
    expect(formatDate(d)).toBe('N/A')
  })

  test('Should not break if no date is passed', () => {
    expect(formatDate(undefined)).toBe('N/A')
  })
})

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
