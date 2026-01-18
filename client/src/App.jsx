import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPortal from './Portals/Main/MainPortal'

// Pages
import Gateway from './Pages/Global/Landing/Gateway'
import About from './Pages/Global/About/About'
import Course from './Pages/Global/Course/Course'
import Faculty from './Pages/Global/Faculty/Faculty'
import Student from './Pages/Global/Student/Student'
import Career from './Pages/Global/Career/Career'
import Contact from './Pages/Global/Contact/Contact'
import Login from './Pages/Global/Login/Login'

const App = () => {
  return (
    <Routes>

      {/* PUBLIC PORTAL */}
      <Route path="/" element={<MainPortal />}>
        <Route index element={<Gateway />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Course />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="student-zone" element={<Student />} />
        <Route path="careers" element={<Career />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
      </Route>

      


    </Routes>
  )
}

export default App
