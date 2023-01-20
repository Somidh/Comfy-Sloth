import React from 'react'
import Product from './Product'


const GridView = ( { products } ) => {


  return (
    <div className='grid lg:grid-cols-2 xl:grid-cols-3 w-full mt-10'>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  )
}

export default GridView
