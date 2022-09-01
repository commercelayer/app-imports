import { AllowedResourceType } from 'App'

import { getAccessTokenFromUrl } from '#utils/getAccessTokenFromUrl'

const token = getAccessTokenFromUrl()
const accessTokenQuery = token == null ? '' : `?accessToken=${token}`

export const appRoutes = {
  list: () => `/${accessTokenQuery}`,
  new: (resourceType: AllowedResourceType) => `/new/${resourceType}${accessTokenQuery}`,
  details: (importId: string) => `/details/${importId}/${accessTokenQuery}`
}
