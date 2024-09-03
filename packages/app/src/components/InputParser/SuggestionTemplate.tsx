import { type AllowedResourceType } from 'App'
import { downloadTemplateAsCsvFile } from './templates'
import { Button, Hint } from '@commercelayer/app-elements'

interface Props {
  resourceType: AllowedResourceType
}

export function SuggestionTemplate({ resourceType }: Props): JSX.Element {
  return (
    <Hint icon='lightbulbFilament'>
      Usa nuestra{' '}
      <Button
        type='button'
        variant='link'
        onClick={() => {
          downloadTemplateAsCsvFile({
            resourceType
          })
        }}
      >
        Plantilla CSV
      </Button>{' '}
      para evitar errores de formato.
    </Hint>
  )
}
