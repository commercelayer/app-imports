import {
  ListDetailsItem,
  formatResourceName
} from '@commercelayer/app-elements'
import { getParentResourceIfNeeded } from '#data/resources'
import { type CommerceLayerClient } from '@commercelayer/sdk'
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
  const parentResourceType =
    data?.resource_type != null
      ? getParentResourceIfNeeded(data.resource_type)
      : false
  const parentResourceId = data?.parent_resource_id ?? false

  useEffect(
    function fetchResourceAndSetName() {
      if (parentResourceId === false || parentResourceType === false) {
        return
      }

      const canFetch =
        sdkClient != null &&
        parentResourceType != null &&
        parentResourceType != null

      if (canFetch) {
        sdkClient[parentResourceType]
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
          .finally(() => {
            setIsLoading(false)
          })
      }
    },
    [parentResourceId, parentResourceType, sdkClient]
  )

  if (data?.parent_resource_id == null || parentResourceType === false) {
    return null
  }

  return (
    <>
      {data.parent_resource_id != null && data.resource_type != null ? (
        <ListDetailsItem label='Parent resource' isLoading={isLoading}>
          <div
            title={formatResourceName({
              resource: parentResourceType,
              count: 'plural'
            })}
          >
            {parentResourceName}
          </div>
        </ListDetailsItem>
      ) : null}
    </>
  )
}
