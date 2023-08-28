import { type Import } from '@commercelayer/sdk'
import { type ListResponse } from '@commercelayer/sdk/lib/cjs/resource'

declare module 'App' {
  export interface ListImportContextValue {
    state: ListImportContextState
    changePage: (page: number) => void
    deleteImport: (importId: string) => Promise<void>
  }

  export interface ListImportContextState {
    list?: ListResponse<Import>
    isLoading: boolean
    isPolling: boolean
    currentPage: number
  }
}
