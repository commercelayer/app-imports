import { PageHeading } from '#components/PageHeading'
import { ImportDetailsProvider } from '#components/Details/Provider'
import { ImportedResourceType } from '#components/Details/ImportedResourceType'
import { ImportDate } from '#components/Details/ImportDate'
import { useTokenProvider } from '#components/TokenProvider'
import { Container } from '#components/ui/Container'
import { appRoutes } from '#data/routes'
import { useLocation, useRoute } from 'wouter'
import { Label } from '#components/ui/Label'
import { ImportCount } from '#components/Details/ImportCount'
import { ImportDownloadLogAsFile } from '#components/Details/ImportDownloadLogAsFile'
import { ImportDownloadSourceFile } from '#components/Details/ImportDownloadSourceFile'

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
              />

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

              <h4 className='text-[18px] font-semibold mb-2'>Details</h4>
              <div className='border-t border-gray-100 py-4 px-3 flex gap-6'>
                <div>ID</div>
                <div>{data.id}</div>
              </div>
              <div className='border-t border-gray-100 py-4 px-3 flex gap-6'>
                <div>Resource type</div>
                <div>
                  <ImportedResourceType />
                </div>
              </div>
              <div className='border-t border-gray-100 py-4 px-3 flex gap-6'>
                <div>Status</div>
                <div>{data.status}</div>
              </div>
              <div className='border-t border-gray-100 py-4 px-3 flex gap-6'>
                <div>Parent resource</div>
                <div>{data.parent_resource_id}</div>
              </div>
            </div>
          )
        }
      </ImportDetailsProvider>
    </Container>
  )
}

export default DetailsPage
