import CommerceLayer from "@commercelayer/sdk"
import { ResourceSelectorContextValue, AllowedParentResource, ResourceSelectorResource } from "App"
import { createContext, FC, ReactNode, useCallback, useReducer, useContext } from "react"

import { initialValues, initialState } from "./data"
import { reducer } from "./reducer"

type ResourceSelectorProviderProps = {
  organization: string
  accessToken: string
  children: ((props: ResourceSelectorContextValue) => ReactNode) | ReactNode
}

const Context = createContext<ResourceSelectorContextValue>(initialValues)

export const useResourceSelectorContext = (): ResourceSelectorContextValue => useContext(Context)

export const ResourceSelectorProvider: FC<ResourceSelectorProviderProps> = ({
  organization,
  accessToken,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const cl = CommerceLayer({
    organization,
    accessToken,
  })

  const search = useCallback(async (hint: string, resourceType: AllowedParentResource) => {
    const fetchedResources = await cl[resourceType].list({
      fields: ["name", "id"],
      filters: {
        name_cont: hint,
      },
      pageSize: 5,
    })
    dispatch({
      type: "setFetchedResources",
      payload: fetchedResources.map((r) => ({
        id: r.id,
        name: (r as any).name || resourceType,
      })),
    })
  }, [])

  const select = useCallback(
    (resource: ResourceSelectorResource) => dispatch({ type: "setSelectedResource", payload: resource }),
    []
  )

  const reset = useCallback(() => {
    dispatch({ type: "unsetFetchedResources" })
    dispatch({ type: "unsetSelectedResource" })
  }, [])

  const value: ResourceSelectorContextValue = {
    state,
    search,
    select,
    reset,
  }

  return (
    <Context.Provider value={value}>{typeof children === "function" ? children(value) : children}</Context.Provider>
  )
}
