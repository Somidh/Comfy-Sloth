import React from 'react'
import useProductStore from '../store/productStore'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {


    const { products } = useProductStore(state => ({
        products: state.products,
    }))

    
    if (products.length < 1) {
        return (
            <h2>Sorry, no products matched your search.</h2>
        )
    }


    return (
        <div>
            {true ? <GridView products={products} /> : <ListView products={products} />}
        </div>
    )
}

export default ProductList
