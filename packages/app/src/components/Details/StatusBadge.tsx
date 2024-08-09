import { Badge, type BadgeProps } from '@commercelayer/app-elements'
import { type Import } from '@commercelayer/sdk'

interface Props {
  job: Import
}

export function StatusBadge({ job }: Props): JSX.Element {
  const errorsCount =
    job.errors_count != null && job.errors_count > 0
      ? job.errors_count
      : undefined

  const { variant, label } = getUiStatusVariant(job.status, errorsCount)

  return (
    <div>
      <Badge variant={variant}>{label}</Badge>
    </div>
  )
}

function getUiStatusVariant(
  apiStatus?: string,
  errorsCount?: number
): {
  variant: BadgeProps['variant']
  label: string
} {
  if (apiStatus === 'in_progress') {
    return {
      variant: 'primary',
      label: 'en progreso'
    }
  }

  if (apiStatus === 'interrupted') {
    return {
      variant: 'danger',
      label: 'interrumpida'
    }
  }

  if (apiStatus === 'completed' && errorsCount != null) {
    return {
      variant: 'warning',
      label: 'completada con errores'
    }
  }

  if (apiStatus === 'completed') {
    return {
      variant: 'success',
      label: 'completada'
    }
  }

  if (apiStatus === 'pending') {
    return {
      variant: 'secondary',
      label: 'pendiente'
    }
  }

  return {
    variant: 'secondary',
    label: apiStatus ?? 'N/A'
  }
}
