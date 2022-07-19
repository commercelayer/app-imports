import type { NextPage } from "next"
import { useRouter } from "next/router"

import { Details } from "#components/Details"
import { useSettings } from "#components/SettingsProvider"

const ImportDetailsPage: NextPage = () => {
  const { settings } = useSettings()

  if (!settings) {
    return <div>Loading</div>
  }

  const { query } = useRouter()
  const importId = query.importId as string

  return (
    <div>
      <div className="container px-3 py-4">
        <h1 className="text-xl pb-2 font-bold">Import details</h1>
        <Details accessToken={settings.accessToken} organization={settings.organization} importId={importId} />
      </div>
    </div>
  )
}

export default ImportDetailsPage
