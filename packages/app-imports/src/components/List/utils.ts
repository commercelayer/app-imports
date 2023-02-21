import { Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { StatusUI } from '@commercelayer/app-elements/dist/ui/atoms/StatusIcon'

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
 * Checks if list contains some status that rapresent a progressing/temporary state
 * such as `pending` or `in_progress`. Usefull to understand if polling is requried.
 * @param list - The fetched import list
 * @returns `true` if a pending or progress status is found in list, otherwise `false`.
 */
export function listHasProgressingItems(list: ListResponse<Import>): boolean {
  return list.some(
    (job) =>
      job.status != null && ['pending', 'in_progress'].includes(job.status)
  )
}
