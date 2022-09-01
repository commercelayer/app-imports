import { FC } from 'react'

interface Props {
  rows: Array<Record<string, string>>
}

const maxPreviewItems = 3

export const ImportPreviewTable: FC<Props> = ({ rows }) => {
  const headings = Object.keys(rows[0])
  const othersCount = rows.length - maxPreviewItems

  return (
    <div className='py-10'>
      <h2 className='text-lg'>Preview</h2>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading} className='py-3 px-2 bg-gray-300 '>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`r${rowIndex}`} className='border-b'>
              {Object.keys(row).map((cell, cellIndex) => (
                <td key={`r${rowIndex}_${cellIndex}`} className='py-3 px-2'>
                  <div className='h-20 w-32 overflow-hidden'>{row[cell]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {}
      {othersCount > 0 ? <div className='py-4 font-bold'>and others {othersCount} records</div> : null}
    </div>
  )
}
