import React from 'react'
import Gateway from './Pages/Global/Landing/Gateway'
import { Route, Routes } from 'react-router-dom'
import About from './Components/Global/About/AboutSection'
import Header from './Components/Global/Header/Header'
import Footer from './Components/Global/Footer/Footer'

const App = () => {
  return (
    <div>
     
     
   <Header/>

      <Routes>
        <Route path='/' element={<Gateway/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      <Footer/>

      
      
    </div>
  ) 
}

export default App
