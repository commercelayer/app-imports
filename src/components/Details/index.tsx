import CommerceLayer, { Import } from "@commercelayer/sdk"
import { FC, useEffect, useState } from "react"

type Props = {
  accessToken: string
  organization: string
  importId: string
}

export const Details: FC<Props> = ({ accessToken, organization, importId }) => {
  const [importDetails, setImportDetails] = useState<Import | undefined | false>(undefined)

  const cl = CommerceLayer({
    organization,
    accessToken,
  })

  useEffect(() => {
    if (importId) {
      cl.imports
        .retrieve(importId)
        .then(setImportDetails)
        .catch(() => setImportDetails(false))
    }
  }, [importId])

  if (importDetails === false) {
    return <div>not found</div>
  }

  if (!importDetails) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>#{importId}</div>
      <div>status: {importDetails.status}</div>
      <div>found: {importDetails.inputs?.length}</div>
      <div>imported: {importDetails.processed_count}</div>
      {importDetails.errors_count ? (
        <div className="flex gap-2">
          <div>errors: {importDetails.errors_count}</div>
          {importDetails.errors_log ? (
            <button
              className="font-bold underline"
              onClick={() => {
                downloadJsonAsFile({
                  json: importDetails.errors_log || {},
                  filename: `${importDetails.id}_${importDetails.created_at}_errors.json`,
                })
              }}
            >
              download errors log
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

// create a fake download element on the fly to avoid to pollute the dom with a large data-uri string
const downloadJsonAsFile = ({ json, filename }: { json: object; filename: string }) => {
  const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
  const tag = document.createElement("a")
  tag.setAttribute("href", dataUri)
  tag.setAttribute("download", filename)
  document.body.appendChild(tag)
  tag.click()
  tag.remove()
}
