import React from 'react'
import { useKeycloak } from '@react-keycloak/web'

const Profile = () => {
  const { keycloak } = useKeycloak()
  return <>
    <h1>My profile</h1>
    <ul>
      <li>Name: {keycloak.idTokenParsed?.name}</li>
      <li>E-mail: {keycloak.idTokenParsed?.email ?? '-'}</li>
    </ul>
  </>
}

export default Profile
