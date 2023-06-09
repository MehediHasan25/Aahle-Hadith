import React from 'react'
import withAuthentication from './Protected/withAuthentication'
// import BG from '../assets/bg.png'

const Dashboard = () => {
  return (
    <div>
      <h3>Dashboard</h3>
      {/* <img src={BG} alt="" /> */}
    </div>
  )
}

export default withAuthentication(Dashboard);