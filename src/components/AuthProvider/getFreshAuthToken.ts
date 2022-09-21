interface ApiAuthResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
  created_at: number
  owner_id: string
  owner_type: string
}

interface RefreshedAuthTokens {
  refreshToken: string
  accessToken: string
}

export async function getFreshAuthToken({
  refreshToken,
  clientId,
  slug
}: {
  refreshToken: string
  clientId: string
  slug: string
}): Promise<RefreshedAuthTokens | null> {
  try {
    const auth = await fetch(`https://${slug}.commercelayer.io/oauth/token`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      })
    })

    const { data } = (await auth.json()) as { data: ApiAuthResponse }

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token
    }
  } catch {
    return null
  }
}
