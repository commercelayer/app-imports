/* eslint-disable @typescript-eslint/naming-convention */
import { StatusUI } from '#components/ui/StatusIcon'
import { Import } from '@commercelayer/sdk'

/**
 * Extract from the import job onject the progress percentage, if available
 * @param job - The `import` object returned from the API or SDK {@link https://docs.commercelayer.io/core/v/api-reference/imports/object}
 * @returns an object containing `value` to match the numeric value and `formatted` which represent the string with percent sign
 */
export function getProgressPercentage(job: Import): {
  value: number
  formatted: string
} {
  const { processed_count, inputs_size } = job
  if (
    processed_count != null &&
    processed_count > 0 &&
    inputs_size != null &&
    inputs_size > 0
  ) {
    const value = Math.floor((processed_count * 100) / inputs_size)
    return value > 100
      ? {
          value: 100,
          formatted: '100%'
        }
      : {
          value,
          formatted: `${value}%`
        }
  }

  return {
    value: 0,
    formatted: '0%'
  }
}

/**
 * Format the date as nice string
 * @param dateIsoString - to match iso string `created_at` or `updated_at` from the import object (or <any>_at). Example '2022-10-06T11:59:30.371Z'
 * @returns a nice string representation. Example: 'Jul 21, 2022'
 */
export function formatDate(dateIsoString?: string): string {
  if (dateIsoString == null) {
    return 'N/A'
  }
  try {
    const date = new Date(dateIsoString)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  } catch {
    return 'N/A'
  }
}

/**
 * Get the relative status Union Type from the api status {@link https://docs.commercelayer.io/core/v/api-reference/imports/object}
 * @param apiStatus - The import job status. One of 'pending' (default), 'in_progress', 'interrupted', or 'completed'.
 * @returns a valid StatusUI to be used in the StatusIcon component.
 */
export function getUiStatus(apiStatus?: string): StatusUI {
  if (apiStatus === 'in_progress') {
    return 'progress'
  }

  if (apiStatus === 'interrupted') {
    return 'danger'
  }

  if (apiStatus === 'completed') {
    return 'success'
  }

  return 'pending'
}

/**
 * Helper function to retrieve the first and last index of the current page
 * Example: To show `1-50 of 148` or `51-100 of 148` or `100-148 of 148` we can do `${firstOfPage}-${lastOfPage} of ${recordCount}`
 * @param currentPage - The current active page (Int)
 * @param recordsPerPage - Number of items listed in a single page (Int)
 * @param recordCount - Number of the total items from all pages (Int)
 * @returns an object containing `firstOfPage` which is the first index of the current page (on page 2 with 30 items per page will be 31)
 *          and  `lastOfPage` which is the last index of the current page (on page 2 with 30 items per page will be 60)
 */
export function makeCurrentPageOffsets({
  currentPage,
  recordsPerPage,
  recordCount
}: {
  currentPage: number
  recordsPerPage: number
  recordCount: number
}): {
  firstOfPage: number
  lastOfPage: number
} {
  const firstOfPage = recordsPerPage * currentPage - (recordsPerPage - 1)
  const lastOffset = currentPage * recordsPerPage

  return {
    firstOfPage,
    lastOfPage: lastOffset >= recordCount ? recordCount : lastOffset
  }
}

export function makeSomeAdjacentPages({
  currentPage,
  pageCount,
  adjacentPagesCount,
  direction = 'forward',
  excludeCurrentPage = false
}: {
  currentPage: number
  pageCount: number
  adjacentPagesCount: number
  direction?: 'backward' | 'forward'
  excludeCurrentPage?: boolean
}): number[] {
  if (
    currentPage == null ||
    pageCount == null ||
    pageCount < currentPage ||
    currentPage <= 0 ||
    pageCount < 1
  ) {
    return []
  }

  const initialPage = excludeCurrentPage
    ? direction === 'forward'
      ? currentPage + 1
      : currentPage - 1
    : currentPage

  const pages = Array.from({ length: adjacentPagesCount }, (_, i) => {
    const computedIndex =
      direction === 'forward' ? initialPage + i : initialPage - i

    return computedIndex <= pageCount && computedIndex >= 1
      ? computedIndex
      : null
  }).filter(notNull)

  return direction === 'forward' ? pages : pages.reverse()
}

function notNull<T>(value: T | null): value is T {
  return value != null
}
