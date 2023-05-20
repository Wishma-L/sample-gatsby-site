/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  realm: 'headless', // realm as configured in Keycloak
  url: process.env.GATSBY_KEYCLOAK_URL, // URL of the Keycloak server
  clientId: process.env.GATSBY_KEYCLOAK_CLIENT_ID!, // client id as configured in the realm in Keycloak
})

export default keycloak
