import React from 'react'
import { Link } from 'gatsby'
import MainLayout from '../components/main-layout'

const Dsg = () => {
  return (
    <MainLayout>
      <Link to="/">Home</Link>
      <br />
      <h1>DSG: Deferred Static Generation</h1>
    </MainLayout>
  )
}

export default Dsg
