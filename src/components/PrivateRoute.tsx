import React from 'react'
import { useKeycloak } from '@react-keycloak/web'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { keycloak } = useKeycloak()

  if (!keycloak.authenticated) {
    keycloak.login()
  }

  return <Component {...rest} />
}

export default PrivateRoute
