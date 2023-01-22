import React from 'react'
import { Link } from 'react-router-dom'
import hero1 from '../assests/hero-1.jpeg'
import hero2 from '../assests/hero-2.jpeg'
import useProductStore from '../store/productStore'

const Hero = () => {


    const token = useProductStore(state => ({
        token: state.token
    }))

    return (
        <div className='mt-32 lg:mt-56 max-w-[85em] mx-auto px-5 md:px-20 lg:px-5 py-4 flex items-start justify-between relative w-full'>
            <div className='flex flex-col items-start gap-3 lg:gap-5 lg:w-[35em] w-[60em]  lg:px-0  '>
                <h1 className='capitalize text-5xl leading-[1.1em] font-extrabold text-[#102A42] tracking-widest'>design your <br /> comfort zone</h1>
                <p className='text-[#617D98] leading-8 font-normal mb-6 lg:text-xl lg:leading-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>

                <Link to='/products' className='bg-[#AB7A5F] text-white px-4 py-2 lg:px-6 lg:py-4 rounded-md tracking-widest uppercase font-normal text-sm lg:text-base'>Shop Now</Link>
            </div>

            <div className='w-[27em] h-[15.2em] absolute right-0 hidden lg:block'>
                <img src={hero1} alt="" className='absolute -bottom-[14.5rem] w-[16em] -left-20 rounded-sm z-10' />
                <img src={hero2} alt="" className='absolute w-full right-0 -top-16 rounded-md' />
            </div>
        </div>
    )
}

export default Hero
