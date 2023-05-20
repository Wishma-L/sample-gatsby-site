import React from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'

export const wrapRootElement = ({ element }: any) => {

  return (
    <ReactKeycloakProvider
      // @ts-ignore
      authClient={{}}
      // initOptions={{
      //   onLoad: "login-required",
      // }}
    >
      {element}
    </ReactKeycloakProvider>
  )
}
