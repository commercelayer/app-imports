import { useImportDetailsContext } from '#components/Details/Provider'
import { isEmpty } from 'lodash-es'

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  logType: 'errors_log' | 'warnings_log'
  label?: string
}

export function ImportDownloadLogAsFile({
  logType,
  label = 'Download log',
  ...props
}: Props): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()
  const log = data?.[logType]

  if (data == null || log == null) {
    return null
  }

  return (
    <button
      onClick={() => {
        downloadJsonAsFile({
          json: log,
          filename: `${data.id}_${data.created_at}_${logType}.json`
        })
      }}
      {...props}
    >
      {label}
    </button>
  )
}

// create a fake download element on the fly to avoid to pollute the dom with a large data-uri string
const downloadJsonAsFile = ({
  json,
  filename
}: {
  json?: object
  filename: string
}): void => {
  if (isEmpty(json)) {
    json = {}
  }
  const dataUri =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))
  const tag = document.createElement('a')
  tag.setAttribute('href', dataUri)
  tag.setAttribute('download', filename)
  document.body.appendChild(tag)
  tag.click()
  tag.remove()
}
