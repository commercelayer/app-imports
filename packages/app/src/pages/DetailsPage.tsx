import { ImportDetailsProvider } from '#components/Details/Provider'
import { ImportedResourceType } from '#components/Details/ImportedResourceType'
import { ImportDate } from '#components/Details/ImportDate'
import { appRoutes } from '#data/routes'
import { Link, useLocation, useRoute } from 'wouter'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { ImportReport } from '#components/Details/ImportReport'
import { ImportDetails } from '#components/Details/ImportDetails'
import {
  Button,
  useTokenProvider,
  PageSkeleton,
  PageLayout,
  Spacer,
  EmptyState,
  useCoreSdkProvider
} from '@commercelayer/app-elements'
import { ImportErrors } from '#components/Details/ImportErrors'

const DetailsPage = (): JSX.Element | null => {
  const {
    canUser,
    settings: { mode }
  } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_, setLocation] = useLocation()
  const [_match, params] = useRoute<{ importId?: string }>(
    appRoutes.details.path
  )
  const importId = params == null ? null : params.importId

  if (importId == null || !canUser('read', 'imports')) {
    return (
      <PageLayout
        title='Importaciones'
        navigationButton={{
          label: 'Back',
          icon: 'arrowLeft',
          onClick: () => {
            setLocation(appRoutes.list.makePath())
          }
        }}
        mode={mode}
      >
        <EmptyState
          title='Not authorized'
          action={
            <Link href={appRoutes.list.makePath()}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  if (sdkClient == null) {
    return <PageSkeleton layout='details' hasHeaderDescription />
  }

  return (
    <ImportDetailsProvider sdkClient={sdkClient} importId={importId}>
      {({ state: { isLoading, data } }) =>
        isLoading ? (
          <PageSkeleton layout='details' hasHeaderDescription />
        ) : data == null ? (
          <ErrorNotFound />
        ) : (
          <PageLayout
            title={<ImportedResourceType />}
            mode={mode}
            description={
              <ImportDate
                atType='created_at'
                prefixText='Importado en '
                includeTime
              />
            }
            navigationButton={{
              label: 'Importaciones',
              icon: 'arrowLeft',
              onClick: () => {
                setLocation(appRoutes.list.makePath())
              }
            }}
          >
            <Spacer bottom='12'>
              <ImportReport />
            </Spacer>

            {data?.errors_count !== null &&
              data?.errors_count !== undefined &&
              data?.errors_count > 0 && (
                <Spacer bottom='12'>
                  <ImportErrors />
                </Spacer>
              )}

            <Spacer bottom='12'>
              <ImportDetails sdkClient={sdkClient} />
            </Spacer>
          </PageLayout>
        )
      }
    </ImportDetailsProvider>
  )
}

export default DetailsPage
