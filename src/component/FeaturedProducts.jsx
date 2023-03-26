import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

const FeaturedProducts = () => {

    const [featuredData, setFeaturedData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://course-api.com/react-store-products')
            const data = await response.json()
            setFeaturedData(data.slice(5, 8))
        }
        fetchData()
    }, [])

    return (
        <div className=' bg-[#F1F5F8] w-full h-full flex flex-col items-center justify-center gap-8 py-20 mt-52'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 className='text-4xl text-[#102A42] font-extrabold tracking-widest'>Featured Products</h1>
                <div className='bg-[#AB7A5F] w-24 h-1' />
            </div>
            <div className='grid grid-cols-0 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full xl:max-w-[75em] '>
                {featuredData.map(product => (
                    <Product
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
            <Link to='/products' className='bg-[#AB7A5F] text-white px-4 py-2 lg:px-6 lg:py-4 rounded-md tracking-widest uppercase font-normal text-sm lg:text-base'>
                All Products
            </Link>

        </div>
    )
}

export default FeaturedProducts
