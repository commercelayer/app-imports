import { ImportDetailsProvider } from '#components/Details/Provider'
import { ImportedResourceType } from '#components/Details/ImportedResourceType'
import { ImportDate } from '#components/Details/ImportDate'
import { useTokenProvider } from '#components/TokenProvider'
import { appRoutes } from '#data/routes'
import { useLocation, useRoute } from 'wouter'
import { ImportCount } from '#components/Details/ImportCount'
import { ImportDownloadLogAsFile } from '#components/Details/ImportDownloadLogAsFile'
import { ImportDownloadSourceFile } from '#components/Details/ImportDownloadSourceFile'
import { DetailsRow } from '#ui/DetailsRow'
import { Label } from '#ui/Label'
import { PageLayout } from '#ui/PageLayout'
import { PageSkeleton } from '#ui/PageSkeleton'
import { StatusBadge } from '#components/Details/StatusBadge'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { RowParentResource } from '#components/Details/RowParentResource'
import { formatDate } from '#utils/date'
import { DetailsList } from '#components/ui/DetailsList'

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
    return <PageSkeleton layout='details' />
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
            <div className='border-t border-b border-gray-100 py-8 mb-14'>
              <div className='flex'>
                <div className='flex-1 flex flex-col items-start py-4 px-6'>
                  <Label className='font-sm text-gray-500'>
                    Record imported
                  </Label>
                  <ImportCount
                    type='processed_count'
                    className='font-semibold text-xl font-xl pt-1 pb-4'
                  />
                  <ImportDownloadSourceFile
                    label='Download CSV file'
                    className='text-sm font-bold text-primary hover:underline'
                  />
                </div>
                <div className='flex-1 flex flex-col items-start py-4 px-6 border-l border-gray-100'>
                  <Label className='font-sm text-gray-500'>Errors</Label>
                  <ImportCount
                    type='errors_count'
                    className='font-semibold text-xl font-xl pt-1 pb-4'
                  />
                  <ImportDownloadLogAsFile
                    logType='errors_log'
                    className='text-sm font-bold text-primary hover:underline'
                    label='View logs'
                  />
                </div>
              </div>
            </div>

            <DetailsList title='Details' className='mb-10'>
              <DetailsRow label='ID'>{data.id}</DetailsRow>
              <DetailsRow label='Resource type'>
                <ImportedResourceType />
              </DetailsRow>
              <RowParentResource sdkClient={sdkClient} />
              {data.status != null ? (
                <DetailsRow label='Status'>
                  <StatusBadge job={data} />
                </DetailsRow>
              ) : null}
              {data.completed_at != null ? (
                <DetailsRow label='Completed at'>
                  {formatDate(data.completed_at, true)}
                </DetailsRow>
              ) : null}
              {data.updated_at != null && data.completed_at == null ? (
                <DetailsRow label='Last update'>
                  {formatDate(data.updated_at, true)}
                </DetailsRow>
              ) : null}
            </DetailsList>
          </PageLayout>
        )
      }
    </ImportDetailsProvider>
  )
}

export default DetailsPage
