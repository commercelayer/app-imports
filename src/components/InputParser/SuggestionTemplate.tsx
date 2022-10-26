import { AllowedResourceType } from 'App'
import { LightbulbFilament } from 'phosphor-react'
import { downloadTemplateAsCsvFile } from './templates'

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
            downloadTemplateAsCsvFile({
              resourceType
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
