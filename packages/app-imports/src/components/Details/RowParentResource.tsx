import { ListDetailsItem } from '@commercelayer/core-app-elements'
import {
  getParentResourceIfNeeded,
  showResourceNiceName
} from '#data/resources'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { useEffect, useState } from 'react'
import { useImportDetailsContext } from './Provider'

interface Props {
  sdkClient: CommerceLayerClient
}

export function RowParentResource({ sdkClient }: Props): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()

  const [isLoading, setIsLoading] = useState(true)
  const [parentResourceName, setParentResourceName] = useState('')
  const parentResouceType =
    data?.resource_type != null
      ? getParentResourceIfNeeded(data.resource_type)
      : false
  const parentResourceId = data?.parent_resource_id ?? false

  useEffect(
    function fetchResourceAndSetName() {
      if (parentResourceId === false || parentResouceType === false) {
        return
      }

      const canFetch =
        sdkClient != null &&
        parentResouceType != null &&
        parentResouceType != null

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
    [parentResourceId, parentResouceType, sdkClient]
  )

  if (
    data == null ||
    data.parent_resource_id == null ||
    parentResouceType === false
  ) {
    return null
  }

  return (
    <>
      {data.parent_resource_id != null && data.resource_type != null ? (
        <ListDetailsItem label='Parent resource' isLoading={isLoading}>
          <div title={showResourceNiceName(parentResouceType)}>
            {parentResourceName}
          </div>
        </ListDetailsItem>
      ) : null}
    </>
  )
}
