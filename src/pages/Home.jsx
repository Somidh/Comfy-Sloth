import React from 'react'
import Hero from '../component/Hero'
import FeaturedProducts from '../component/FeaturedProducts'
import HomeAbout from '../component/HomeAbout'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <Hero />
      <FeaturedProducts />
      <HomeAbout />
    </div >
  )
}

export default Home
