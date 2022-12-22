import { AllowedResourceType } from 'App'
import { downloadTemplateAsCsvFile } from './templates'
import { A, InputHelperText } from '@commercelayer/core-app-elements'

interface Props {
  resourceType: AllowedResourceType
}

export function SuggestionTemplate({ resourceType }: Props): JSX.Element {
  return (
    <InputHelperText icon='bulb'>
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
    </InputHelperText>
  )
}
