import React from 'react'
import { Link } from 'react-router-dom'

const ListView = ({ products }) => {

  const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number / 100)
  }


  const ListProduct = () => (
    products.map(product => {
      const { image, name, price, description, id } = product
      const number = formatPrice(price)
      const shortDescription = description?.slice(0, 150) + '...'

      return (
        <div key={id} className='px-5  rounded-md mx-auto w-full my-10 lg:flex lg:justify-between lg:items-center lg:gap-10'>
          <img src={image} alt="product_image" className='h-[12em] w-[20em] lg:w-[24em] bg-center bg-cover rounded-sm object-cover cursor-pointer' />

          <div className='flex flex-col items-start gap-2 mt-2 lg:w-[38em] mb-10 lg:mb-0 ' >
            <h1 className='text-[#102A42] tracking-widest capitalize text-xl lg:text-2xl font-extrabold'>{name}</h1>
            <span className='text-[#AB7A5F] tracking-widest font-bold text-[14px] lg:text-[16px]'>{number}</span>
            <p className='text-[#3a536c]'>{shortDescription}</p>
            <Link to={`/product/${id}`} className='bg-[#AB7A5F] text-[10px] uppercase text-white tracking-widest px-3 py-[2px] my-4 rounded-md'>Details</Link>

          </div>
        </div>
      )
    })
  )


  return (
    <div>
      <ListProduct />
    </div>
  )
}

export default ListView
