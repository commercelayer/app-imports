import { Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListImportContextState } from 'App'

type Action =
  | { type: 'loadData'; payload: ListResponse<Import> }
  | { type: 'changePage'; payload: number }

export const reducer = (
  state: ListImportContextState,
  action: Action
): ListImportContextState => {
  switch (action.type) {
    case 'loadData':
      return {
        ...state,
        isLoading: false,
        isPolling: shouldPoll(action.payload),
        list: action.payload
      }
    case 'changePage':
      return {
        ...state,
        isLoading: true,
        currentPage: action.payload
      }
    default:
      return state
  }
}

function shouldPoll(list: ListResponse<Import>): boolean {
  return list.some((job) => statusForPolling.includes(job.status))
}
const statusForPolling: Array<Import['status']> = ['pending', 'in_progress']
