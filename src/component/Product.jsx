import React from 'react'
import { NumericFormat } from 'react-number-format'
const Product = ({ image, name, price }) => {

    function currencyFormat(num) {
        return '₹' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const number = currencyFormat(price)


    //  const number =   new Intl.NumberFormat('en-US',
    //         {
    //             style: 'currency',
    //             currency: 'USD',
    //             maximumFractionDigits: 3,
    //             roundingIncrement: 2
    //         }).format(price)
    // console.log(number)

    // const formatedNumber = currencyFormat(price)



    return (

            <div className='w-full rounded-md mx-auto px-5 '>
                <img src={image} alt="product_image" className='w-full h-[18em] xl:h-[14em] bg-center bg-cover rounded-sm object-cover' />
                <div className='flex items-center justify-between py-2'>
                    <p className='capitalize text-[#102A42] tracking-widest text-sm md:text-lg'>{name}</p>
                    <span className='text-[#AB7A5F] tracking-widest text-[14px] md:text-[16px] '>{number}</span>
                </div>
        </div>
    )
}

export default Product
