import {
  getParentResourceIfNeeded,
  showResourceNiceName
} from '#data/resources'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { useEffect, useState } from 'react'

interface Props {
  sdkClient: CommerceLayerClient
  /*
   * Resource ID to fetch
   */
  parentResourceId: string
  /*
   * Resource type of the imported resource, we will find the parent resource type from it
   */
  childResourceType: string
}

export function ImportParentResource({
  sdkClient,
  parentResourceId,
  childResourceType
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [parentResourceName, setParentResourceName] = useState('')
  const parentResouceType = getParentResourceIfNeeded(childResourceType)

  useEffect(
    function fetchResourceAndSetName() {
      setIsLoading(true)
      const canFetch =
        sdkClient != null &&
        parentResouceType != null &&
        parentResouceType !== false

      if (canFetch) {
        sdkClient[parentResouceType]
          .retrieve(parentResourceId)
          .then((res) => {
            const resourceName =
              'name' in res && res.name != null
                ? `${res.name} (ID: ${parentResourceId})`
                : res.id
            setParentResourceName(resourceName)
          })
          .catch(() => {
            setParentResourceName(parentResourceId)
          })
          .finally(() => setIsLoading(false))
      }
    },
    [parentResouceType, parentResourceId, sdkClient]
  )

  if (isLoading) {
    return <div className='w-28 h-6 bg-gray-50 rounded-md animate-pulse' />
  }

  return (
    <div
      title={
        parentResouceType !== false
          ? showResourceNiceName(parentResouceType)
          : undefined
      }
    >
      {parentResourceName}
    </div>
  )
}
