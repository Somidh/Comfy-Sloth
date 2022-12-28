import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assests/logo.svg'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useStateContext } from '../context/ContextProvider';

const Navbar = () => {

  const { handleNavbarClick, showNavbar, } = useStateContext()

  return (
    <div className='flex items-center justify-between max-w-[75em] mx-auto px-5 py-4'>
      <img src={Logo} alt="logo" className='w-[10em] ' />

      <div className='hidden lg:flex items-center gap-10 tracking-widest text-[#324D67] '>
        <Link className='cursor-pointer hover:underline decoration-[#AB7A5F] decoration-2 underline-offset-8' to='/' >Home</Link>
        <Link className='cursor-pointer hover:underline decoration-[#AB7A5F] decoration-2 underline-offset-8' to='/about'>About</Link>
        <Link className='cursor-pointer hover:underline decoration-[#AB7A5F] decoration-2 underline-offset-8' to='/products'>Products</Link>
        <Link className='cursor-pointer hover:underline decoration-[#AB7A5F] decoration-2 underline-offset-8' to='/checkout'>Checkout</Link>
      </div>
      <div className='lg:hidden'>
        <MenuIcon onClick={handleNavbarClick} fontSize='large' className=' text-[#AB7A5F]' />
      </div>

      <div className=' items-center justify-center gap-5 hidden lg:flex'>
        <div className='flex items-center justify-center gap-2 cursor-pointer relative'>
          <h2 className='text-[25px] '>Cart</h2>
          <ShoppingCartIcon fontSize='medium' />
          <span className='w-5 h-5 bg-[#AB7A5F] rounded-full absolute -right-2 -top-1 flex items-center justify-center text-white text-sm'>0</span>
        </div>
        <div className='flex items-center justify-center gap-2 cursor-pointer'>
          <h2 className='text-[25px]'>Logout </h2>
          <div className='flex items-center '>
            <PersonIcon fontSize='medium' />
            <span className='font-medium text-2xl'>-</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
