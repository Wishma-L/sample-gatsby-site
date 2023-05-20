import React from 'react'
import { Router } from '@reach/router'
import MainLayout from '../components/main-layout'
import Profile from '../components/Profile'
import PrivateRoute from '../components/PrivateRoute'

const App = () => {
  return (
    <MainLayout>
      <Router>
        <PrivateRoute path="/app/profile" component={Profile} />
      </Router>
    </MainLayout>
  )
}
export default App
