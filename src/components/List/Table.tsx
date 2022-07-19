import { FC } from "react"

import { useListContext } from "#components/List/Provider"

export const Table: FC = () => {
  const {
    state: { list },
  } = useListContext()

  if (!list) {
    return null
  }

  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          {item.id} - {item.status} - {item.resource_type}
        </div>
      ))}
    </div>
  )
}
