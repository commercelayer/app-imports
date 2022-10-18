import { ImportCreate } from '@commercelayer/sdk'
import { AllowedResourceType } from 'App'
import { useState } from 'react'

import { ImportPreviewTable } from '#components/ImportPreviewTable'
import { Input } from '#components/Input'
import { ParentResourceSelector } from '#components/ResourceSelector'
import { ResourceSelectorProvider } from '#components/ResourceSelector/Provider'
import { isAvailableResource } from '#data/resources'
import { appRoutes } from '#data/routes'
import { useLocation, useRoute } from 'wouter'
import { useTokenProvider } from '#components/TokenProvider'

function NewImportPage(): JSX.Element {
  const { sdkClient } = useTokenProvider()

  const params = useRoute('/new/:resourceType')[1]
  const setLocation = useLocation()[1]

  const [isLoading, setIsLoading] = useState(false)
  const [cleanupRecords] = useState(false)
  const [skipParentResource, setSkipParentResource] = useState(false)
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

  const createImportTask = async (parentResourceId?: string): Promise<void> => {
    if (importCreateValue == null) {
      return
    }

    setIsLoading(true)
    try {
      await sdkClient.imports.create({
        resource_type: resourceType,
        cleanup_records: cleanupRecords,
        parent_resource_id: parentResourceId,
        inputs: importCreateValue
      })
      setLocation(appRoutes.list.makePath())
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <ResourceSelectorProvider sdkClient={sdkClient}>
      {(resourceSelectorCtx) => {
        const selectedParentResource = skipParentResource
          ? undefined
          : resourceSelectorCtx.state.selectedResource
        const showUploadInput =
          selectedParentResource != null || skipParentResource

        return (
          <div>
            <div className='container px-3 py-4'>
              <h1 className='text-xl pb-2 font-bold'>
                New upload {resourceType}
              </h1>

              <button onClick={() => setSkipParentResource((s) => !s)}>
                Toggle skip parent resource
              </button>

              {skipParentResource ? null : (
                <ParentResourceSelector
                  resourceType={resourceType}
                  onNotNeeded={() => setSkipParentResource(true)}
                />
              )}

              {showUploadInput ? (
                <Input
                  resourceType={resourceType}
                  onDataReady={setImportCreateValue}
                  onDataResetRequest={() => setImportCreateValue(undefined)}
                  hasParentResource={Boolean(selectedParentResource?.id)}
                />
              ) : null}

              {importCreateValue != null && importCreateValue.length > 0 ? (
                <ImportPreviewTable rows={importCreateValue as []} />
              ) : null}

              {importCreateValue != null && importCreateValue.length > 0 ? (
                <button
                  className='btn'
                  onClick={() => {
                    void createImportTask(selectedParentResource?.id)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Create import task'}
                </button>
              ) : null}
            </div>
          </div>
        )
      }}
    </ResourceSelectorProvider>
  )
}

export default NewImportPage
