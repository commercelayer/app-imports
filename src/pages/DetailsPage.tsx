import { useAuthProvider } from '#components/AuthProvider'
import { Details } from '#components/Details'
import { useRoute } from 'wouter'

const DetailsPage = (): JSX.Element => {
  const { sdkClient } = useAuthProvider()

  if (sdkClient == null) {
    return <div>Waiting for sdk client</div>
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
        <Details sdkClient={sdkClient} importId={importId} />
      </div>
    </div>
  )
}

export default DetailsPage
