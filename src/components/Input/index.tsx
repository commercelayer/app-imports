import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import { parse } from "papaparse"
import { FC, useState, useEffect } from "react"

import { adapters } from "./adapters"
import { parsers } from "./schemas"

type Props = {
  onCsvDataReady: (inputs?: ImportCreate) => void
  resourceType: AllowedResourceType
}

export const Input: FC<Props> = ({ onCsvDataReady, resourceType }) => {
  const [isParsing, setIsParsing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    setErrorMessage("")
  }, [file])

  const loadAndParseCSV = async (file: File) => {
    setIsParsing(true)
    setErrorMessage("")

    parse(file, {
      header: true,
      error: () => {
        setIsParsing(false)
        setErrorMessage("Unable to load CSV file")
      },
      complete: async ({ data }) => {
        const parsedResources = parsers[resourceType].safeParse(data.slice(0, 2000))
        if (!parsedResources.success) {
          // TODO: show errors from ZodError obj
          setErrorMessage("Invalid format")
          setIsParsing(false)
          return
        }
        onCsvDataReady(adapters[resourceType](parsedResources.data))
        setIsParsing(false)
      },
    })
  }

  const loadAndParseJson = async (file: File) => {
    setIsParsing(true)
    setErrorMessage("")
    try {
      const json = JSON.parse(await file.text())
      // TODO: validate json schema againt openapi?
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
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  )
}
