import { InputAutosuggest } from '#ui/InputAutosuggest'
import { Label } from '#ui/Label'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { AllowedParentResource, AllowedResourceType } from 'App'
import { fetchResourcesByHint } from './utils'

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
  return (
    <div className={className}>
      <Label gap htmlFor='parent-resource'>
        {label}
      </Label>
      <InputAutosuggest
        id='resource-finder'
        placeholder={placeholder}
        searchFunction={async (hint) =>
          await fetchResourcesByHint(sdkClient, hint, resourceType)
        }
        onSelect={(selected) => {
          if (onSelect != null) {
            const selectedId: string | null =
              selected != null ? `${selected.id}` : null
            onSelect(selectedId)
          }
        }}
      />
    </div>
  )
}
