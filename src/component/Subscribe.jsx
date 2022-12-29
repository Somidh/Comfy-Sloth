import React from 'react'

const Subscribe = () => {
    return (
        <div className='px-5 mb-20 flex flex-col gap-4 max-w-[75em] lg:flex-row'>
            <div>
                <h1 className="text-2xl font-semibold tracking-widest mb-3">Join our newsletter and get 20% off</h1>
                <p className='text-[#617D98] text-sm leading-[1.7rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?</p>
            </div>
            <div className='flex w-full '>
                <input type="text" placeholder='Enter Email' className=' px-3 py-1 border-2 border-black rounded-l-sm w-full max-w-[20em]' />
                <button className='bg-[#AB7A5F] px-3 rounded-r-sm'>Subscribe</button>
            </div>
        </div>
    )
}

export default Subscribe
