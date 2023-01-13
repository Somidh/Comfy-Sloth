import React from 'react'
import useProductStore from '../store/productStore'
import Product from './Product'


const GridView = ( { products } ) => {

  // const products = useProductStore(state => state.Products)

  return (
    <div className='grid lg:grid-cols-2 xl:grid-cols-3 w-full mt-10'>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  )
}

export default GridView
