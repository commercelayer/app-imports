import { Import } from '@commercelayer/sdk'
import { useListContext } from './Provider'

export function Items(): JSX.Element | null {
  const {
    state: { list }
  } = useListContext()

  if (list == null) {
    return null
  }

  return (
    <div>
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}

function Item({ item }: { item: Import }): JSX.Element {
  return (
    <div className='py-5 border-b border-gray-100'>
      <div>{item.id}</div>
      <div>{item.status}</div>
    </div>
  )
}
