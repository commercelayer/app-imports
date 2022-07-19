import { Import } from "@commercelayer/sdk"
import { FC } from "react"

import { useListContext } from "#components/List/Provider"

const dataToShow: (keyof Import)[] = [
  "id",
  "resource_type",
  "status",
  "created_at",
  "completed_at",
  "inputs_size",
  "processed_count",
  "errors_count",
]

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
          {dataToShow.map((heading, idx) => (
            <th key={idx}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            {dataToShow.map((k) => (
              <td key={k}>{item[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
