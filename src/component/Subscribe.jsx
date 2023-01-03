import React from 'react'

const Subscribe = () => {
    return (
        <div className='px-5 mb-20 flex flex-col gap-4 max-w-[85em] lg:flex-row lg:items-end lg:justify-between'>
            <div className='w-full'>
                <h1 className="text-2xl lg:text-3xl font-semibold tracking-wider mb-3">Join our newsletter and get 20% off</h1>
                <p className='text-[#617D98] text-sm lg:text-base leading-[1.7rem] lg:leading-[1.8rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?</p>
            </div>
            <div className='flex w-full lg:h-12 lg:justify-end '>
                <input type="text" placeholder='Enter Email' className=' px-3 py-1 border-2 border-black rounded-l-md w-full max-w-[20em] lg:max-w-[26em] ' />
                <button className='bg-[#AB7A5F] px-3 rounded-r-md border-2 border-black border-l-0 tracking-widest'>Subscribe</button>
            </div>
        </div>
    )
}

export default Subscribe
