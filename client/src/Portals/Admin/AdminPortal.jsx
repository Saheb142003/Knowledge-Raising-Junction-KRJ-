import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../Components/Management/Admin/AdminHeader'
import DashboardFooter from '../../Components/Global/Footer/DashboardFooter'

const AdminPortal = () => {
  return (
    <div>
        <AdminHeader/>
        <Outlet/>
      <DashboardFooter/>

      
    </div>
  )
}

export default AdminPortal
