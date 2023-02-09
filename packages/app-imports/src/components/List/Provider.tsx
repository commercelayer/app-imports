import { CommerceLayerClient, Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListImportContextValue, ListImportContextState } from 'App'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useContext,
  useRef
} from 'react'

import { initialValues, initialState } from './data'
import { reducer } from './reducer'

interface ListImportProviderProps {
  pageSize: number
  children: ((props: ListImportContextValue) => ReactNode) | ReactNode
  sdkClient: CommerceLayerClient
}
const POLLING_INTERVAL = 4000

const Context = createContext<ListImportContextValue>(initialValues)

export const useListContext = (): ListImportContextValue => useContext(Context)

export function ListImportProvider({
  children,
  pageSize,
  sdkClient
}: ListImportProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const changePage = useCallback(
    (page: number) => dispatch({ type: 'changePage', payload: page }),
    []
  )

  const fetchList = useCallback(async () => {
    const list = await getAllImports({
      cl: sdkClient,
      state,
      pageSize
    })
    dispatch({ type: 'loadData', payload: list })
  }, [state.currentPage])

  const deleteImport = (importId: string): void => {
    sdkClient.imports
      .delete(importId)
      .then(fetchList)
      .catch(() => {
        console.error('Import not found')
      })
  }

  useEffect(
    function handleChangePageIgnoringFirstRender() {
      if (state.list?.meta.currentPage != null) {
        void fetchList()
      }
    },
    [state.currentPage]
  )

  useEffect(
    function startPolling() {
      void fetchList()
      if (!state.isPolling) {
        return
      }
      // start polling
      intervalId.current = setInterval(() => {
        void fetchList()
      }, POLLING_INTERVAL)

      return () => {
        if (intervalId.current != null) {
          clearInterval(intervalId.current)
        }
      }
    },
    [state.isPolling]
  )

  const value: ListImportContextValue = {
    state,
    changePage,
    deleteImport
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}

const getAllImports = async ({
  cl,
  state,
  pageSize
}: {
  cl: CommerceLayerClient
  state: ListImportContextState
  pageSize: number
}): Promise<ListResponse<Import>> => {
  return await cl.imports.list({
    pageNumber: state.currentPage,
    pageSize,
    sort: { created_at: 'desc' }
  })
}
