import { useImportDetailsContext } from '#components/Details/Provider'
import { formatResourceName } from '@commercelayer/app-elements'
import { type ListableResourceType } from '@commercelayer/sdk/lib/cjs/api'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export function ImportedResourceType(props: Props): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()

  if (data == null) {
    return null
  }

  return (
    <span {...props}>
      {data?.resource_type != null
        ? formatResourceName({
            resource: data.resource_type as ListableResourceType,
            count: 'plural',
            format: 'title'
          })
        : '-'}
    </span>
  )
}
