import { isEmpty } from 'lodash-es'

interface ApiReasonError {
  code: string
  detail: string
  status: string
  title: string
}

export function catchInvalidToken(event: PromiseRejectionEvent): boolean {
  const errors = event.reason?.errors as ApiReasonError[] | undefined
  return !isEmpty(errors) && Array.isArray(errors) && errors.length > 0
    ? errors.some((err) => err.code === 'INVALID_TOKEN')
    : false
}
