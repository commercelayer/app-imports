import { ResourceSelectorContextState } from 'App'

type Action =
  | { type: 'setFetchedResources', payload: Array<{ id: string, name: string }> }
  | { type: 'unsetFetchedResources' }
  | { type: 'setSelectedResource', payload: { id: string, name: string } }
  | { type: 'unsetSelectedResource' }

export const reducer = (state: ResourceSelectorContextState, action: Action): ResourceSelectorContextState => {
  switch (action.type) {
    case 'setFetchedResources':
      return {
        ...state,
        resources: action.payload
      }
    case 'unsetFetchedResources':
      return {
        ...state,
        resources: []
      }
    case 'setSelectedResource':
      return {
        ...state,
        selectedResource: action.payload
      }
    case 'unsetSelectedResource':
      return {
        ...state,
        selectedResource: undefined
      }
    default:
      return state
  }
}
