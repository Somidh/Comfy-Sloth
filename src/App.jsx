import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import SideBar from './component/Sidebar'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
import { useStateContext } from './context/ContextProvider'


function App() {

  const { showNavbar } = useStateContext()


  return (
    <div className='px-5 py-4 max-w-[75em] mx-auto'>
      <BrowserRouter>
        <Navbar />
        <SideBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Product />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
