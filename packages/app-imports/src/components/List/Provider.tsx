import { CommerceLayerClient, Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import {
  ListImportContextValue,
  UpdateFilterOptions,
  ListImportContextState
} from 'App'
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

  const updateFilter = useCallback((filter: UpdateFilterOptions) => {
    dispatch(filter)
  }, [])

  const fetchList = useCallback(
    async ({ handleLoadingState }: { handleLoadingState: boolean }) => {
      handleLoadingState && dispatch({ type: 'setLoading', payload: true })
      try {
        const list = await getAllImports({
          cl: sdkClient,
          state,
          pageSize
        })
        dispatch({ type: 'setList', payload: list })
      } finally {
        handleLoadingState && dispatch({ type: 'setLoading', payload: false })
      }
    },
    [state.currentPage, state.filters]
  )

  const deleteImport = (importId: string): void => {
    sdkClient.imports
      .delete(importId)
      .catch(() => {
        console.error('Import not found')
      })
      .finally(() => {
        void fetchList({ handleLoadingState: false })
      })
  }

  useEffect(
    function handleChangePageSkippingFirstRender() {
      if (state.list?.meta.currentPage != null) {
        void fetchList({ handleLoadingState: false })
      }
    },
    [state.currentPage]
  )

  useEffect(
    function handlePollingState() {
      if (state.list == null || state.list.length === 0) {
        return
      }

      const shouldPoll = state.list.some((job) =>
        statusForPolling.includes(job.status)
      )
      dispatch({ type: 'togglePolling', payload: shouldPoll })
    },
    [state.list]
  )

  useEffect(
    function startPolling() {
      void fetchList({ handleLoadingState: true })
      if (!state.isPolling) {
        return
      }
      // start polling
      intervalId.current = setInterval(() => {
        void fetchList({ handleLoadingState: false })
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
    updateFilter,
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
  // we need to remove undefined properties from filters, since SDK won't ignore them
  const filters = { ...state.filters }
  const filtersKey = Object.keys(filters) as Array<keyof typeof filters>
  filtersKey.forEach((f) => {
    if (filters[f] === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete filters[f]
    }
  })

  return await cl.imports.list({
    pageNumber: state.currentPage,
    pageSize,
    sort: state.sort,
    filters
  })
}

const statusForPolling: Array<Import['status']> = ['pending', 'in_progress']
