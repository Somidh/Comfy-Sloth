import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import SideBar from './component/Sidebar'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useStateContext } from './context/ContextProvider'
import Footer from './component/Footer'
import AboutProduct from './pages/AboutProduct'


function App() {

  const [token, setToken] = useState(false)

  token && sessionStorage.setItem('token', JSON.stringify(token))

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <div>
      <BrowserRouter >
        <Navbar token={token} setToken={setToken} />
        <SideBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:id' element={<AboutProduct />} />
        </Routes>
      </BrowserRouter>
      <Footer  />
    </div>
  )
}

export default App
