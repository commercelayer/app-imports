import { CommerceLayerClient } from '@commercelayer/sdk'
import { AllowedParentResource, AllowedResourceType } from 'App'
import { useEffect, useState } from 'react'
import { fetchResources } from './utils'
import {
  InputSelect,
  Label,
  isSingleValueSelected
} from '@commercelayer/app-elements'
import { SelectValue } from '@commercelayer/app-elements/dist/ui/forms/InputSelect'

interface Props {
  /**
   * Text to show above the input
   */
  label: string
  /**
   * Optional input placeholder
   */
  placeholder?: string
  /**
   * the type of the resource we need to access
   */
  resourceType: AllowedResourceType | AllowedParentResource
  /**
   * A signed SDK client
   */
  sdkClient: CommerceLayerClient
  /**
   * callback function fired when the resource is selected from the list
   */
  onSelect?: (resourceId: string | null) => void
}

export function ResourceFinder({
  label,
  placeholder,
  resourceType,
  sdkClient,
  onSelect
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [initialValues, setInitialValues] = useState<SelectValue[]>([])
  useEffect(() => {
    if (resourceType == null) {
      return
    }
    setIsLoading(true)
    fetchResources({ sdkClient, resourceType })
      .then(setInitialValues)
      .finally(() => {
        setIsLoading(false)
      })
  }, [resourceType])

  return (
    <div>
      <Label gap htmlFor='parent-resource'>
        {label}
      </Label>
      <InputSelect
        initialValues={initialValues}
        isClearable
        placeholder={placeholder}
        isLoading={isLoading}
        onSelect={(selected) => {
          if (onSelect != null) {
            onSelect(
              isSingleValueSelected(selected) ? `${selected.value}` : null
            )
          }
        }}
        loadAsyncValues={async (hint) => {
          return await fetchResources({ sdkClient, resourceType, hint })
        }}
      />
    </div>
  )
}
