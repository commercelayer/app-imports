import { getInfoFromJwt } from '#utils/getInfoFromJwt'
import { isProduction } from '#utils/isProduction'
import { getOrgSlugFromCurrentUrl } from './slug'

export function isTokenExpiredOrMissing({
  accessToken,
  compareTo
}: {
  accessToken?: string
  compareTo: Date
}): boolean {
  if (accessToken == null) {
    return true
  }

  const { exp } = getInfoFromJwt(accessToken)

  if (exp == null) {
    console.log('Missing exp')
    return true
  }

  const nowTime = Math.trunc(compareTo.getTime() / 1000)
  return nowTime > exp
}

export function isValidTokenForCurrentApp({
  accessToken,
  clientKind,
  currentApp
}: {
  accessToken: string
  clientKind: string
  currentApp: string
}): boolean {
  const { slug, kind } = getInfoFromJwt(accessToken)

  const isValidKind = kind === clientKind
  const isValidSlug = isProduction()
    ? slug === getOrgSlugFromCurrentUrl()
    : true

  return isValidKind && isValidSlug
}
