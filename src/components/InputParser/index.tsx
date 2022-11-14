import { Text } from '#components/ui/Text'
import { InputFile } from '#ui/InputFile'
import { ImportCreate } from '@commercelayer/sdk'
import { AllowedResourceType } from 'App'
import { isEmpty } from 'lodash-es'
import { parse } from 'papaparse'
import { FC, useState, useEffect } from 'react'
import { ZodIssue } from 'zod'

import { adapters } from './adapters'
import { parsers, isMakeSchemaFn } from './schemas'
import { SuggestionTemplate } from './SuggestionTemplate'

const importMaxSize = 10_000

interface Props {
  hasParentResource?: boolean
  onDataReady: (inputs?: ImportCreate['inputs']) => void
  onDataResetRequest: () => void
  resourceType: AllowedResourceType
}

export const InputParser: FC<Props> = ({
  onDataReady,
  onDataResetRequest,
  resourceType,
  hasParentResource = false
}) => {
  const [isParsing, setIsParsing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorList, setErrorList] = useState<ZodIssue[]>()
  const [file, setFile] = useState<File | null>(null)

  const resetErrorUi = (): void => {
    setErrorMessage('')
    setErrorList([])
  }

  const loadAndParseCSV = async (file: File): Promise<void> => {
    setIsParsing(true)
    resetErrorUi()

    parse(file, {
      header: true,
      skipEmptyLines: true,
      transform: (value) => {
        return isEmpty(value) ? undefined : value
      },
      error: () => {
        setIsParsing(false)
        setErrorMessage(
          'Unable to load CSV file, it does not match the template'
        )
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      complete: async ({ data }) => {
        const parser = parsers[resourceType]
        const csvRows = data.slice(0, importMaxSize)
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

  useEffect(
    function parseFileWhenReady() {
      if (file == null) {
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
          setErrorMessage('Invalid file format. Only CSV or JSON allowed.')
      }
    },
    [file]
  )

  useEffect(() => {
    onDataResetRequest()
    resetErrorUi()
  }, [file])

  return (
    <div>
      <div className='mb-4'>
        <InputFile
          className='mb-4'
          label='Select a csv or json to upload'
          onChange={(e) => {
            if (e.target.files != null && !isParsing) {
              setFile(e.target.files[0])
            }
          }}
          disabled={isParsing}
          progress={file != null ? 100 : 0}
        />
        {file == null ? (
          <SuggestionTemplate resourceType={resourceType} />
        ) : (
          <Text variant='info' size='small'>
            File uploaded:{' '}
            <Text variant='primary' tag='span'>
              {file.name}
            </Text>
          </Text>
        )}
      </div>

      <Text variant='danger' size='small' className='px-2'>
        {typeof errorMessage === 'string' && (
          <div className='mb-2'>{errorMessage}</div>
        )}
        {errorList != null && errorList.length > 0 ? (
          <div>
            {errorList.slice(0, 5).map((issue, idx) => (
              <p key={idx}>
                Row {issue.path[0]} - {issue.message}
              </p>
            ))}
            {errorList.length > 5 ? (
              <p>We found other errors not listed here</p>
            ) : null}
          </div>
        ) : null}
      </Text>
    </div>
  )
}
