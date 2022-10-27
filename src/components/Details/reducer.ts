import { Import } from '@commercelayer/sdk'
import { ImportDetailsContextState } from 'App'

type Action =
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setNotFound'; payload: boolean }
  | { type: 'setData'; payload: Import }
  | { type: 'togglePolling'; payload: boolean }

export const reducer = (
  state: ImportDetailsContextState,
  action: Action
): ImportDetailsContextState => {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'setNotFound':
      return {
        ...state,
        isNotFound: action.payload
      }
    case 'setData':
      return {
        ...state,
        data: action.payload
      }
    case 'togglePolling':
      return {
        ...state,
        isPolling: action.payload
      }
    default:
      return state
  }
}
