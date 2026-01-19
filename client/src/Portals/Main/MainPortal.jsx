import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Global/Footer/Footer'
import Header from '../../Components/Global/Header/Header'

const MainPortal = () => {
  return (
    <div>
      <Header />
      
      {/* THIS IS WHERE CHILD ROUTES RENDER */}
      <Outlet />

      <Footer />
    </div>
  )
}

export default MainPortal
