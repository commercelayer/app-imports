declare module "App" {
  export type ResourceSelectorResource = { id: string; name: string }

  export type ResourceSelectorContextState = {
    resources: ResourceSelectorResource[]
    selectedResource?: ResourceSelectorResource
  }

  export type ResourceSelectorContextValue = {
    state: ResourceSelectorContextState
    search: (hint: string, resourceType: AllowedParentResource) => void
    select: (resource: ResourceSelectorResource) => void
    reset: () => void
  }
}
