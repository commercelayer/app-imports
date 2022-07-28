import { ResourceSelectorContextValue, ResourceSelectorContextState } from "App"

export const initialState: ResourceSelectorContextState = {
  resources: [],
  selectedResource: undefined,
}

export const initialValues: ResourceSelectorContextValue = {
  state: initialState,
  search: () => undefined,
  select: () => undefined,
  reset: () => undefined,
}
