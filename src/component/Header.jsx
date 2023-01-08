import React from 'react'

const Header = ({title, productName}) => {
    return (
        <div className='bg-[#EADED7] py-20 mb-10'>
            <div className='max-w-[85em]  mx-auto px-8 flex items-center gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl tracking-widest capitalize'>{`Home / ${title} ${productName ? `/ ${productName}` : ''}`}</h1>
            </div>
        </div>
    )
}

export default Header
