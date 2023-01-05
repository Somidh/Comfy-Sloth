import React from 'react'
import { NumericFormat } from 'react-number-format'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Product = ({ image, name, price, isGridView, description, id }) => {

    const formatPrice = (number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(number / 100)
    }

    const number = formatPrice(price)
    const shortDescription = description.slice(0, 150) + '...'

    return (

        <div className={` px-5 w-full rounded-md mx-auto p `}>
            <div className={`product_image ${isGridView ? 'relative bg-black' : 'bg-transparent'}  `}>
                <img src={image} alt="product_image" className={`h-[12em] bg-center bg-cover rounded-sm object-cover cursor-pointer z-30 ${isGridView ? 'w-full hover:opacity-50 transition-opacity duration-500' : 'w-[20em] '} `} />
                {isGridView &&
                    <div className='search-icon hidden  absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#AB7A5F] w-10 h-10 rounded-full cursor-pointer'>
                        <Link to={`/${id}`}>
                            <FaSearch style={{ color: 'white', fontSize: '20px' }} />
                        </Link>
                    </div>}
            </div>

            <div className={`flex ${isGridView ? ' items-center justify-between py-2 mb-6' : 'flex-col items-start gap-4 mb-16 mt-6 '}`}>
                <p className={`text-[#102A42] tracking-widest capitalize ${isGridView ? ' text-sm  md:text-lg mt-2' : 'text-xl font-extrabold'} `}>{name}</p>
                <span className={`text-[#AB7A5F] tracking-widest ${isGridView ? 'text-[14px] md:text-[16px]' : 'font-bold text-[14px]'}`}>{number}</span>
                {!isGridView &&
                    <>
                        <p>{shortDescription}</p>
                        <Link className='bg-[#AB7A5F] text-[10px] uppercase text-white tracking-widest px-3 py-[2px] rounded-md'>Details</Link>
                    </>
                }
            </div>

        </div>
    )
}

export default Product
