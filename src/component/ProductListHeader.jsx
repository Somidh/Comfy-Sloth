import React from 'react'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MenuIcon from '@mui/icons-material/Menu';

const ProductListHeader = () => {

 
    return (
        <div className='view_section mt-10 flex flex-col px-5 items-start gap-3'>
            <div className='flex items-center gap-2 '>
                <GridViewRoundedIcon  style={{ color: 'white', backgroundColor: 'black', padding: '2px', borderRadius: '4px', cursor: 'pointer' }} />
                <MenuIcon  style={{ border: '1px solid black', padding: '2px', borderRadius: '4px', cursor: 'pointer' }} />
            </div>
            <p className='text-[#324D67] text-sm tracking-wide'>20 Products Found</p>
            <div className='line h-[1px] w-full bg-[#bcccdc]' />
            <div className='tracking-wide flex items-center justify-center gap-2 '>
                <h1>Sort By</h1>
                <select className='pl-3 py-2 text-base  rounded-md w-36 '>
                    <option value="lowest">Price (Lowest)</option>
                    <option value="highest">Price (Highest)</option>
                    <option value="a-z">Name (A-Z)</option>
                    <option value="z-a">Name (Z-A)</option>
                </select>
            </div>
        </div>
    )
}

export default ProductListHeader
