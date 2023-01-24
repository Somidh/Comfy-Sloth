import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import SideBar from './component/Sidebar'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './component/Footer'
import AboutProduct from './pages/AboutProduct'
import '@stripe/stripe-js'
import Success from './component/Success'
import { Cancel } from '@mui/icons-material'

function App() {


  return (
    <div>
      <BrowserRouter basename='/' >
        <Navbar />
        <SideBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          {/* <Route path='/checkout' element={<Checkout />} /> */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:id' element={<AboutProduct />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel'  element={<Cancel />} />
        </Routes>
      </BrowserRouter>
      <Footer  />
    </div>
  )
}

export default App
