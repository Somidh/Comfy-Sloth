import React from 'react'
import useProductStore from '../store/productStore'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {


    const { products, gridView, setGridView } = useProductStore(state => ({
        products: state.products,
        gridView: state.gridView,
        setGridView: state.setGridView
    }))

    // console.log(products)
    
    if (products.length < 1) {
        return (
            <h2>Sorry, no products matched your search.</h2>
        )
    }


    return (
        <div>
            {gridView ? <GridView products={products} /> : <ListView products={products} />}
        </div>
    )
}

export default ProductList
