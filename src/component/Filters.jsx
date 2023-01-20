import React from 'react'



const categories = ['All', 'office', 'living room', 'kitchen', 'bedroom', 'dining', 'kids']

const Filters = () => {
    return (
        <div className='px-5 flex flex-col items-start justify-center gap-5 md:sticky '>
            <input type="text" placeholder='Search' className='bg-[#F1F5F8] py-2 w-60 px-3 font-normal text-sm rounded-md tracking-widest ' />
            <div>
                <h1 className='text-[#102A42]  font-bold tracking-widest'>Category</h1>
                <ul className='text-[#617D98] text-sm tracking-widest flex flex-col items-start justify-center gap-2 mt-3 cursor-pointer'>

                    {categories.map(category => (
                        <>
                            <li key={category} className='cursor-pointer capitalize ' >{category}</li>
                        </>
                    ))}

                </ul>
            </div>

            <div>
                <h1 className='text-[#102A42] font-bold tracking-widest'>Company</h1>
                <select className='pl-2 py-1 text-sm mt-2 rounded-md w-20'>
                    <option value="all">All</option>
                    <option value="marcos">Marcos</option>
                    <option value="liddy">Liddy</option>
                    <option value="ikea">Ikea</option>
                    <option value="caressa">Caressa</option>
                </select>
            </div>

            <div className='flex flex-col items-start gap-1'>
                <h1 className='text-[#102A42] font-bold tracking-widest'>Price</h1>
                <p className='text-[#324D67]'></p>
                <input type="range" min="0" max="309999" step="any" className='w-40' value="40000" />
            </div>

            <div className='flex items-center justify-between w-[14em]'>
                <label htmlFor="free-shipping">Free Shipping</label>
                <input type="checkbox" id='free-shipping' name='free-shipping' />
            </div>

            <button className='bg-[#BB2525] text-white tracking-widest text-sm py-1 px-3 rounded-md'>Clear Filters</button>
        </div>
    )
}

export default Filters
