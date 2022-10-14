/* eslint-disable @typescript-eslint/naming-convention */
import { StatusUI } from '#components/ui/StatusIcon'
import { Import } from '@commercelayer/sdk'

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
