import { AllowedResourceType } from 'App'

export const appRoutes = {
  list: () => '/',
  new: (resourceType: AllowedResourceType) => `/new/${resourceType}`,
  details: (importId: string) => `/details/${importId}/`
}
