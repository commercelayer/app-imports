import { SelectValue } from '#ui/InputSelect'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { ListResponse, Resource } from '@commercelayer/sdk/lib/cjs/resource'
import { AllowedParentResource, AllowedResourceType } from 'App'

export const fetchResourcesByHint = async (
  sdkClient: CommerceLayerClient,
  hint: string,
  resourceType: AllowedResourceType | AllowedParentResource
): Promise<SelectValue[]> => {
  const fetchedResources = await sdkClient[resourceType].list({
    fields: ['name', 'id'],
    filters: {
      name_cont: hint
    },
    pageSize: 5
  })
  return adaptApiToSuggestions(fetchedResources)
}

export const fetchInitialResources = async (
  sdkClient: CommerceLayerClient,
  resourceType: AllowedResourceType | AllowedParentResource
): Promise<SelectValue[]> => {
  const fetchedResources = await sdkClient[resourceType].list({
    fields: ['name', 'id'],
    pageSize: 25
  })
  return adaptApiToSuggestions(fetchedResources)
}

function adaptApiToSuggestions(
  fetchedResources: ListResponse<Resource & { name?: string }>
): SelectValue[] {
  return fetchedResources.map((r) => {
    const name = 'name' in r && r.name != null ? r.name : r.id
    return {
      value: r.id,
      label: name
    }
  })
}
