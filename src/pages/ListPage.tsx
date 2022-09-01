import { List } from '#components/List'
import { useSettings } from '#components/SettingsProvider'

function ListPage (): JSX.Element {
  const { sdkClient, isLoading } = useSettings()

  if (isLoading || (sdkClient == null)) {
    return <div>Loading</div>
  }

  return (
    <div>
      <List sdkClient={sdkClient} />
    </div>
  )
}

export default ListPage
