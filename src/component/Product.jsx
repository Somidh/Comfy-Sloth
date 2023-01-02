import React from 'react'
import { NumericFormat } from 'react-number-format'
import { FaSearch } from 'react-icons/fa'
const Product = ({ image, name, price }) => {

    const formatPrice = (number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(number / 100)
    }
    
    const number = formatPrice(price)

    return (

        <div className='w-full rounded-md mx-auto px-5'>
            <div className=' product_image bg-black relative '>
                <img src={image} alt="product_image" className=' w-full h-[18em] xl:h-[14em]   bg-center bg-cover rounded-sm object-cover cursor-pointer z-30 hover:opacity-50 transition-opacity duration-500 ' />
                <div className='search-icon hidden  absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#AB7A5F] w-10 h-10 rounded-full cursor-pointer'>
                    <FaSearch style={{ color: 'white', fontSize: '20px' }} />
                </div>
            </div>
            <div className='flex items-center justify-between py-2'>
                <p className='capitalize text-[#102A42] tracking-widest text-sm md:text-lg'>{name}</p>
                <span className='text-[#AB7A5F] tracking-widest text-[14px] md:text-[16px] '>{number}</span>
            </div>
        </div>
    )
}

export default Product
