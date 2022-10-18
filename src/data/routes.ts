import { AllowedResourceType } from 'App'

export const appRoutes = {
  list: () => '/',
  selectResource: () => `/new`,
  newImport: (resourceType: AllowedResourceType) => `/new/${resourceType}`,
  details: (importId: string) => `/details/${importId}/`
}
