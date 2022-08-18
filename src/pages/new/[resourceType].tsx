import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

import { ImportPreviewTable } from "#components/ImportPreviewTable"
import { Input } from "#components/Input"
import { ParentResourceSelector } from "#components/ResourceSelector"
import { ResourceSelectorProvider } from "#components/ResourceSelector/Provider"
import { useSettings } from "#components/SettingsProvider"
import { isAvailableResource } from "#data/resources"
import { appRoutes } from "#data/routes"

const NewImportPage: NextPage = () => {
  const {
    settings: { organization, accessToken },
    sdkClient,
  } = useSettings()
  const { query, push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [cleanupRecords, setCleanupRecords] = useState(false)
  const [skipParentResource, setSkipParentResource] = useState(false)
  const [importCreateValue, setImportCreateValue] = useState<ImportCreate["inputs"] | undefined>(undefined)

  const resourceType = query.resourceType as AllowedResourceType

  if (!organization || !accessToken || !sdkClient) {
    return null
  }

  if (!isAvailableResource(resourceType)) {
    return <div>404 - resource type non allowed or not enabled</div>
  }

  const createImportTask = async (parentResourceId?: string) => {
    if (!importCreateValue) {
      return
    }

    setIsLoading(true)
    try {
      await sdkClient.imports.create({
        resource_type: resourceType,
        cleanup_records: cleanupRecords,
        parent_resource_id: parentResourceId,
        inputs: importCreateValue,
      })
      push(appRoutes.list())
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <ResourceSelectorProvider accessToken={accessToken} organization={organization}>
      {(resourceSelectorCtx) => {
        const selectedParentResource = resourceSelectorCtx.state.selectedResource
        const showUploadInput = selectedParentResource || skipParentResource
        return (
          <div>
            <div className="container px-3 py-4">
              <h1 className="text-xl pb-2 font-bold">New upload {resourceType}</h1>

              <ParentResourceSelector resourceType={resourceType} />

              {showUploadInput ? (
                <Input
                  resourceType={resourceType}
                  onDataReady={setImportCreateValue}
                  onDataResetRequest={() => setImportCreateValue(undefined)}
                  hasParentResource={Boolean(selectedParentResource?.id)}
                />
              ) : null}

              {importCreateValue && importCreateValue.length > 0 ? (
                <ImportPreviewTable rows={importCreateValue as []} />
              ) : null}

              {importCreateValue && importCreateValue.length > 0 ? (
                <button
                  className="btn"
                  onClick={() => {
                    createImportTask(selectedParentResource?.id)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Create import task"}
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
