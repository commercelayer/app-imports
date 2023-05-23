import {
  type ImportDetailsContextState,
  type ImportDetailsContextValue
} from 'App'

export const initialState: ImportDetailsContextState = {
  isLoading: true,
  isPolling: false,
  isDeleting: false,
  isNotFound: false
}

export const initialValues: ImportDetailsContextValue = {
  state: initialState,
  refetch: async () => undefined,
  deleteImport: async () => false
}
