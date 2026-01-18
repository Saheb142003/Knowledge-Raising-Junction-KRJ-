import React from 'react'
import { Outlet } from 'react-router-dom'
import TeacherHeader from '../../Components/Global/Faculty/TeacherHeader'
import DashboardFooter from '../../Components/Global/Footer/DashboardFooter'

const TeacherPortal = () => {
  return (
    <div>
      <TeacherHeader/>
      
      <Outlet/>
      <DashboardFooter/>
    </div>
  )
}

export default TeacherPortal
