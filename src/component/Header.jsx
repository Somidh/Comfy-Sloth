import React from 'react'

const Header = ({title}) => {
    return (
        <div className='bg-[#EADED7] py-20 mb-10'>
            <div className='max-w-[85em]  mx-auto px-8'>
                <h1 className='font-bold text-2xl tracking-widest'>Home / {title}</h1>
            </div>
        </div>
    )
}

export default Header
