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
import { InputCode } from '#components/InputCode'
import { ImportPreview } from '#components/ImportPreview'
import {
  Button,
  EmptyState,
  FormFooter,
  InputToggleBox,
  Label,
  PageError,
  PageLayout,
  PageSkeleton,
  Spacer,
  Tab,
  Tabs,
  Text,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/core-app-elements'
import { unparse } from 'papaparse'

function NewImportPage(): JSX.Element {
  const {
    canUser,
    settings: { mode }
  } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()

  const [_match, params] = useRoute(appRoutes.newImport.path)
  const [_location, setLocation] = useLocation()

  const [isTouched, setIsTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cleanupRecords, setCleanupRecords] = useState(false)
  const [parentResourceId, setParentResourceId] = useState<string | null>()
  const [format, setFormat] = useState<'csv' | 'json'>()
  const [importCreateValue, setImportCreateValue] = useState<
    ImportCreate['inputs'] | undefined
  >(undefined)

  if (sdkClient == null) {
    return <PageSkeleton />
  }

  if (!canUser('create', 'imports')) {
    return (
      <PageLayout
        title='Imports'
        mode={mode}
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
        }}
      >
        <EmptyState
          title='You are not authorized'
          action={
            <Link href={appRoutes.list.makePath()}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      </PageLayout>
    )
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
        format,
        inputs:
          format === 'csv'
            ? // This forced cast need to be removed once sdk updates input type to accept string values
              (unparse(importCreateValue) as unknown as object[])
            : importCreateValue
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
      mode={mode}
      onGoBack={() => {
        setLocation(appRoutes.selectResource.makePath())
      }}
    >
      {parentResource !== false && (
        <Spacer bottom='14'>
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
        </Spacer>
      )}

      <Spacer bottom='14'>
        <Tabs id='tab-import-input' keepAlive>
          <Tab name='Upload file'>
            <InputParser
              resourceType={resourceType}
              onDataReady={(input, format) => {
                setImportCreateValue(input)
                setFormat(format)
              }}
              onDataResetRequest={() => setImportCreateValue(undefined)}
              hasParentResource={Boolean(parentResource)}
            />
          </Tab>
          <Tab name='Paste code'>
            <InputCode
              onDataReady={(input) => {
                setImportCreateValue(input)
                setFormat('json')
              }}
              onDataResetRequest={() => setImportCreateValue(undefined)}
            />
          </Tab>
        </Tabs>
      </Spacer>

      {importCreateValue != null && importCreateValue.length > 0 ? (
        <Spacer bottom='14'>
          <ImportPreview
            title='Preview'
            data={importCreateValue as []}
            limit={5}
          />
        </Spacer>
      ) : null}

      <Spacer bottom='14'>
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
            checked={cleanupRecords}
            onChange={() => {
              setCleanupRecords((p) => !p)
            }}
          />
        </div>
      </Spacer>

      <Spacer bottom='14'>
        <FormFooter
          buttonSubmit={
            <Button
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
      </Spacer>
    </PageLayout>
  )
}

export default NewImportPage
