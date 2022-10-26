import { InputAutosuggest } from '#components/ui/InputAutosuggest'
import { Label } from '#components/ui/Label'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { AllowedParentResource } from 'App'
import { fetchResourcesByHint } from './utils'

interface Props {
  /**
   * the type of the resource we need to access
   */
  resourceType: AllowedParentResource
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
  resourceType,
  sdkClient,
  className,
  onSelect
}: Props): JSX.Element {
  return (
    <div className={className}>
      <Label gap htmlFor='parent-resource'>
        Parent resource
      </Label>
      <InputAutosuggest
        id='parent-resource'
        placeholder='Type to select parent resource'
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
