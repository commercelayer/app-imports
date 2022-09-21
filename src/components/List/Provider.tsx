import { CommerceLayerClient, Import } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import {
  ListImportContextValue,
  UpdateFilterOptions,
  ListImportContextState
} from 'App'
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useContext,
  useRef,
  useState
} from 'react'

import { initialValues, initialState } from './data'
import { reducer } from './reducer'

interface ListImportProviderProps {
  pageSize: number
  polling: boolean
  children: ((props: ListImportContextValue) => ReactNode) | ReactNode
  sdkClient: CommerceLayerClient
}

const Context = createContext<ListImportContextValue>(initialValues)

export const useListContext = (): ListImportContextValue => useContext(Context)

export const ListImportProvider: FC<ListImportProviderProps> = ({
  children,
  pageSize,
  polling,
  sdkClient
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const [deleteQueue, _setDeleteQueue] = useState<Set<string>>(new Set())
  const addToDeleteQueue = useCallback(
    (importId: string) => {
      const newSet = new Set(deleteQueue)
      newSet.add(importId)
      _setDeleteQueue(newSet)
    },
    [deleteQueue]
  )

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
      const list = await getAllImports({ cl: sdkClient, state, pageSize })
      dispatch({ type: 'setList', payload: list })
      handleLoadingState && dispatch({ type: 'setLoading', payload: false })
    },
    [state.currentPage, state.filters]
  )

  const deleteImport = (importId: string): void => {
    addToDeleteQueue(importId)
    sdkClient.imports
      .delete(importId)
      .catch(() => {
        console.log('Import not found')
      })
      .finally(() => {
        void fetchList({ handleLoadingState: false })
      })
  }

  useEffect(() => {
    void fetchList({ handleLoadingState: true })
    if (!polling) {
      return
    }
    // start polling
    intervalId.current = setInterval(() => {
      void fetchList({ handleLoadingState: false })
    }, 4000)

    return () => {
      if (intervalId.current != null) {
        clearInterval(intervalId.current)
      }
    }
  }, [polling, state.currentPage, state.filters])

  const value: ListImportContextValue = {
    state,
    changePage,
    updateFilter,
    deleteImport,
    deleteQueue
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
