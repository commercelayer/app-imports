import { Import } from '@commercelayer/sdk'

declare module 'App' {
  export interface ImportDetailsContextValue {
    state: ImportDetailsContextState
    refetch: () => Promise<void>
  }

  export interface ImportDetailsContextState {
    data?: Import
    isLoading: boolean
    isPolling: boolean
    isNotFound: boolean
  }
}
