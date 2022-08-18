import type { NextPage } from "next"

import { List } from "#components/List"
import { useSettings } from "#components/SettingsProvider"

const Home: NextPage = () => {
  const { sdkClient, settings } = useSettings()

  if (!settings || !sdkClient) {
    return <div>Loading</div>
  }

  return (
    <div>
      <List sdkClient={sdkClient} />
    </div>
  )
}

export default Home
