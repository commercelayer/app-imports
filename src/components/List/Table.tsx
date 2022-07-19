import { Import } from "@commercelayer/sdk"
import { FC } from "react"

import { useListContext } from "#components/List/Provider"

type ImportRow = Pick<
  Import,
  "id" | "resource_type" | "status" | "created_at" | "completed_at" | "inputs_size" | "processed_count" | "errors_count"
>

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

export const Table: FC = () => {
  const {
    state: { list },
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
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            {rowKeys.map((k) => (
              <td key={k}>{item[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
