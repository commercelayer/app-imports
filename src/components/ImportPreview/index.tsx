import { ErrorBoundary } from '#components/ErrorBoundary'
import cn from 'classnames'
import { extractHeaders } from './extractHeaders'
import { TableCell } from './TableCell'
import { TableHeader } from './TableHeader'

interface Props {
  data: Array<Record<string, string | Object>>
  limit: number
  className?: string
}

function ImportPreviewComponent({
  className,
  data,
  limit
}: Props): JSX.Element {
  const headings = extractHeaders(data)
  const rows = data.slice(0, limit)
  const othersCount = rows.length - limit

  return (
    <div className={cn('overflow-x-auto pb-3', className)}>
      <h2 className='font-semibold mb-2'>Preview</h2>
      <table className='w-full rounded-sm overflow-hidden'>
        <thead>
          <tr>
            {headings.map((heading) => (
              <TableHeader key={heading} value={heading} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`r${rowIndex}`} className='border-b'>
              {headings.map((cell, cellIndex) => (
                <TableCell
                  key={`r${rowIndex}_${cellIndex}`}
                  value={row[cell]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {}
      {othersCount > 0 ? (
        <div className='py-4 font-bold'>and others {othersCount} records</div>
      ) : null}
    </div>
  )
}

export function ImportPreview(props: Props): JSX.Element {
  return (
    <ErrorBoundary
      errorTitle='We were unable to show the preview'
      errorDescription='Try to upload a different file'
    >
      <ImportPreviewComponent {...props} />
    </ErrorBoundary>
  )
}
