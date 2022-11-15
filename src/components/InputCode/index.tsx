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
  const [errorMessage, setErrorMessage] = useState<string | null>()

  useEffect(
    function parseValueAsJson() {
      setErrorMessage(null)
      if (isEmpty(value)) {
        onDataResetRequest()
        return
      }
      try {
        const json = JSON.parse(value)
        const importCreate = json.inputs as ImportCreate['inputs']
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
      <textarea
        data-gramm='false'
        placeholder={preparePlacehoder()}
        value={value}
        onChange={(e) => setValue(prettifyJson(e.currentTarget.value))}
        onBlur={() => {
          setValue((val) => prettifyJson(val))
        }}
        className='bg-gray-700 text-white font-semibold text-sm font-mono h-52 p-3 w-full border border-gray-200 rounded-md'
      />
      {errorMessage !== null ? (
        <div className='text-sm text-red-500 px-2'>{errorMessage}</div>
      ) : null}
    </div>
  )
}

function preparePlacehoder(): string {
  const content = JSON.stringify(
    {
      inputs: [
        {
          code: 'ABC',
          name: 'Foo'
        }
      ]
    },
    null,
    2
  )
  return `Example: \n${content}`
}

function prettifyJson(maybeJsonString: string): string {
  try {
    return JSON.stringify(JSON.parse(maybeJsonString), null, 2)
  } catch {
    return maybeJsonString
  }
}
