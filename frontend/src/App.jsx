import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/Header/NavBar'
import Hero from './Components/Hero/Hero'
import Error from './Components/Error/Error'
import Footer from './Components/Footer/Footer'
import Template from './Pages/Template/Template'
import GeneratePdf from './Components/Generator/GeneratePdf'
import Download from './Components/Download/Download'
import Merge from './Pages/Mege-page/Merge'
import About from './Pages/About/about'
import HistoryPreview from './Pages/HistoryPreview/HistoryPreview'

function App() {
  
  return (
    <div className=''>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/template' element={<Template/>} />
        <Route path='/template/:templateName' element={<GeneratePdf/>} />
        <Route path='/download' element={<Download/>}/>
        <Route path='/merge' element={<Merge/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/recent' element={<HistoryPreview/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>   
      <Footer/> 
    </div>
  )
}

export default App
