import { ImportDetailsProvider } from '#components/Details/Provider'
import { ImportedResourceType } from '#components/Details/ImportedResourceType'
import { ImportDate } from '#components/Details/ImportDate'
import { useTokenProvider } from '#components/TokenProvider'
import { appRoutes } from '#data/routes'
import { useLocation, useRoute } from 'wouter'
import { Label } from '#ui/Label'
import { ImportCount } from '#components/Details/ImportCount'
import { ImportDownloadLogAsFile } from '#components/Details/ImportDownloadLogAsFile'
import { ImportDownloadSourceFile } from '#components/Details/ImportDownloadSourceFile'
import { RowDetail } from '#components/Details/RowDetail'
import { ImportStatusBadge } from '#components/Details/ImportStatusBadge'
import { formatDate } from '#utils/date'
import { ImportParentResource } from '#components/Details/ImportParentResource'
import { Button } from '#ui/Button'
import { PageLayout } from '#components/ui/PageLayout'
import { ErrorNotFound } from '#components/ErrorNotFound'

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
    <ImportDetailsProvider sdkClient={sdkClient} importId={importId}>
      {({ state: { isLoading, isDeleting, data }, deleteImport }) =>
        isLoading ? (
          <div className='opacity-0'>Loading</div>
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
                  <ImportDownloadSourceFile className='text-sm font-bold text-primary hover:underline' />
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

            <h4 className='text-[18px] font-semibold mb-4'>Details</h4>
            <div className='mb-10'>
              <RowDetail label='ID'>{data.id}</RowDetail>
              <RowDetail label='Resource type'>
                <ImportedResourceType />
              </RowDetail>
              {data.parent_resource_id != null && data.resource_type != null ? (
                <RowDetail label='Parent resource'>
                  <ImportParentResource
                    sdkClient={sdkClient}
                    parentResourceId={data.parent_resource_id}
                    childResourceType={data.resource_type}
                  />
                </RowDetail>
              ) : null}
              {data.status != null ? (
                <RowDetail label='Status'>
                  <ImportStatusBadge job={data} />
                </RowDetail>
              ) : null}
              {data.completed_at != null ? (
                <RowDetail label='Completed at'>
                  {formatDate(data.completed_at, true)}
                </RowDetail>
              ) : null}
              {data.updated_at != null && data.completed_at == null ? (
                <RowDetail label='Last update'>
                  {formatDate(data.updated_at, true)}
                </RowDetail>
              ) : null}
            </div>

            <div className='mb-14 flex justify-start'>
              <Button
                variant='danger'
                size='small'
                disabled={isDeleting}
                onClick={() => {
                  void deleteImport().then((success) => {
                    success && setLocation(appRoutes.list.makePath())
                  })
                }}
              >
                Delete
              </Button>
            </div>
          </PageLayout>
        )
      }
    </ImportDetailsProvider>
  )
}

export default DetailsPage
