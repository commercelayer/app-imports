import { List } from '#components/List'
import { useTokenProvider } from '#components/TokenProvider'
import { useEffect } from 'react'

function ListPage(): JSX.Element {
  const { sdkClient } = useTokenProvider()

  useEffect(() => {
    if (sdkClient == null) {
      return
    }
    void sdkClient.sku_list_items.list()
  }, [sdkClient])

  if (sdkClient == null) {
    return <div>Waiting for sdk client</div>
  }

  return (
    <div>
      <List sdkClient={sdkClient} />
    </div>
  )
}

export default ListPage
