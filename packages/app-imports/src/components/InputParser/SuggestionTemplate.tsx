import { AllowedResourceType } from 'App'
import { downloadTemplateAsCsvFile } from './templates'
import { A, Hint } from '@commercelayer/app-elements'

interface Props {
  resourceType: AllowedResourceType
}

export function SuggestionTemplate({ resourceType }: Props): JSX.Element {
  return (
    <Hint icon='bulb'>
      Use our{' '}
      <A
        onClick={() => {
          downloadTemplateAsCsvFile({
            resourceType
          })
        }}
      >
        CSV template
      </A>{' '}
      to avoid formatting errors.
    </Hint>
  )
}
