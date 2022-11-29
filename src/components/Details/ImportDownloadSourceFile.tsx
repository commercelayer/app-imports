import { useImportDetailsContext } from '#components/Details/Provider'

interface Props
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'children'
  > {
  label?: string
}

export function ImportDownloadSourceFile({
  label = 'Download file',
  ...props
}: Props): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()

  if (
    data?.attachment_url == null ||
    data?.processed_count == null ||
    data.processed_count === 0
  ) {
    return null
  }

  return (
    <a
      title={label}
      {...props}
      target='_blank'
      rel='noopener noreferral noreferrer'
      href={data.attachment_url}
    >
      {label}
    </a>
  )
}
