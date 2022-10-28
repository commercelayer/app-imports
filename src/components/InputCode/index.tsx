import { InputTextArea } from '#ui/InputTextArea'
import { ImportCreate } from '@commercelayer/sdk'
import { isEmpty } from 'lodash-es'
import { useEffect, useState } from 'react'

interface Props {
  onDataReady: (jsonInput: ImportCreate['inputs']) => void
  onDataResetRequest: () => void
}

export function InputCode({
  onDataReady,
  onDataResetRequest
}: Props): JSX.Element {
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(
    function parseValueAsJson() {
      setErrorMessage('')
      if (isEmpty(value)) {
        onDataResetRequest()
        return
      }
      try {
        const json = JSON.parse(value)
        const importCreate = json.data.attributes
          .inputs as ImportCreate['inputs']
        onDataReady(importCreate)
      } catch (e) {
        onDataResetRequest()
        setErrorMessage('Invalid JSON')
      }
    },
    [value]
  )

  return (
    <div>
      <InputTextArea
        placeholder='Paste your json'
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {isEmpty(errorMessage) ? null : (
        <div className='text-sm text-red-500 px-2'>{errorMessage}</div>
      )}
    </div>
  )
}
