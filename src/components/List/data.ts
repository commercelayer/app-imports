import { ListImportContextValue, ListImportContextState } from 'App'

export const initialState: ListImportContextState = {
  isLoading: true,
  currentPage: 1,
  sort: {
    created_at: 'desc'
  }
}

export const initialValues: ListImportContextValue = {
  state: initialState,
  changePage: () => undefined,
  updateFilter: () => undefined,
  deleteImport: () => undefined,
  deleteQueue: new Set()
}
