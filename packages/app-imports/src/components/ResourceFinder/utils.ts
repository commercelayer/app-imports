import { SelectValue } from '@commercelayer/core-app-elements/dist/ui/forms/InputSelect'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { ListResponse, Resource } from '@commercelayer/sdk/lib/cjs/resource'
import { AllowedParentResource, AllowedResourceType } from 'App'
import { isEmpty } from 'lodash-es'

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
  const fieldRules = getFieldsRulesByResource(resourceType)
  const fetchedResources = await sdkClient[resourceType].list({
    fields: fieldRules.fields,
    include: fieldRules.include,
    filters:
      hint != null
        ? {
            [fieldRules.searchBy]: hint
          }
        : undefined,
    pageSize: hint != null ? 25 : 5
  })
  return fieldRules.include != null && fieldRules.include.length > 0
    ? adaptApiToSuggestionsForResourceWithIncludes(
        fetchedResources,
        fieldRules.include[0]
      )
    : adaptApiToSuggestions(fetchedResources)
}

/**
 * Almost all resurces contains `id` and `name` fields, and need to be searched/filtered by name
 * but we need to handle some exceptions.
 * For instance `promotion_rules` object does not have a `name` attribute, but only `id`.
 * @param resourceType the name of the resource we need to list
 * @returns an object containing `fieldsToList` to be used to populate the data and a `searchBy` property
 * to be used to filter the list when hint is provided.
 */
function getFieldsRulesByResource(
  resourceType: AllowedResourceType | AllowedParentResource
): {
  fields: Record<string, string[]>
  include?: string[]
  searchBy: string
} {
  switch (resourceType) {
    case 'promotions':
      return {
        fields: {
          [resourceType]: ['id', 'name', 'coupon_codes_promotion_rule'],
          coupon_codes_promotion_rule: ['id']
        },
        include: ['coupon_codes_promotion_rule'],
        searchBy: 'name_cont'
      }

    default:
      return {
        fields: {
          [resourceType]: ['id', 'name']
        },
        searchBy: 'name_cont'
      }
  }
}

/**
 * Simple adapter to transform api raw data into value/label objects
 * to be used as select values
 * @param fetchedResources the resource that has been returned from api (sdk request)
 * @returns an array of objects containing `value` and `label` keys
 */
function adaptApiToSuggestions(
  fetchedResources: ListResponse<Resource & { name?: string }>
): SelectValue[] {
  return fetchedResources.map((r) => {
    const label = 'name' in r && r.name != null ? r.name : r.id
    return {
      label,
      value: r.id
    }
  })
}

/**
 * Custom adapter to make SelectValue for resource with relationship include
 * and use as `value` the id relationship but as `label` the name of the primary resource
 * @param fetchedResources resource with included relationship
 * @param includeName the type of the included resource to get the `id` from
 * @returns an array of objects containing `value` and `label` keys
 */
function adaptApiToSuggestionsForResourceWithIncludes(
  fetchedResources: ListResponse<Resource & { name?: string }>,
  includeName: string
): SelectValue[] {
  return (
    fetchedResources
      .map((r) => {
        const label = 'name' in r && r.name != null ? r.name : r.id
        const value = (r as unknown as ResourceWithSomeInclude)[includeName]?.id
        return {
          label,
          value
        }
      })
      // excluding item where relationship was nullish
      .filter((r) => !isEmpty(r.value))
  )
}
type ResourceWithSomeInclude = Record<string, { id: string }>
