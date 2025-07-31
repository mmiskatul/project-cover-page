import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/Header/NavBar'
import Hero from './Components/Hero/Hero'
import Error from './Components/Error/Error'
import Footer from './Components/Footer/Footer'
import Template from './Pages/Template/Template'
import GeneratePdf from './Components/Generator/GeneratePdf'
import Download from './Components/Download/Download'

function App() {
  return (
    <div className=''>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/template' element={<Template/>} />
        <Route path='/template/:templateName' element={<GeneratePdf/>} />
        <Route path='/download' element={<Download/>}/>
        <Route path='*' element={<Error/>} />
      </Routes>   
      <Footer/> 
    </div>
  )
}

export default App
