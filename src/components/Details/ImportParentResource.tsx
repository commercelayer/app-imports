import {
  getParentResourceIfNeeded,
  showResourceNiceName
} from '#data/resources'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { useEffect, useState } from 'react'

interface Props {
  sdkClient: CommerceLayerClient
  resourceId: string
  resourceType: string
}

export function ImportParentResource({
  sdkClient,
  resourceId,
  resourceType
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [parentResourceName, setParentResourceName] = useState('')
  const parentResouceType = getParentResourceIfNeeded(resourceType)

  useEffect(
    function fetchResourceAndSetName() {
      setIsLoading(true)
      const canFetch =
        sdkClient != null &&
        parentResouceType != null &&
        parentResouceType !== false

      if (canFetch) {
        sdkClient[parentResouceType]
          .retrieve(resourceId)
          .then((res) => {
            const resourceName =
              'name' in res && res.name != null
                ? `${res.name} (ID: ${resourceId})`
                : res.id
            setParentResourceName(resourceName)
          })
          .catch(() => {
            setParentResourceName(resourceId)
          })
          .finally(() => setIsLoading(false))
      }
    },
    [parentResouceType, resourceId, sdkClient]
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
