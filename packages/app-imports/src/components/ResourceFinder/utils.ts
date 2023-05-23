import { type SelectValue } from '@commercelayer/app-elements/dist/ui/forms/InputSelect'
import { type CommerceLayerClient } from '@commercelayer/sdk'
import {
  type ListResponse,
  type Resource
} from '@commercelayer/sdk/lib/cjs/resource'
import { type AllowedParentResource, type AllowedResourceType } from 'App'

/**
 * Retrieve a list of resources from api filtered by hint if provided.
 * @param sdkClient a valid SDK client
 * @param resourceType a valid resource type
 * @param hint (optional) text to be used as filter value
 * @returns a promise that resolves a list of resources
 */
export const fetchResources = async ({
  sdkClient,
  resourceType,
  hint
}: {
  sdkClient: CommerceLayerClient
  resourceType: AllowedResourceType | AllowedParentResource
  hint?: string
}): Promise<SelectValue[]> => {
  const fetchedResources = await sdkClient[resourceType].list({
    fields: {
      [resourceType]: ['id', 'name']
    },
    filters:
      hint != null
        ? {
            name_cont: hint
          }
        : undefined,
    sort: {
      created_at: 'desc'
    },
    pageSize: 5
  })
  return adaptApiToSuggestions(fetchedResources)
}

/**
 * Simple adapter to transform api raw data into value/label objects
 * to be used as select values
 * @param fetchedResources the resource that has been returned from api (sdk request)
 * @returns an array of objects containing `value` and `label` keys
 */
function adaptApiToSuggestions(
  fetchedResources: ListResponse<Resource & { name?: string | null }>
): SelectValue[] {
  return fetchedResources.map((r) => {
    const label = 'name' in r && r.name != null ? r.name : r.id
    return {
      label,
      value: r.id
    }
  })
}
