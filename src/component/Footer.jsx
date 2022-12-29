import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-[#222222] w-full text-white flex flex-col md:flex-row gap-1  items-center justify-center py-4 md:py-8'>
            <div className='flex gap-1'>
                <span>©</span>
                <p>2022 <span className='text-[#AB7A5F]'>Comfysloth</span></p>
            </div>
            <p>All rights reserved</p>
        </div>
    )
}

export default Footer
