import React from 'react'
import EComUserHeader from '../../Components/ECommerce/User/EComUserHeader'
import { Outlet } from 'react-router-dom'
import DashboardFooter from '../../Components/Global/Footer/DashboardFooter'

const EComUserPortal = () => {
  return (
    <div>
      <EComUserHeader/>
      <Outlet/>
      <DashboardFooter/>

      
    </div>
  )
}

export default EComUserPortal
