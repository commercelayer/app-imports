import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import { parse } from "papaparse"
import { FC, useState, useEffect } from "react"
import { ZodIssue } from "zod"

import { adapters } from "./adapters"
import { parsers, isMakeSchemaFn } from "./schemas"

type Props = {
  hasParentResource?: boolean
  onDataReady: (inputs?: ImportCreate["inputs"]) => void
  onDataResetRequest: () => void
  resourceType: AllowedResourceType
}

export const Input: FC<Props> = ({ onDataReady, onDataResetRequest, resourceType, hasParentResource = false }) => {
  const [isParsing, setIsParsing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [errorList, setErrorList] = useState<ZodIssue[]>()
  const [file, setFile] = useState<File | null>(null)

  const resetErrorUi = () => {
    setErrorMessage("")
    setErrorList([])
  }

  useEffect(() => {
    onDataResetRequest()
    resetErrorUi()
  }, [file])

  const loadAndParseCSV = async (file: File) => {
    setIsParsing(true)
    resetErrorUi()

    parse(file, {
      header: true,
      skipEmptyLines: true,
      transform: (value) => {
        return value || undefined
      },
      error: () => {
        setIsParsing(false)
        setErrorMessage("Unable to load CSV file, it does not match the template")
      },
      complete: async ({ data }) => {
        const parser = parsers[resourceType]
        const csvRows = data.slice(0, 2000)
        const parsedResources = isMakeSchemaFn(parser)
          ? parser({ hasParentResource }).safeParse(csvRows)
          : parser.safeParse(csvRows)

        if (!parsedResources.success) {
          setErrorList(parsedResources.error.errors)
          setErrorMessage("We have found some errors for some important fields")
          setIsParsing(false)
          return
        }
        onDataReady(adapters[resourceType](parsedResources.data))
        setIsParsing(false)
      },
    })
  }

  const loadAndParseJson = async (file: File) => {
    setIsParsing(true)
    setErrorMessage("")
    try {
      const json = JSON.parse(await file.text())
      // TODO: validate json schema against openapi?
      onDataReady(json as ImportCreate["inputs"])
    } catch {
      setErrorMessage("Invalid json file")
    } finally {
      setIsParsing(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        disabled={isParsing}
        onChange={(e) => {
          if (e.target.files && !isParsing) {
            setFile(e.target.files[0])
          }
        }}
      />
      {file ? (
        <button
          className="btn"
          disabled={!file || isParsing}
          onClick={() => {
            if (!file) {
              return
            }

            switch (file.type) {
              case "text/csv":
                loadAndParseCSV(file)
                return

              case "application/json":
                loadAndParseJson(file)
                return

              default:
                setErrorMessage("Invalid format")
            }
          }}
        >
          {isParsing ? "loading" : "load file"}
        </button>
      ) : null}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {errorList && errorList.length ? (
        <div className="text-red-500">
          {errorList.slice(0, 5).map((issue, idx) => (
            <div key={idx}>
              Row {issue.path.join(" - ")} {issue.message}
            </div>
          ))}
          {errorList.length > 5 ? "We found other errors not listed here" : null}
        </div>
      ) : null}
    </div>
  )
}
