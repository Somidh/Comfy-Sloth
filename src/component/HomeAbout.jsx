import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'


const HomeAbout = () => {
    return (
        <div className='bg-[#EADED7] w-full px-5 py-20'>
            <div className=''>
                <div className='flex flex-col items-start justify-start gap-5 mb-20'>
                    <h1 className='text-[#453227] text-2xl font-bold tracking-wider capitalize'>custom furniture <br /> built only for you</h1>
                    <p className='text-[#795744]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur reprehenderit non aliquam voluptates dolore aut vero consequuntur.</p>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className=' bg-[#C5A491] flex flex-col items-center justify-center gap-3 py-10 px-8 text-center '>
                        <span className='bg-[#EADED7] text-3xl w-16 h-16 rounded-full text-center flex items-center justify-center'><GiCompass /></span>
                        <h1 className='text-[#453227] text-xl font-bold capitalize tracking-widest '>mission</h1>
                        <p className='text-[#795744] leading-[1.7rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p>
                    </div>
                    <div className=' bg-[#C5A491] flex flex-col items-center justify-center gap-3 py-10 px-8 text-center '>
                        <span className='bg-[#EADED7] text-3xl w-16 h-16 rounded-full text-center flex items-center justify-center'><GiDiamondHard /></span>
                        <h1 className='text-[#453227] text-xl font-bold capitalize tracking-widest '>vision</h1>
                        <p className='text-[#795744] leading-[1.7rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p>
                    </div>
                    <div className=' bg-[#C5A491] flex flex-col items-center justify-center gap-3 py-10 px-8 text-center '>
                        <span className='bg-[#EADED7] text-3xl w-16 h-16 rounded-full text-center flex items-center justify-center'><GiStabbedNote /></span>
                        <h1 className='text-[#453227] text-xl font-bold capitalize tracking-widest '>history</h1>
                        <p className='text-[#795744] leading-[1.7rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAbout
