import { AllowedResourceType } from "App"

import { getAccessTokenFromUrl } from "#utils/getAccessTokenFromUrl"

const accessTokenQuery = `?accessToken=${getAccessTokenFromUrl()}`

export const appRoutes = {
  list: () => `/${accessTokenQuery}`,
  new: (resourceType: AllowedResourceType) => `/new/${resourceType}${accessTokenQuery}`,
}
