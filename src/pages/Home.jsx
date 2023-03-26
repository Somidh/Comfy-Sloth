import React, { useEffect } from 'react'
import Hero from '../component/Hero'
import FeaturedProducts from '../component/FeaturedProducts'
import HomeAbout from '../component/HomeAbout'
import Subscribe from '../component/Subscribe'
import useProductStore from '../store/productStore'

const Home = () => {
  const { fetchCartItem } = useProductStore((state) => ({
    fetchCartItem: state.fetchCartItem,
  }));

  useEffect(() => {
    fetchCartItem();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <Hero />
      <FeaturedProducts />
      <HomeAbout />
      <Subscribe />
    </div >
  )
}

export default Home
