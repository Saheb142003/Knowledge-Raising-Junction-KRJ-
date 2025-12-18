import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Gateway from './Landing/Pages/Gateway';
import Header from './Landing/Components/Header';
import Footer from './Landing/Components/Footer';


const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Gateway/>}/>

      </Routes>
      <Footer/>

    </div>
  )
}

export default App
