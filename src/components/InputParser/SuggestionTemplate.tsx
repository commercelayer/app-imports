import { A } from '#components/ui/A'
import { InputHelperText } from '#components/ui/InputHelperText'
import { AllowedResourceType } from 'App'
import { downloadTemplateAsCsvFile } from './templates'

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
