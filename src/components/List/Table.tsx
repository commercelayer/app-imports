import { Import } from "@commercelayer/sdk"
import Link from "next/link"
import { FC } from "react"

import { useListContext } from "#components/List/Provider"
import { appRoutes } from "#data/routes"

type ImportRow = Pick<
  Import,
  "id" | "resource_type" | "status" | "created_at" | "completed_at" | "inputs_size" | "processed_count" | "errors_count"
>

export const Table: FC = () => {
  const {
    state: { list },
    deleteImport,
    deleteQueue,
  } = useListContext()

  if (!list) {
    return null
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {rowKeys.map((heading, idx) => (
            <th key={idx}>{row[heading]}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            {rowKeys.map((k) => (
              <td key={k}>{formatCellData(k, item[k])}</td>
            ))}
            <td>
              <div className="flex gap-2">
                <Link href={appRoutes.details(item.id)}>View</Link>
                <button
                  disabled={deleteQueue.has(item.id)}
                  onClick={() => {
                    if (confirm(`Are youre sure?`)) {
                      deleteImport(item.id)
                    }
                  }}
                >
                  {deleteQueue.has(item.id) ? "Deleting" : "Delete"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const row: Record<keyof ImportRow, string> = {
  id: "ID",
  resource_type: "Resource",
  status: "Status",
  created_at: "Created At",
  completed_at: "Completed At",
  inputs_size: "Found",
  processed_count: "Imported",
  errors_count: "Skipped (errors)",
}

const rowKeys = Object.keys(row) as (keyof ImportRow)[]

const formatCellData = (key: keyof ImportRow, value?: string | number) => {
  if (!value) {
    return "-"
  }

  switch (key) {
    case "created_at":
      return new Date(value).toLocaleString()
    case "completed_at":
      return new Date(value).toLocaleString()
    default:
      return value
  }
}
