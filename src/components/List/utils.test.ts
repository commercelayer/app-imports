/* eslint-disable @typescript-eslint/naming-convention */
import { Import } from '@commercelayer/sdk'
import {
  getProgressPercentage,
  getUiStatus,
  makeCurrentPageOffsets,
  makeSomeAdjacentPages
} from './utils'

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

// getProgressPercentage
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

// makeCurrentPageOffsets
describe('makeCurrentPageOffsets', () => {
  const recordCount = 180
  test('Page 1', () => {
    const pager = makeCurrentPageOffsets({
      recordsPerPage: 50,
      currentPage: 1,
      recordCount
    })
    expect(pager).toMatchObject({ firstOfPage: 1, lastOfPage: 50 })
    expect(`${pager.firstOfPage}-${pager.lastOfPage} of ${recordCount}`).toBe(
      '1-50 of 180'
    )
  })

  test('Page 2', () => {
    const pager = makeCurrentPageOffsets({
      recordsPerPage: 50,
      currentPage: 2,
      recordCount
    })
    expect(pager).toMatchObject({ firstOfPage: 51, lastOfPage: 100 })
    expect(`${pager.firstOfPage}-${pager.lastOfPage} of ${recordCount}`).toBe(
      '51-100 of 180'
    )
  })

  test('Page 3', () => {
    const pager = makeCurrentPageOffsets({
      recordsPerPage: 50,
      currentPage: 3,
      recordCount
    })
    expect(pager).toMatchObject({ firstOfPage: 101, lastOfPage: 150 })
    expect(`${pager.firstOfPage}-${pager.lastOfPage} of ${recordCount}`).toBe(
      '101-150 of 180'
    )
  })

  test('Page 4', () => {
    const pager = makeCurrentPageOffsets({
      recordsPerPage: 50,
      currentPage: 4,
      recordCount
    })
    expect(pager).toMatchObject({ firstOfPage: 151, lastOfPage: 180 })
    expect(`${pager.firstOfPage}-${pager.lastOfPage} of ${recordCount}`).toBe(
      '151-180 of 180'
    )
  })

  test('Everything visibile in one single page', () => {
    const recordCount = 70
    const pager = makeCurrentPageOffsets({
      recordsPerPage: 100,
      currentPage: 1,
      recordCount
    })
    expect(pager).toMatchObject({ firstOfPage: 1, lastOfPage: 70 })
    expect(`${pager.firstOfPage}-${pager.lastOfPage} of ${recordCount}`).toBe(
      '1-70 of 70'
    )
  })
})

// makeNextPages
describe('makeNextPages', () => {
  test('should return first 3 next pages when direction is `forward`', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 1,
        pageCount: 10,
        adjacentPagesCount: 3,
        direction: 'forward'
      })
    ).toStrictEqual([1, 2, 3])
  })

  test('foward direction is the default one and can be omitted', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 1,
        pageCount: 10,
        adjacentPagesCount: 3
      })
    ).toStrictEqual([1, 2, 3])
  })

  test('should return the number of pages set in `adjacentPagesCount`', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 2,
        pageCount: 10,
        adjacentPagesCount: 5,
        direction: 'forward'
      })
    ).toStrictEqual([2, 3, 4, 5, 6])
  })

  test('should return a smaller array if hit last page in `forward` direction', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 7,
        pageCount: 10,
        adjacentPagesCount: 6,
        direction: 'forward'
      })
    ).toStrictEqual([7, 8, 9, 10])
  })

  test('should return only the current page when is same as last page going `forward`', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 10,
        pageCount: 10,
        adjacentPagesCount: 5,
        direction: 'forward'
      })
    ).toStrictEqual([10])
  })

  test('should return previous 3 pages when direction is `backward`', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 5,
        pageCount: 10,
        adjacentPagesCount: 4,
        direction: 'backward'
      })
    ).toStrictEqual([2, 3, 4, 5])
  })

  test('should return a smaller array if hit the first page in `backward` direction', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 3,
        pageCount: 10,
        adjacentPagesCount: 5,
        direction: 'backward'
      })
    ).toStrictEqual([1, 2, 3])
  })

  test('should return only the current page when is same as first page going `backward`', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 1,
        pageCount: 1,
        adjacentPagesCount: 5,
        direction: 'backward'
      })
    ).toStrictEqual([1])
  })

  test('should return empty array if currentPage is higher than total pages', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 10,
        pageCount: 8,
        adjacentPagesCount: 5,
        direction: 'forward'
      })
    ).toStrictEqual([])
  })

  test('should return empty array when current page is lower or equal 0', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: -4,
        pageCount: 8,
        adjacentPagesCount: 5,
        direction: 'forward'
      })
    ).toStrictEqual([])
  })

  test('should return empty array when total pages is lower than 1', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 1,
        pageCount: 0,
        adjacentPagesCount: 5,
        direction: 'forward'
      })
    ).toStrictEqual([])
  })

  test('should exclude current page if specified in options going `forward`', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 2,
        pageCount: 10,
        adjacentPagesCount: 3,
        direction: 'forward',
        excludeCurrentPage: true
      })
    ).toStrictEqual([3, 4, 5])
  })

  test('should exclude current page if specified in options going `forward` also when hitting last page', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 8,
        pageCount: 10,
        adjacentPagesCount: 5,
        direction: 'forward',
        excludeCurrentPage: true
      })
    ).toStrictEqual([9, 10])
  })

  test('should exclude current page if specified in options going `backward`', () => {
    expect(
      makeSomeAdjacentPages({
        currentPage: 4,
        pageCount: 10,
        adjacentPagesCount: 5,
        direction: 'backward',
        excludeCurrentPage: true
      })
    ).toStrictEqual([1, 2, 3])
  })
})
