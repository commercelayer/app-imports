import { ImportCreate } from '@commercelayer/sdk'
import { AllowedResourceType } from 'App'
import { useState } from 'react'

import { InputParser } from '#components/InputParser'
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
import { Button } from '#ui/Button'
import { Container } from '#ui/Container'
import { Tab, Tabs } from '#ui/Tabs'
import { InputCode } from '#components/InputCode'
import { ImportPreview } from '#components/ImportPreview'
import { InputToggleBox } from '#ui/InputToggleBox'

function NewImportPage(): JSX.Element {
  const { sdkClient } = useTokenProvider()

  const [_match, params] = useRoute(appRoutes.newImport.path)
  const [_location, setLocation] = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [cleanupRecords, setCleanupRecords] = useState(false)
  const [parentResourceId, setParentResourceId] = useState<string | null>()
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

  const parentResource = getParentResourceIfNeeded(resourceType)
  const canCreateImport =
    importCreateValue != null &&
    importCreateValue.length > 0 &&
    (parentResourceId != null || parentResource === false)

  return (
    <Container>
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
          onSelect={setParentResourceId}
        />
      )}

      <Tabs id='tab-import-input' className='mb-14'>
        <Tab name='Upload file'>
          <InputParser
            resourceType={resourceType}
            onDataReady={setImportCreateValue}
            onDataResetRequest={() => setImportCreateValue(undefined)}
            hasParentResource={Boolean(parentResource)}
          />
        </Tab>
        <Tab name='Paste code'>
          <InputCode
            onDataReady={setImportCreateValue}
            onDataResetRequest={() => setImportCreateValue(undefined)}
          />
        </Tab>
      </Tabs>

      {importCreateValue != null && importCreateValue.length > 0 ? (
        <ImportPreview
          className='mb-14'
          data={importCreateValue as []}
          limit={5}
        />
      ) : null}

      <div className='mb-14 px-4 border-t border-b b-gray-100 py-4'>
        <InputToggleBox
          id='toggle-cleanup'
          label='Cleanup records'
          description={
            <>
              Deletes all the resources that are not in the import. <br />
              Be careful, this action cannot be undone.
            </>
          }
          isChecked={cleanupRecords}
          onToggle={setCleanupRecords}
        />
      </div>

      <div className='mb-14'>
        <Button
          className='btn'
          variant='primary'
          onClick={() => {
            void createImportTask(parentResourceId ?? undefined)
          }}
          disabled={!canCreateImport || isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Import'}
        </Button>
      </div>
    </Container>
  )
}

export default NewImportPage
