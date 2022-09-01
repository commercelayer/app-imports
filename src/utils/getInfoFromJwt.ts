import jwtDecode from 'jwt-decode'

interface JWTProps {
  organization: {
    slug: string
    id: string
  }
  application: {
    kind: string
  }
  test: boolean
}

export const getInfoFromJwt = (accessToken: string): {
  slug?: string
  kind?: string
  isTest?: boolean
} => {
  try {
    const {
      organization: { slug },
      application: { kind },
      test
    } = jwtDecode<JWTProps>(accessToken)

    return { slug, kind, isTest: test }
  } catch (e) {
    return {}
  }
}
