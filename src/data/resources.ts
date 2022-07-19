import { AllowedResourceType } from "App"

const resources: Record<AllowedResourceType, boolean> = {
  skus: true,
  prices: true,
}

const allResources = Object.keys(resources) as AllowedResourceType[]

export const availableResources = allResources.filter((r) => resources[r])

export const isAvailableResource = (resourceType: string) =>
  availableResources.includes(resourceType as AllowedResourceType)
