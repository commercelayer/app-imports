import { ImportDetailsProvider } from '#components/Details/Provider'
import { PageHeading } from '#components/PageHeading'
import { useTokenProvider } from '#components/TokenProvider'
import { Container } from '#components/ui/Container'
import { showResourceNiceName } from '#data/resources'
import { appRoutes } from '#data/routes'
import { formatDate } from '#utils/date'
import { useLocation, useRoute } from 'wouter'

const DetailsPage = (): JSX.Element => {
  const { sdkClient } = useTokenProvider()
  const [_, setLocation] = useLocation()
  const [_match, params] = useRoute(appRoutes.details.path)
  const importId = params == null ? null : params.importId

  if (importId == null) {
    return <div>Missing import ID</div>
  }

  if (sdkClient == null) {
    return <div>Waiting for sdk client</div>
  }

  return (
    <Container>
      <ImportDetailsProvider sdkClient={sdkClient} importId={importId}>
        {({ state: { isLoading, data } }) =>
          isLoading ? (
            <div>Loading</div>
          ) : data == null ? (
            <div>no data</div>
          ) : (
            <div>
              <PageHeading
                title={showResourceNiceName(data.resource_type)}
                description={`Imported on ${formatDate(data.created_at, true)}`}
                onGoBack={() => {
                  setLocation(appRoutes.list.makePath())
                }}
              />
            </div>
          )
        }
      </ImportDetailsProvider>
    </Container>
  )
}

export default DetailsPage
