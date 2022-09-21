import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { getInfoFromJwt } from '#utils/getInfoFromJwt'
import { isEmpty } from 'lodash-es'
import {
  isTokenExpiredOrMissing,
  isValidTokenForCurrentApp
} from './validateToken'
import { getFreshAuthToken } from './getFreshAuthToken'
import { getOrgSlugFromCurrentUrl, makeDashboardUrl } from './slug'
import { getPersistentRefreshInfo, savePersistentRefreshInfo } from './storage'
import { catchInvalidToken } from './catchInvalidToken'
import { getTokensFromUrl } from './getTokensFromUrl'

interface AuthProviderValue {
  dashboardUrl?: string
  sdkClient?: CommerceLayerClient
}

export type CurrentApp = 'imports' // TODO: app slug to be defined

interface AuthProviderProps {
  clientKind: 'integration' | 'sales_channel' | 'webapp'
  currentApp: CurrentApp
  domain?: string
  onInvalidAuth: (dashboardUrl: string) => void
  loadingSpinner?: ReactNode
  children: ((props: AuthProviderValue) => ReactNode) | ReactNode
}

export const AuthContext = createContext<AuthProviderValue>({
  dashboardUrl: makeDashboardUrl()
})

export const useAuthProvider = (): AuthProviderValue => {
  const ctx = useContext(AuthContext)
  return {
    dashboardUrl: ctx.dashboardUrl,
    sdkClient: ctx.sdkClient
  }
}

function AuthProvider({
  currentApp,
  clientKind,
  domain,
  onInvalidAuth,
  loadingSpinner,
  children
}: AuthProviderProps): JSX.Element {
  const [validAuthToken, setValidAuthToken] = useState<string>()
  const [sdkClient, setSdkClient] = useState<CommerceLayerClient>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const orgSlug = getOrgSlugFromCurrentUrl()
  const dashboardUrl = makeDashboardUrl()
  const isRefreshingToken = useRef<boolean>(false)

  // get tokens from url or from cookies, if any
  // const { accessToken, refreshToken, clientId } = useTokens({ currentApp })

  const persistentData = getPersistentRefreshInfo({
    currentApp
  })
  const urlTokens = getTokensFromUrl()
  const accessToken = !isEmpty(urlTokens.accessToken)
    ? urlTokens.accessToken
    : undefined
  const refreshToken = !isEmpty(urlTokens.refreshToken)
    ? urlTokens.refreshToken
    : persistentData?.refreshToken
  const clientId = !isEmpty(urlTokens.clientId)
    ? urlTokens.clientId
    : persistentData?.clientId

  const handleOnInvalidCallback = (): void => {
    setIsLoading(false)
    onInvalidAuth(dashboardUrl)
  }

  const handleTokenRefresh = useCallback(
    async ({
      clientId,
      refreshToken
    }: {
      clientId: string
      refreshToken: string
    }): Promise<void> => {
      try {
        if (isRefreshingToken.current) {
          return
        }
        isRefreshingToken.current = true
        const newAuth = await getFreshAuthToken({
          clientId,
          slug: orgSlug,
          refreshToken
        })
        const newAuthSuccess =
          newAuth?.accessToken != null &&
          newAuth.refreshToken != null &&
          isValidTokenForCurrentApp({
            accessToken: newAuth.accessToken,
            clientKind,
            currentApp
          })
        if (newAuthSuccess) {
          savePersistentRefreshInfo({
            currentApp,
            clientId,
            refreshToken: newAuth.refreshToken
          })
          setValidAuthToken(newAuth.accessToken)
        } else {
          handleOnInvalidCallback()
        }
        isRefreshingToken.current = false
      } catch {
        handleOnInvalidCallback()
      }
    },
    []
  )

  // catch 401 errors and try tro refresh the token
  const catchInvalidTokenResponse = useCallback(
    (event: PromiseRejectionEvent) => {
      setIsLoading(true)
      const isInvalidToken = catchInvalidToken(event)
      if (isInvalidToken && clientId != null && refreshToken != null) {
        console.log('401 catched - refreshing token')
        void handleTokenRefresh({ clientId, refreshToken })
      } else {
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

  // validate token or get new one with refreshToken
  useEffect(() => {
    // first check if we can refresh the token
    // no need to check `accessToken` exsistance here since if is missing we only need to refreshToken
    // to get a new accessToken
    if (clientId == null || refreshToken == null) {
      console.log('Missing clientId or refreshToken')
      handleOnInvalidCallback()
      return
    }

    // get a fresh token from refreshToken if token is expired or missing
    const isExpiredOrMissing = isTokenExpiredOrMissing({
      accessToken,
      compareTo: new Date()
    })
    if (isExpiredOrMissing && clientId != null && refreshToken != null) {
      console.log('isExpiredOrMissing - refreshing token', {
        clientId,
        refreshToken
      })
      void handleTokenRefresh({ clientId, refreshToken })
      return
    }

    // if not expired we need to validate the token for current app
    if (
      accessToken != null &&
      isValidTokenForCurrentApp({ accessToken, clientKind, currentApp })
    ) {
      refreshToken != null &&
        savePersistentRefreshInfo({ currentApp, clientId, refreshToken })
      setValidAuthToken(accessToken)
    } else {
      console.log('Missing or invalid token', accessToken)
      handleOnInvalidCallback()
    }
  }, [accessToken, refreshToken, clientId])

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

  const value: AuthProviderValue = {
    dashboardUrl: makeDashboardUrl(),
    sdkClient
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

export default AuthProvider
