import React from 'react'
import { useNavigate } from 'react-router'
import { useStateContext } from '../context/ContextProvider'
import { loadStripe } from '@stripe/stripe-js';

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY)
  }

  return stripePromise
}

const SubTotal = ({ subTotal }) => {

  const item = {
    price: 'price_1MSvc8SB5kHwJbssPFsCOWM3',
    quantity: 1
  }


  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  }

  const redirectToCheckout = async () => {
    const stripe = await getStripe()
    // const { error } = await stripe.redirectToCheckout(checkoutOptions) 
  }


  const { token } = useStateContext()
  const navigate = useNavigate()

  const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number / 100)
  }

  const goToLogin = () => {
    navigate('/login')
  }
  // const goToCheckout = async () => {
  //   const stripe = await stripePromise
  //   navigate('/checkout')

  // }


  const formatedPrice = formatPrice(subTotal)
  const orderTotal = formatPrice(subTotal + 5.34)



  return (
    <div className='flex justify-center md:justify-end w-full  '>
      <div className='flex flex-col item-center justify-center w-[24em]'>
        <div className='border-2 px-8 py-3'>
          <div className='flex flex-col gap-2 '>
            <div className='text-[#102A42] text-base md:text-lg flex items-center justify-between font-semibold tracking-widest'>
              <p className=''>Subtotal: </p>
              <span>{formatedPrice}</span>
            </div>
            <div className='text-[#324D67] flex items-center justify-between'>
              <p className=''>Shipping Fee: </p>
              <span>$5.00</span>

            </div>
          </div>
          <hr className='w-full border-[#bcccdc] my-5' />

          <div className='text-[#102A42] text-xl md:text-2xl tracking-widest flex items-center justify-between font-bold '>
            <p className=''>Order Total: </p>
            <span>{orderTotal}</span>
          </div>
        </div>

        <button role="link" onClick={token ? redirectToCheckout : goToLogin} className='bg-[#AB7A5F] text-white text-sm mt-5 py-2 rounded-sm uppercase font-medium tracking-widest'>{token ? 'Procees To Checkout' : 'Login'}</button>
      </div>
    </div>
  )
}

export default SubTotal
