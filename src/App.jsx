import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <div className="App">
      <h1>sofjesofilogin</h1>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/product' element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
