import { Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import {
  ListImportContextState,
  ListImportAllowedStatusType,
  AllowedResourceType
} from 'App'

type Action =
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setList'; payload: ListResponse<Import> }
  | { type: 'changePage'; payload: number }
  | { type: 'togglePolling'; payload: boolean }
  | { type: 'sort'; payload: 'asc' | 'desc' }
  | { type: 'filterStatus'; payload: ListImportAllowedStatusType | 'all' }
  | { type: 'filterResourceType'; payload: AllowedResourceType | 'all' }

export const reducer = (
  state: ListImportContextState,
  action: Action
): ListImportContextState => {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'setList':
      return {
        ...state,
        list: action.payload
      }
    case 'changePage':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'togglePolling':
      return {
        ...state,
        isPolling: action.payload
      }
    case 'sort':
      return {
        ...state,
        sort: {
          created_at: action.payload
        }
      }
    case 'filterStatus':
      return {
        ...state,
        filters: {
          ...state.filters,
          status_eq: action.payload === 'all' ? undefined : action.payload
        }
      }
    case 'filterResourceType':
      return {
        ...state,
        filters: {
          ...state.filters,
          resource_type_eq:
            action.payload === 'all' ? undefined : action.payload
        }
      }
    default:
      return state
  }
}
