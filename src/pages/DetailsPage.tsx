import { Details } from '#components/Details'
import { useSettings } from '#components/SettingsProvider'
import { isFalsy } from '#utils/isFalsy'
import { useRoute } from 'wouter'

const DetailsPage = (): JSX.Element => {
  const { settings } = useSettings()

  if (isFalsy(settings)) {
    return <div>Loading</div>
  }

  const params = useRoute('/details/:importId')[1]
  const importId = params == null ? null : params.importId

  if (importId == null) {
    return <div>Missing import ID</div>
  }

  return (
    <div>
      <div className='container px-3 py-4'>
        <h1 className='text-xl pb-2 font-bold'>Import details</h1>
        <Details accessToken={settings.accessToken} organization={settings.organization} importId={importId} />
      </div>
    </div>
  )
}

export default DetailsPage
