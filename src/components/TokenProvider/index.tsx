import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { getInfoFromJwt } from '#utils/getInfoFromJwt'
import { isEmpty } from 'lodash-es'
import { isTokenExpired, isValidTokenForCurrentApp } from './validateToken'
import { makeDashboardUrl } from './slug'
import { getPersistentAccessToken, savePersistentAccessToken } from './storage'
import { catchInvalidToken } from './catchInvalidToken'
import { getAccessTokenFromUrl } from './getAccessTokenFromUrl'

interface TokenProviderValue {
  dashboardUrl?: string
  sdkClient?: CommerceLayerClient
}

export type CurrentApp = 'imports' // TODO: app slug to be defined

interface TokenProviderProps {
  clientKind: 'integration' | 'sales_channel' | 'webapp'
  currentApp: CurrentApp
  domain?: string
  onInvalidAuth: (dashboardUrl: string) => void
  loadingSpinner?: ReactNode
  children: ((props: TokenProviderValue) => ReactNode) | ReactNode
}

export const AuthContext = createContext<TokenProviderValue>({
  dashboardUrl: makeDashboardUrl()
})

export const useTokenProvider = (): TokenProviderValue => {
  const ctx = useContext(AuthContext)
  return {
    dashboardUrl: ctx.dashboardUrl,
    sdkClient: ctx.sdkClient
  }
}

function TokenProvider({
  currentApp,
  clientKind,
  domain,
  onInvalidAuth,
  loadingSpinner,
  children
}: TokenProviderProps): JSX.Element {
  const [validAuthToken, setValidAuthToken] = useState<string>()
  const [sdkClient, setSdkClient] = useState<CommerceLayerClient>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isTokenError, setIsTokenError] = useState<boolean>(false)

  const dashboardUrl = makeDashboardUrl()

  const accessToken =
    getAccessTokenFromUrl() ?? getPersistentAccessToken({ currentApp })

  const handleOnInvalidCallback = (): void => {
    setIsLoading(false)
    setIsTokenError(true)
    onInvalidAuth(dashboardUrl)
  }

  // catch 401 errors
  const catchInvalidTokenResponse = useCallback(
    (event: PromiseRejectionEvent) => {
      setIsLoading(true)
      const isInvalidToken = catchInvalidToken(event)
      if (isInvalidToken) {
        handleOnInvalidCallback()
      }
    },
    []
  )

  useEffect(() => {
    window.addEventListener('unhandledrejection', catchInvalidTokenResponse)
    return () =>
      window.removeEventListener(
        'unhandledrejection',
        catchInvalidTokenResponse
      )
  }, [sdkClient])

  // validate token
  useEffect(() => {
    void (async (): Promise<void> => {
      if (accessToken == null) {
        console.log('accessToken is missing')
        handleOnInvalidCallback()
        return
      }

      // get a fresh token from refreshToken if token is expired or missing
      if (
        isTokenExpired({
          accessToken,
          compareTo: new Date()
        })
      ) {
        console.log('accessToken is expired')
        handleOnInvalidCallback()
        return
      }

      const isTokenValid = await isValidTokenForCurrentApp({
        accessToken,
        clientKind,
        currentApp
      })

      if (isTokenValid) {
        savePersistentAccessToken({ currentApp, accessToken })
        setValidAuthToken(accessToken)
      } else {
        console.log('accessToken is not valid', accessToken)
        handleOnInvalidCallback()
      }
    })()
  }, [accessToken])

  // once we have a validAuthToken set, we can sign an sdkClient to be used within the app
  useEffect(() => {
    if (validAuthToken == null) {
      return
    }
    const decodedTokenData = getInfoFromJwt(validAuthToken)
    if (decodedTokenData.slug != null) {
      setSdkClient(
        CommerceLayer({
          accessToken: validAuthToken,
          organization: decodedTokenData.slug,
          domain
        })
      )
      setIsLoading(false)
    }
  }, [validAuthToken])

  const value: TokenProviderValue = {
    dashboardUrl: makeDashboardUrl(),
    sdkClient
  }

  if (isTokenError) {
    return <div>Invalid token</div>
  }

  if (isLoading) {
    return (
      <>{isEmpty(loadingSpinner) ? <div>Loading...</div> : loadingSpinner}</>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </AuthContext.Provider>
  )
}

export default TokenProvider
