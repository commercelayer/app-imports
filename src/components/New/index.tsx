import { CommerceLayerClient, ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import { useRouter } from "next/router"
import { FC, useState } from "react"

import { ImportPreviewTable } from "#components/ImportPreviewTable"
import { Input } from "#components/Input"

type Props = {
  cl: CommerceLayerClient
  resourceType: AllowedResourceType
}

export const NewImport: FC<Props> = ({ cl, resourceType }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [importCreateValue, setImportCreateValue] = useState<ImportCreate | undefined>(undefined)

  const createImport = async () => {
    if (!importCreateValue) {
      return
    }

    setIsLoading(true)
    try {
      await cl.imports.create(importCreateValue)
      router.push("/")
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-3 py-4">
      <h1 className="text-xl pb-2 font-bold">New upload</h1>
      <Input resourceType={resourceType} onCsvDataReady={setImportCreateValue} />

      {importCreateValue?.inputs && importCreateValue.inputs.length > 0 ? (
        <div>
          <ImportPreviewTable rows={importCreateValue.inputs as []} />
          <button className="btn" onClick={createImport} disabled={isLoading}>
            {isLoading ? "Loading..." : "Create import task"}
          </button>
        </div>
      ) : null}
    </div>
  )
}
