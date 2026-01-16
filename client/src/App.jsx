import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom' // 1. Import useLocation

// Layout Components
import Header from './Components/Global/Header/Header'
import Footer from './Components/Global/Footer/Footer'
import EComHeader from './Components/ECommerce/Header/Header'

// Pages
import Gateway from './Pages/Global/Landing/Gateway'
import About from './Pages/Global/About/About'
import Course from './Pages/Global/Course/Course'
import Faculty from './Pages/Global/Faculty/Faculty'
import Student from './Pages/Global/Student/Student'
import Career from './Pages/Global/Career/Career'
import Contact from './Pages/Global/Contact/Contact'
import Login from './Pages/Global/Login/Login'
import Interface from './Pages/ECommerce/EcomInterface/Interface'

const App = () => {
  // 2. Get current location
  const location = useLocation();

  // 3. Define Logic Checks
  const isEcomRoute = location.pathname.startsWith('/krj/e-com');
  const isLoginRoute = location.pathname === '/login';

  return ( 
    <div>
      
      {/* --- HEADER LOGIC --- */}
      {/* If it's Login, show nothing. If it's Ecom, show EcomHeader. Else show Standard Header. */}
      {!isLoginRoute && (
        isEcomRoute ? <EComHeader cartItemCount={2} /> : <Header />
      )}

      {/* --- ROUTES --- */}
      <Routes>
        {/* Public Website Routes */}
        <Route path='/' element={<Gateway/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/courses' element={<Course/>} />
        <Route path='/faculty' element={<Faculty/>} />
        <Route path='/student-zone' element={<Student/>} />
        <Route path='/careers' element={<Career/>} />
        <Route path='/contact' element={<Contact/>} />
        
        {/* Auth Route */}
        <Route path='/login' element={<Login/>} /> 

        {/* E-Commerce Dashboard Route */}
        <Route path='/krj/e-com/:username/*' element={<Interface/>} >
        
        </Route>
      </Routes>

      {!isLoginRoute && !isEcomRoute && <Footer/>} 
      
    </div>
  ) 
}

export default App