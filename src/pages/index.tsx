import type { NextPage } from "next"

import { List } from "#components/List"
import { useSettings } from "#components/SettingsProvider"

const Home: NextPage = () => {
  const { settings } = useSettings()

  if (!settings) {
    return <div>Loading</div>
  }

  return (
    <div>
      <List accessToken={settings.accessToken} organization={settings.organization} />
    </div>
  )
}

export default Home
