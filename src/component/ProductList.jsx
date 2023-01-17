import React, { useEffect } from 'react'
import useProductStore from '../store/productStore'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {

    const gridView = true

    const { products, fetchProducts } = useProductStore(state => ({
        products: state.products,
    }))
    if (products.length < 1) {
        return (
            <h2>Sorry, no products matched your search.</h2>
        )
    }

    // console.log("Bing BIng", products)

    return (
        <div>
            {gridView ? <GridView products={products} /> : <ListView products={products} />}
        </div>
    )
}

export default ProductList
