import React from 'react'
import Gateway from './Pages/Global/Landing/Gateway'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Global/Header/Header'
import Footer from './Components/Global/Footer/Footer'
import About from './Pages/Global/About/About'
import Course from './Pages/Global/Course/Course'
import Faculty from './Pages/Global/Faculty/Faculty'
import Student from './Pages/Global/Student/Student'

const App = () => {
  return ( 
    <div>
     
     
   <Header/>

      <Routes>
        <Route path='/' element={<Gateway/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/courses' element={<Course/>} />
        <Route path='/faculty' element={<Faculty/>} />
        <Route path='/student-zone' element={<Student/>} />
      </Routes>
      <Footer/>

      
      
    </div>
  ) 
}

export default App
