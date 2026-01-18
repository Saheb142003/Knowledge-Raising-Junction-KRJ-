import React from 'react'
import StudentHeader from '../../Components/Global/Student/Header'
import { Outlet } from 'react-router-dom'
import DashboardFooter from '../../Components/Global/Footer/DashboardFooter'

const StudentPortal = () => {
  return (
    <div>
      <StudentHeader/>
      <Outlet/>
      <DashboardFooter/>


      
    </div>
  )
}

export default StudentPortal
