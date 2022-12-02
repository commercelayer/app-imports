import {
  InputSelect,
  isSingleValueSelected,
  SelectValue
} from '#components/ui/InputSelect'
import { Label } from '#ui/Label'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { AllowedParentResource, AllowedResourceType } from 'App'
import { useEffect, useState } from 'react'
import { fetchInitialResources, fetchResourcesByHint } from './utils'

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
   * Optional css classes for the outer wrapper
   */
  className?: string
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
  className,
  onSelect
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [initialValues, setInitialValues] = useState<SelectValue[]>([])
  useEffect(() => {
    if (resourceType == null) {
      return
    }
    setIsLoading(true)
    fetchInitialResources(sdkClient, resourceType)
      .then(setInitialValues)
      .finally(() => {
        setIsLoading(false)
      })
  }, [resourceType])

  return (
    <div className={className}>
      <Label gap htmlFor='parent-resource'>
        {label}
      </Label>
      <InputSelect
        initialValues={initialValues}
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
          return await fetchResourcesByHint(sdkClient, hint, resourceType)
        }}
      />
    </div>
  )
}