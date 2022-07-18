import CommerceLayer, { CommerceLayerClient } from "@commercelayer/sdk"
import { ListImportContextValue, UpdateFilterOptions, ListImportContextState } from "App"
import { createContext, FC, ReactNode, useCallback, useEffect, useReducer, useContext, useRef } from "react"

import { initialValues, initialState } from "./data"
import { reducer } from "./reducer"

type ListImportProviderProps = {
  organization: string
  accessToken: string
  pageSize: number
  polling: boolean
  children: ((props: ListImportContextValue) => ReactNode) | ReactNode
}

const Context = createContext<ListImportContextValue>(initialValues)

export const useListContext = (): ListImportContextValue => useContext(Context)

export const ListImportProvider: FC<ListImportProviderProps> = ({
  organization,
  accessToken,
  children,
  pageSize,
  polling,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const cl = CommerceLayer({
    organization,
    accessToken,
  })

  const changePage = useCallback((page: number) => dispatch({ type: "changePage", payload: page }), [])

  const updateFilter = useCallback((filter: UpdateFilterOptions) => {
    dispatch(filter)
  }, [])

  const fetchList = useCallback(
    async (handleLoadingState: boolean) => {
      handleLoadingState && dispatch({ type: "setLoading", payload: true })
      const list = await getAllImports({ cl, state, pageSize })
      dispatch({ type: "setList", payload: list })
      handleLoadingState && dispatch({ type: "setLoading", payload: false })
    },
    [state.currentPage, state.filters]
  )

  useEffect(() => {
    fetchList(true)
    if (!polling) {
      return
    }
    // start polling
    intervalId.current = setInterval(() => {
      fetchList(false)
    }, 4000)

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current)
      }
    }
  }, [polling, state.currentPage, state.filters])

  const value: ListImportContextValue = {
    state,
    changePage,
    updateFilter,
  }

  return (
    <Context.Provider value={value}>{typeof children === "function" ? children(value) : children}</Context.Provider>
  )
}

const getAllImports = ({
  cl,
  state,
  pageSize,
}: {
  cl: CommerceLayerClient
  state: ListImportContextState
  pageSize: number
}) => {
  // we need to remove undefined properties from filters, since SDK won't ignore them
  const filters = { ...state.filters }
  const filtersKey = Object.keys(filters) as (keyof typeof filters)[]
  filtersKey.forEach((f) => {
    if (filters[f] === undefined) {
      delete filters[f]
    }
  })

  return cl.imports.list({
    pageNumber: state.currentPage,
    pageSize,
    sort: state.sort,
    filters,
  })
}
