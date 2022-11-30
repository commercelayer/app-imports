import { ImportDetailsProvider } from '#components/Details/Provider'
import { ImportedResourceType } from '#components/Details/ImportedResourceType'
import { ImportDate } from '#components/Details/ImportDate'
import { useTokenProvider } from '#components/TokenProvider'
import { appRoutes } from '#data/routes'
import { useLocation, useRoute } from 'wouter'
import { PageLayout } from '#ui/PageLayout'
import { PageSkeleton } from '#ui/PageSkeleton'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { ImportReport } from '#components/Details/ImportReport'
import { ImportDetails } from '#components/Details/ImportDetails'

const DetailsPage = (): JSX.Element | null => {
  const { sdkClient } = useTokenProvider()
  const [_, setLocation] = useLocation()
  const [_match, params] = useRoute(appRoutes.details.path)
  const importId = params == null ? null : params.importId

  if (importId == null) {
    return null
  }

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
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
            description={
              <ImportDate
                atType='created_at'
                prefixText='Imported on '
                includeTime
              />
            }
            onGoBack={() => {
              setLocation(appRoutes.list.makePath())
            }}
          >
            <ImportReport />

            <div className='mb-10'>
              <ImportDetails sdkClient={sdkClient} />
            </div>
          </PageLayout>
        )
      }
    </ImportDetailsProvider>
  )
}

export default DetailsPage
