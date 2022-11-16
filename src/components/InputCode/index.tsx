import { ErrorBoundary } from '#components/ErrorBoundary'
import { ImportCreate } from '@commercelayer/sdk'
import { isEmpty } from 'lodash-es'
import { useEffect, useState } from 'react'

interface Props {
  onDataReady: (jsonInput: ImportCreate['inputs']) => void
  onDataResetRequest: () => void
}

export function InputCode(props: Props): JSX.Element {
  const [renderKey, setRenderKey] = useState<number | undefined>(undefined)
  return (
    <ErrorBoundary
      errorDescription='We could not parse your input. Please try again.'
      onRetry={() => {
        setRenderKey(new Date().getTime())
      }}
      key={renderKey}
    >
      <InputCodeComponent {...props} />
    </ErrorBoundary>
  )
}

function InputCodeComponent({
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
        onChange={(e) => setValue(e.currentTarget.value)}
        onBlur={() => {
          setValue((val) => prettifyJson(val))
        }}
        className='bg-black text-white font-semibold text-xs font-mono h-72 p-3 w-full rounded-md outline-none'
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
