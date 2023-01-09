import React from 'react'
import Product from './Product'


const GridView = ( { products } ) => {
  return (
    <div>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  )
}

export default GridView
