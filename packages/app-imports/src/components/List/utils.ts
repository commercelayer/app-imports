import { Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { StatusUI } from '@commercelayer/core-app-elements/dist/ui/atoms/StatusIcon'

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

export function listHasProgressingItems(list: ListResponse<Import>): boolean {
  return list.some(
    (job) =>
      job.status != null && ['pending', 'in_progress'].includes(job.status)
  )
}
