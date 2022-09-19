import { useEffect, useState } from 'react'
import { getPersistentRefreshInfo } from './storage'
import { getTokensFromUrl } from './getTokensFromUrl'
import { CurrentApp } from '.'
import { isEmpty } from 'lodash-es'

export function useTokens ({ currentApp }: { currentApp: CurrentApp}): {accessToken?: string, refreshToken?: string, clientId?: string } {
  const [accessToken, setAccessToken] = useState<string | undefined>(getTokensFromUrl().accessToken)
  const [refreshToken, setRefreshToken] = useState<string | undefined>(getTokensFromUrl().refreshToken)
  const [clientId, setClientId] = useState<string | undefined>(getTokensFromUrl().clientId)

  const urlTokens = getTokensFromUrl()

  useEffect(() => {
    // accessToken is only available from URL while
    // refreshToken and clientId can also be stored in localStorage
    const persistentData = getPersistentRefreshInfo({
      currentApp
    })

    const accessToken = !isEmpty(urlTokens.accessToken) ? urlTokens.accessToken : undefined
    const refreshToken = !isEmpty(urlTokens.refreshToken) ? urlTokens.refreshToken : persistentData?.refreshToken
    const clientId = !isEmpty(urlTokens.clientId) ? urlTokens.clientId : persistentData?.clientId

    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setClientId(clientId)
  }, [urlTokens])

  return {
    accessToken,
    refreshToken,
    clientId
  }
}
