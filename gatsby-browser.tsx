import './src/styles/index.scss'
import React from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import keycloak from './src/keycloak'

const Loading = () => {
  console.log('In Loading component.........')
  return <div>Loading...</div>
}

export const wrapRootElement = ({ element }: any) => {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      // initOptions={{
      //   onLoad: "login-required",
      // }}
      LoadingComponent={<Loading />}
      // isLoadingCheck={(authClient) => {
      //   if (!authClient.idTokenParsed) {
      //     console.log('ID token parsed', authClient.idTokenParsed)
      //   } else {
      //     console.log('ID token parsed', JSON.stringify(authClient.idTokenParsed, null, 2))
      //   }
      //   return !authClient.idTokenParsed
      // }}
    >
      {element}
    </ReactKeycloakProvider>
  )
}
