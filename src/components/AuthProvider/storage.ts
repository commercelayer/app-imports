import { CurrentApp } from './index'
import { getOrgSlugFromCurrentUrl } from './slug'

type PersistentItem = 'clientId'| 'refreshToken'

export function makeStorageKey ({ currentApp, item }: {currentApp: CurrentApp, item: PersistentItem}): string {
  return `${currentApp}:${getOrgSlugFromCurrentUrl()}:${item}`
}

export function getPersistentRefreshInfo ({ currentApp }: {currentApp: CurrentApp}): {clientId: string, refreshToken: string} | null {
  try {
    const storedClientId = window.localStorage.getItem(makeStorageKey({ currentApp, item: 'clientId' }))
    const storedRefreshToken = window.localStorage.getItem(makeStorageKey({ currentApp, item: 'refreshToken' }))

    if (storedClientId == null || storedRefreshToken == null) {
      return null
    }

    return { clientId: storedClientId, refreshToken: storedRefreshToken }
  } catch {
    return null
  }
}

export function savePersistentRefreshInfo ({ currentApp, clientId, refreshToken }: {currentApp: CurrentApp, clientId: string, refreshToken: string}): void {
  window.localStorage.setItem(makeStorageKey({ currentApp, item: 'refreshToken' }), refreshToken)
  if (clientId != null) {
    window.localStorage.setItem(makeStorageKey({ currentApp, item: 'clientId' }), clientId)
  }
}
