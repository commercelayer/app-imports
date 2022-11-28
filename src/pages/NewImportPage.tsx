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
import { Link, useLocation, useRoute } from 'wouter'
import { useTokenProvider } from '#components/TokenProvider'
import { Button } from '#ui/Button'
import { Tab, Tabs } from '#ui/Tabs'
import { InputCode } from '#components/InputCode'
import { ImportPreview } from '#components/ImportPreview'
import { InputToggleBox } from '#ui/InputToggleBox'
import { PageLayout } from '#components/ui/PageLayout'
import { FormFooter } from '#components/ui/FormFooter'
import { PageSkeleton } from '#components/ui/PageSkeleton'
import { PageError } from '#components/ui/PageError'
import { Text } from '#components/ui/Text'
import { Label } from '#components/ui/Label'

function NewImportPage(): JSX.Element {
  const { sdkClient } = useTokenProvider()

  const [_match, params] = useRoute(appRoutes.newImport.path)
  const [_location, setLocation] = useLocation()

  const [isTouched, setIsTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cleanupRecords, setCleanupRecords] = useState(false)
  const [parentResourceId, setParentResourceId] = useState<string | null>()
  const [importCreateValue, setImportCreateValue] = useState<
    ImportCreate['inputs'] | undefined
  >(undefined)

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton />
  }

  const resourceType =
    params == null ? null : (params.resourceType as AllowedResourceType)

  if (resourceType == null) {
    return <PageError errorName='Missing param' errorDescription='' />
  }

  if (!isAvailableResource(resourceType)) {
    return (
      <PageError
        errorName='Invalid resource type'
        errorDescription='Resource not allowed or not enabled'
        actionButton={
          <Link href={appRoutes.list.makePath()}>
            <Button variant='primary'>Go back</Button>
          </Link>
        }
      />
    )
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
    <PageLayout
      title={`Import ${showResourceNiceName(resourceType).toLowerCase()}`}
      onGoBack={() => {
        setLocation(appRoutes.selectResource.makePath())
      }}
    >
      {parentResource !== false && (
        <div className='mb-14'>
          <ResourceFinder
            label={showResourceNiceName(parentResource)}
            placeholder='Type to select parent resource'
            resourceType={parentResource}
            sdkClient={sdkClient}
            onSelect={setParentResourceId}
          />
          {parentResourceId == null && isTouched ? (
            <Text variant='danger' size='small'>
              Please select a parent resource
            </Text>
          ) : null}
        </div>
      )}
      <Tabs id='tab-import-input' className='mb-14' keepAlive>
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
          title='Preview'
          className='mb-14'
          data={importCreateValue as []}
          limit={5}
        />
      ) : null}

      <div className='mb-14'>
        <Label gap htmlFor='toggle-cleanup'>
          More options
        </Label>
        <div>
          <InputToggleBox
            id='toggle-cleanup'
            label={`Deletes all the ${showResourceNiceName(
              resourceType
            ).toLowerCase()} that are not in the import`}
            description='Be careful, this action cannot be undone.'
            isChecked={cleanupRecords}
            onToggle={setCleanupRecords}
          />
        </div>
      </div>

      <FormFooter
        className='mb-14'
        buttonSubmit={
          <Button
            className='btn'
            variant='primary'
            onClick={() => {
              setIsTouched(true)
              if (!canCreateImport) {
                return
              }
              void createImportTask(parentResourceId ?? undefined)
            }}
            disabled={isLoading}
          >
            {isLoading
              ? 'Importing...'
              : `Import ${showResourceNiceName(resourceType).toLowerCase()}`}
          </Button>
        }
      />
    </PageLayout>
  )
}

export default NewImportPage
