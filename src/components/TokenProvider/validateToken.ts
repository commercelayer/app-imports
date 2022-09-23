import { getInfoFromJwt } from '#utils/getInfoFromJwt'
import { isProduction } from '#utils/isProduction'
import { getOrgSlugFromCurrentUrl } from './slug'

export function isTokenExpired({
  accessToken,
  compareTo
}: {
  accessToken: string
  compareTo: Date
}): boolean {
  const { exp } = getInfoFromJwt(accessToken)

  if (exp == null) {
    return true
  }

  const nowTime = Math.trunc(compareTo.getTime() / 1000)
  return nowTime > exp
}

export async function isValidTokenForCurrentApp({
  accessToken,
  clientKind,
  currentApp
}: {
  accessToken: string
  clientKind: string
  currentApp: string
}): Promise<boolean> {
  const { slug, kind } = getInfoFromJwt(accessToken)

  const isValidKind = kind === clientKind
  const isValidSlug = isProduction()
    ? slug === getOrgSlugFromCurrentUrl()
    : true

  // TODO: implement async verification againt user_info endpoint
  // const isValidForApp = await fetch('../tokenInfo')

  return isValidKind && isValidSlug
}
