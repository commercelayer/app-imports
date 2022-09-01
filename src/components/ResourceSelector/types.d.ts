declare module 'App' {
  export interface ResourceSelectorResource { id: string, name: string }

  export interface ResourceSelectorContextState {
    resources: ResourceSelectorResource[]
    selectedResource?: ResourceSelectorResource
  }

  export interface ResourceSelectorContextValue {
    state: ResourceSelectorContextState
    search: (hint: string, resourceType: AllowedParentResource) => void
    select: (resource: ResourceSelectorResource) => void
    reset: () => void
  }
}
