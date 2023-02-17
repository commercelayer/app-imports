import { useImportDetailsContext } from '#components/Details/Provider'
import { formatDate, useTokenProvider } from '@commercelayer/core-app-elements'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  atType:
    | 'completed_at'
    | 'created_at'
    | 'interrupted_at'
    | 'started_at'
    | 'updated_at'
  prefixText?: string
  includeTime?: boolean
}

export function ImportDate({
  atType,
  prefixText,
  includeTime,
  ...props
}: Props): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()

  const {
    settings: { timezone }
  } = useTokenProvider()

  if (data == null) {
    return null
  }
  return (
    <span {...props}>
      {prefixText} {formatDate(data[atType], includeTime, timezone)}
    </span>
  )
}
