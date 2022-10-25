import { InputAutosuggest } from '#components/ui/InputAutosuggest'
import { Label } from '#components/ui/Label'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { AllowedParentResource } from 'App'
import { fetchResourcesByHint } from './utils'

interface Props {
  resourceType: AllowedParentResource
  sdkClient: CommerceLayerClient
  className?: string
  onSelect?: (resourceId: string) => void
}

export function ResourceFinder({
  resourceType,
  sdkClient,
  className
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
          console.log('sel', selected)
        }}
      />
    </div>
  )
}
