import React from 'react'

const SubTotal = ({goToCheckout}) => {
    
  return (
    <div className='flex justify-center md:justify-end w-full  '>
    <div className='flex flex-col item-center justify-center w-[24em]'>
      <div className='border-2 px-8 py-3'>
        <div className='flex flex-col gap-2 '>
          <div className='text-[#102A42] text-base md:text-lg flex items-center justify-between font-semibold tracking-widest'>
            <p className=''>Subtotal: </p>
            <span>$968.96</span>
          </div>
          <div className='text-[#324D67] flex items-center justify-between'>
            <p className=''>Shipping Fee: </p>
            <span>$9.96</span>

          </div>
        </div>
        <hr className='w-full border-[#bcccdc] my-5' />

        <div className='text-[#102A42] text-xl md:text-2xl tracking-widest flex items-center justify-between font-bold '>
          <p className=''>Order Total: </p>
          <span>$968.67</span>
        </div>
      </div>
      <button onClick={goToCheckout} className='bg-[#AB7A5F] text-white text-sm mt-5 py-2 rounded-sm uppercase font-medium tracking-widest'>Procees To Checkout</button>
    </div>
  </div>
  )
}

export default SubTotal
