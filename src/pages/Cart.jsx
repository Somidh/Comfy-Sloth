import React, { useState } from 'react'
import Header from '../component/Header'
import { useStateContext } from '../context/ContextProvider'
import useProductStore from '../store/productStore'
import { borderRadius } from '@mui/system';
import CartItem from '../component/CartItem';
import { useNavigate } from 'react-router';

const Cart = () => {

  const { cart } = useProductStore(state => ({
    cart: state.cart,
  }))

  const navigate = useNavigate()

  console.log(cart)



  const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number / 100)
  }

  const fillCartButton = () => {
    navigate('/products')
  }

  return (

    cart.length < 1 ?
      <div className='flex flex-col items-center justify-center h-[82vh] gap-4'>
        <h1 className='font-bold text-5xl text-[#102A42] tracking-widest'>Your cart is empty</h1>
        <button onClick={fillCartButton} className='bg-[#AB7A5F] text-[#EADED7]  uppercase  tracking-widest px-3 py-1 rounded-md'>fill it</button>
      </div>
      :
      <>

        <Header title="Cart" />

        <div className='max-w-[85em] mx-auto px-5 mb-10'>
          <ul className='hidden md:grid grid-cols-4 items-center ml-20 px-5 text-[#617D98]'>
            <li>Item</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
          </ul>

          <hr className='w-full  border-[#bcccdc] hidden my-10 md:block' />

          {

            cart.map((item, idx) => (
              <CartItem key={idx} formatPrice={formatPrice} {...item} />
            ))

          }

          <hr className='w-full border-[#bcccdc] mt-10' />
        </div>
      </>
  )
}

export default Cart
