import React, { useState } from 'react'
import Header from '../component/Header'
import { useStateContext } from '../context/ContextProvider'
import useProductStore from '../store/productStore'
import CartItem from '../component/CartItem';
import { useNavigate } from 'react-router';
import SubTotal from '../component/SubTotal';

const Cart = () => {

  const { cart, clearCart } = useProductStore(state => ({
    cart: state.cart,
    clearCart: state.clearCart
  }))

  const navigate = useNavigate()


  const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number / 100)
  }

  const goToProducts = () => {
    navigate('/products')
  }
  const goToCheckout = () => {
    navigate('/checkout')
  }

 

  return (

    cart.length < 1 ?
      <div className='flex flex-col items-center justify-center h-[82vh] gap-4'>
        <h1 className='font-bold text-5xl text-[#102A42] tracking-widest'>Your cart is empty</h1>
        <button onClick={goToProducts} className='bg-[#AB7A5F] text-[#EADED7]  uppercase  tracking-widest px-3 py-1 rounded-md'>fill it</button>
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


          <div className='flex item-center justify-between my-10 gap-2'>
            <button onClick={goToProducts} className='bg-[#AB7A5F] text-white px-3 py-1  tracking-widest rounded-[3px]'>Continue Shopping</button>
            <button onClick={clearCart} className='bg-[#222222] text-white text-sm px-3 py-1 tracking-widest rounded-[3px]'>Clear Shopping Cart</button>
          </div>
          
          <SubTotal goToCheckout={goToCheckout} />


        </div>
      </>
  )
}

export default Cart
