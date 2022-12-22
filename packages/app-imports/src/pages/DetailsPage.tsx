import { ImportDetailsProvider } from '#components/Details/Provider'
import { ImportedResourceType } from '#components/Details/ImportedResourceType'
import { ImportDate } from '#components/Details/ImportDate'
import { appRoutes } from '#data/routes'
import { useLocation, useRoute } from 'wouter'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { ImportReport } from '#components/Details/ImportReport'
import { ImportDetails } from '#components/Details/ImportDetails'
import {
  useTokenProvider,
  PageSkeleton,
  PageLayout,
  Spacer
} from '@commercelayer/core-app-elements'

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
