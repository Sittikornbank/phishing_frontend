/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  if (role === 'guest') return '/dashboards'
  else if (role === 'superadmin') return '/dashboards'
  else return '/dashboards'
}

export default getHomeRoute
