import React from 'react'
import EComAdminHeader from '../../Components/ECommerce/Admin/EComAdmin'
import { Outlet } from 'react-router-dom'
import DashboardFooter from '../../Components/Global/Footer/DashboardFooter'

const EComAdminPortal = () => {
  return (
    <div>
      
      <EComAdminHeader/>
      <Outlet/>
      <DashboardFooter/>

    </div>
  )
}

export default EComAdminPortal
