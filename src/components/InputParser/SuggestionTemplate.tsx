import { AllowedResourceType } from 'App'
import { LightbulbFilament } from 'phosphor-react'

interface Props {
  resourceType: AllowedResourceType
}

export function SuggestionTemplate({ resourceType }: Props): JSX.Element {
  return (
    <div className='flex gap-2 items-center'>
      <LightbulbFilament />
      <div className='text-sm'>
        Use our{' '}
        <button
          className='text-primary font-medium hover:underline'
          onClick={() => {
            downloadTemplateAsFile({
              fields: ['col1', 'col2'],
              filename: `${resourceType}_template.csv`
            })
          }}
        >
          CSV template
        </button>{' '}
        to avoid formatting errors.
      </div>
    </div>
  )
}

const downloadTemplateAsFile = ({
  fields,
  filename
}: {
  fields: string[]
  filename: string
}): void => {
  const dataUri = 'data:text/csv;charset=utf-8,' + fields.join(',')
  const tag = document.createElement('a')
  tag.setAttribute('href', dataUri)
  tag.setAttribute('download', filename)
  document.body.appendChild(tag)
  tag.click()
  tag.remove()
}
