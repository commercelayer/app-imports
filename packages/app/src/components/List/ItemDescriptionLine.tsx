import { getProgressPercentage } from '#utils/getProgressPercentage'
import { formatDate, useTokenProvider } from '@commercelayer/app-elements'
import { type Import } from '@commercelayer/sdk'

interface Props {
  job: Import
}

export function DescriptionLine({ job }: Props): JSX.Element {
  const { user } = useTokenProvider()

  const errorsCount =
    job.errors_count != null && job.errors_count > 0
      ? job.errors_count
      : undefined
  const percentage = getProgressPercentage(job)
  return (
    <>
      {job.status === 'pending' ? (
        <div>Pendiente</div>
      ) : job.status === 'in_progress' ? (
        percentage.value === 100 ? (
          // import job remains few seconds at 100% with status in_progress
          <span>Finalizando...</span>
        ) : (
          percentage.formatted
        )
      ) : job.status === 'interrupted' ? (
        <div>
          Importación falló{' '}
          {formatDate({ isoDate: job.updated_at, timezone: user?.timezone })}
        </div>
      ) : job.status === 'completed' ? (
        errorsCount != null ? (
          <div>
            Importada con {errorsCount} {errorsCount > 1 ? 'errores' : 'un error'}
          </div>
        ) : (
          <div>
            Importada el{' '}
            {job.completed_at != null &&
              formatDate({
                isoDate: job.completed_at,
                timezone: user?.timezone
              })}
          </div>
        )
      ) : (
        '-'
      )}
    </>
  )
}
