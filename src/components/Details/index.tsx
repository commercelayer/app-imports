import { isFalsy } from '#utils/isFalsy'
import { Import, CommerceLayerClient } from '@commercelayer/sdk'
import { FC, useEffect, useState } from 'react'

interface Props {
  sdkClient: CommerceLayerClient
  importId: string
}

export const Details: FC<Props> = ({ sdkClient, importId }) => {
  const [importDetails, setImportDetails] = useState<Import | undefined | false>(undefined)

  useEffect(() => {
    if (typeof importId === 'string' && importId.length > 0 && sdkClient != null) {
      sdkClient.imports
        .retrieve(importId)
        .then(setImportDetails)
        .catch(() => setImportDetails(false))
    }
  }, [importId, sdkClient])

  if (importDetails === false) {
    return <div>not found</div>
  }

  if (importDetails == null) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>#{importId}</div>
      <div>status: {importDetails.status}</div>
      <div>found: {importDetails.inputs?.length}</div>
      <div>imported: {importDetails.processed_count}</div>
      {isFalsy(importDetails.errors_count)
        ? null
        : (
          <div className='flex gap-2'>
            <div>errors: {importDetails.errors_count}</div>
            {(isFalsy(importDetails.errors_log))
              ? (
                <button
                  className='font-bold underline'
                  onClick={() => {
                    downloadJsonAsFile({
                      json: importDetails.errors_log,
                      filename: `${importDetails.id}_${importDetails.created_at}_errors.json`
                    })
                  }}
                >
                  download errors log
                </button>)
              : null}
          </div>
          )}
    </div>
  )
}

// create a fake download element on the fly to avoid to pollute the dom with a large data-uri string
const downloadJsonAsFile = ({ json, filename }: { json?: object, filename: string }): void => {
  if (isFalsy(json)) {
    json = {}
  }
  const dataUri = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))
  const tag = document.createElement('a')
  tag.setAttribute('href', dataUri)
  tag.setAttribute('download', filename)
  document.body.appendChild(tag)
  tag.click()
  tag.remove()
}
