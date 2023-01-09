import React from 'react'
import Header from '../component/Header'
import { useStateContext } from '../context/ContextProvider'

const Cart = () => {

  const { productDetail } = useStateContext()
  const name = productDetail?.name


  return (
    <>
      <Header title="Cart" />

      <div className='max-w-[85em] mx-auto'>
        <ul className='hidden md:flex items-center justify-between '>
          <li>Item</li>
          <li>Price</li>
          <li>Quality</li>
          <li>Subtotal</li>
        </ul>

        <hr className='w-full' />

        <div>
          <div>
            <img src={productDetail?.images[0].url} alt="" />
            <div>
              <p >{name}</p>
              {productDetail?.stock > 0 ? <span className='text-green'>In Stock</span> : <span className='text-[red]'>Out Of Stock</span>}
            </div>
          </div>
        </div>

        <hr />
      </div>
    </>
  )
}

export default Cart
