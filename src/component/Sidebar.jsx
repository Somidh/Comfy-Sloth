import React, { useState } from 'react'
import Logo from '../assests/logo.svg'
import { Link, NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {

  const [showNavbar, setShowNavbar] = useState(false)

  const handleNavbarClick = () => {
      setShowNavbar(prev => !prev)
  }


  return (

    <div className={`relative  bg-white h-screen  px-5 py-3 flex flex-col lg:flex-row  lg:h-full lg:justify-around lg:max-w-[80em]  lg:mx-auto  gap-8 ${showNavbar ? '-translate-x-full' : 'translate-x-0'} transition-all duration-300 ease-linear`}>
      <div className='flex flex-col  lg:flex-row items-start   lg:items-center gap-5 lg:gap-36 '>
        <div className='flex items-center justify-between lg:justify-center w-full'>
          <img src={Logo} alt="logo" className='w-[10em] lg:w-[12em]' />
          <div className='lg:hidden'>
            <CloseIcon onClick={ handleNavbarClick} fontSize='large' style={{ color: 'red', cursor: 'pointer' }} />
          </div>
        </div>
        <div className='flex flex-col text-[#324D67] lg:flex-row items-start justify-center gap-5 lg:gap-10 '>
          <Link to='/' className='' >Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/products'>Products</Link>
          <Link to='/checkout'>Checkout</Link>
        </div>
      </div>
      <div className='flex items-center justify-center gap-5'>
        <div className='flex items-center justify-center gap-2 cursor-pointer relative'>
          <h2 className='text-[28px]  font-normal'>Cart</h2>
          <ShoppingCartIcon fontSize='large' />
          <span className='w-6 h-6 bg-[#AB7A5F] rounded-full absolute -right-1 -top-2 flex items-center justify-center text-white text-sm'>0</span>
        </div>
        <div className='flex items-center justify-center gap-2 cursor-pointer'>
          <h2 className='text-[28px] font-normal'>Logout </h2>
          <div className='flex items-center '>
            <PersonIcon fontSize='large' />
            <span className='font-medium text-4xl'>-</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
