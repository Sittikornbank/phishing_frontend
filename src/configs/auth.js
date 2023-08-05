export default {
  meEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_USERAUTH_PORT}/me`,
  loginEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_USERAUTH_PORT}/login`,
  registerEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_USERAUTH_PORT}/register`,
  storageTokenKeyName: 'token',
  onTokenExpiration: 'logout' // logout | refreshToken
}
