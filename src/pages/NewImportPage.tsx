import { ImportCreate } from '@commercelayer/sdk'
import { AllowedResourceType } from 'App'
import { useState } from 'react'

import { ImportPreviewTable } from '#components/ImportPreviewTable'
import { Input } from '#components/Input'
import { ResourceFinder } from '#components/ResourceFinder'
import {
  getParentResourceIfNeeded,
  isAvailableResource,
  showResourceNiceName
} from '#data/resources'
import { appRoutes } from '#data/routes'
import { useLocation, useRoute } from 'wouter'
import { useTokenProvider } from '#components/TokenProvider'
import { PageHeading } from '#components/PageHeading'

function NewImportPage(): JSX.Element {
  const { sdkClient } = useTokenProvider()

  const [_match, params] = useRoute('/new/:resourceType')
  const [_location, setLocation] = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [cleanupRecords] = useState(false)
  const [importCreateValue, setImportCreateValue] = useState<
    ImportCreate['inputs'] | undefined
  >(undefined)

  if (sdkClient == null) {
    return <div>Waiting for sdk client</div>
  }

  const resourceType =
    params == null ? null : (params.resourceType as AllowedResourceType)

  if (resourceType == null) {
    return <div>No params</div>
  }

  if (!isAvailableResource(resourceType)) {
    return <div>404 - resource type non allowed or not enabled</div>
  }

  // const createImportTask = async (parentResourceId?: string): Promise<void> => {
  //   if (importCreateValue == null) {
  //     return
  //   }

  //   setIsLoading(true)
  //   try {
  //     await sdkClient.imports.create({
  //       resource_type: resourceType,
  //       cleanup_records: cleanupRecords,
  //       parent_resource_id: parentResourceId,
  //       inputs: importCreateValue
  //     })
  //     setLocation(appRoutes.list.makePath())
  //   } catch {
  //     setIsLoading(false)
  //   }
  // }

  const parentResource = getParentResourceIfNeeded(resourceType)

  return (
    <div className='container mx-auto min-h-screen flex flex-col'>
      <PageHeading
        title={`Import ${showResourceNiceName(resourceType)}`}
        onGoBack={() => {
          setLocation(appRoutes.selectResource.makePath())
        }}
      />

      {parentResource !== false && (
        <ResourceFinder
          resourceType={parentResource}
          sdkClient={sdkClient}
          className='mb-14'
        />
      )}

      <Input
        resourceType={resourceType}
        onDataReady={setImportCreateValue}
        onDataResetRequest={() => setImportCreateValue(undefined)}
        hasParentResource={Boolean(parentResource)}
      />

      {importCreateValue != null && importCreateValue.length > 0 ? (
        <ImportPreviewTable rows={(importCreateValue as []).slice(0, 5)} />
      ) : null}

      {importCreateValue != null && importCreateValue.length > 0 ? (
        <button
          className='btn'
          onClick={() => {
            // void createImportTask(selectedParentResource?.id)
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Create import task'}
        </button>
      ) : null}
    </div>
  )
}

export default NewImportPage
