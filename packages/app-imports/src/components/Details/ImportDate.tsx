import { useImportDetailsContext } from '#components/Details/Provider'
import { formatDate } from '#utils/date'

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

  if (data == null) {
    return null
  }
  return (
    <span {...props}>
      {prefixText} {formatDate(data[atType], includeTime)}
    </span>
  )
}
