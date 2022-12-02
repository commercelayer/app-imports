import { useImportDetailsContext } from '#components/Details/Provider'
import { showResourceNiceName } from '#data/resources'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export function ImportedResourceType(props: Props): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()

  if (data == null) {
    return null
  }

  return <span {...props}>{showResourceNiceName(data?.resource_type)}</span>
}
