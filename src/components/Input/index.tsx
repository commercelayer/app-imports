import { isFalsy } from '#utils/isFalsy'
import { ImportCreate } from '@commercelayer/sdk'
import { AllowedResourceType } from 'App'
import { parse } from 'papaparse'
import { FC, useState, useEffect } from 'react'
import { ZodIssue } from 'zod'

import { adapters } from './adapters'
import { parsers, isMakeSchemaFn } from './schemas'

interface Props {
  hasParentResource?: boolean
  onDataReady: (inputs?: ImportCreate['inputs']) => void
  onDataResetRequest: () => void
  resourceType: AllowedResourceType
}

export const Input: FC<Props> = ({ onDataReady, onDataResetRequest, resourceType, hasParentResource = false }) => {
  const [isParsing, setIsParsing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorList, setErrorList] = useState<ZodIssue[]>()
  const [file, setFile] = useState<File | null>(null)

  const resetErrorUi = (): void => {
    setErrorMessage('')
    setErrorList([])
  }

  useEffect(() => {
    onDataResetRequest()
    resetErrorUi()
  }, [file])

  const loadAndParseCSV = async (file: File): Promise<void> => {
    setIsParsing(true)
    resetErrorUi()

    parse(file, {
      header: true,
      skipEmptyLines: true,
      transform: (value) => {
        return isFalsy(value) ? undefined : value
      },
      error: () => {
        setIsParsing(false)
        setErrorMessage('Unable to load CSV file, it does not match the template')
      },
      complete: async ({ data }) => {
        const parser = parsers[resourceType]
        const csvRows = data.slice(0, 2000)
        const parsedResources = isMakeSchemaFn(parser)
          ? parser({ hasParentResource }).safeParse(csvRows)
          : parser.safeParse(csvRows)

        if (!parsedResources.success) {
          setErrorList(parsedResources.error.errors)
          setErrorMessage('We have found some errors for some important fields')
          setIsParsing(false)
          return
        }
        onDataReady(adapters[resourceType](parsedResources.data))
        setIsParsing(false)
      }
    })
  }

  const loadAndParseJson = async (file: File): Promise<void> => {
    setIsParsing(true)
    setErrorMessage('')
    try {
      const json = JSON.parse(await file.text())
      onDataReady(json as ImportCreate['inputs'])
    } catch {
      setErrorMessage('Invalid json file')
    } finally {
      setIsParsing(false)
    }
  }

  return (
    <div>
      <input
        type='file'
        disabled={isParsing}
        onChange={(e) => {
          if ((e.target.files != null) && !isParsing) {
            setFile(e.target.files[0])
          }
        }}
      />
      {(file != null)
        ? (
          <button
            className='btn'
            disabled={isFalsy(file) || isParsing}
            onClick={() => {
              if (isFalsy(file)) {
                return
              }

              switch (file.type) {
                case 'text/csv':
                  void loadAndParseCSV(file)
                  return

                case 'application/json':
                  void loadAndParseJson(file)
                  return

                default:
                  setErrorMessage('Invalid format')
              }
            }}
          >
            {isParsing ? 'loading' : 'load file'}
          </button>
          )
        : null}
      {typeof errorMessage === 'string' && <div className='text-red-500'>{errorMessage}</div>}
      {(errorList != null) && (errorList.length > 0)
        ? (
          <div className='text-red-500'>
            {errorList.slice(0, 5).map((issue, idx) => (
              <div key={idx}>
                Row {issue.path.join(' - ')} {issue.message}
              </div>
            ))}
            {errorList.length > 5 ? 'We found other errors not listed here' : null}
          </div>
          )
        : null}
    </div>
  )
}
