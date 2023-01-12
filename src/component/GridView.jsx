import React from 'react'
import useProductStore from '../store/productStore'
import Product from './Product'


const GridView = ( { products } ) => {

  // const products = useProductStore(state => state.Products)

  return (
    <div>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  )
}

export default GridView
