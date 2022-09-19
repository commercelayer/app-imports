import { useAuthProvider } from '#components/AuthProvider'
import { List } from '#components/List'
import { useEffect } from 'react'

function ListPage (): JSX.Element {
  const { sdkClient } = useAuthProvider()

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
