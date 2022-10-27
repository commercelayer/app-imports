import { CommerceLayerClient, Import } from '@commercelayer/sdk'
import { ImportDetailsContextValue } from 'App'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef
} from 'react'
import { initialState, initialValues } from './data'
import { reducer } from './reducer'

interface ImportDetailsProviderProps {
  importId: string
  sdkClient: CommerceLayerClient
  children: ((props: ImportDetailsContextValue) => ReactNode) | ReactNode
}

const POLLING_INTERVAL = 4000

const Context = createContext<ImportDetailsContextValue>(initialValues)
export const useImportDetailsContext = (): ImportDetailsContextValue =>
  useContext(Context)

export function ImportDetailsProvider({
  sdkClient,
  importId,
  children
}: ImportDetailsProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const fetchImport = useCallback(
    async ({ handleLoadingState }: { handleLoadingState: boolean }) => {
      handleLoadingState && dispatch({ type: 'setLoading', payload: true })
      try {
        const importDetails = await sdkClient.imports.retrieve(importId)
        dispatch({ type: 'setData', payload: importDetails })
      } catch {
        dispatch({ type: 'setNotFound', payload: true })
        dispatch({ type: 'togglePolling', payload: false })
        dispatch({ type: 'setLoading', payload: false })
      }
      handleLoadingState && dispatch({ type: 'setLoading', payload: false })
    },
    [importId]
  )

  useEffect(
    function handlePollingState() {
      if (state.data?.status == null) {
        return
      }

      const shouldPoll = statusForPolling.includes(state.data.status)
      dispatch({ type: 'togglePolling', payload: shouldPoll })
    },
    [state.data]
  )

  useEffect(
    function startPolling() {
      void fetchImport({ handleLoadingState: true })
      if (!state.isPolling) {
        return
      }
      intervalId.current = setInterval(() => {
        void fetchImport({ handleLoadingState: false })
      }, POLLING_INTERVAL)

      return () => {
        if (intervalId.current != null) {
          clearInterval(intervalId.current)
        }
      }
    },
    [state.isPolling]
  )

  const value: ImportDetailsContextValue = {
    state,
    refetch: async () => await fetchImport({ handleLoadingState: false })
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}

const statusForPolling: Array<Import['status']> = ['pending', 'in_progress']
