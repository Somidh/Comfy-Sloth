import React, { useEffect, useMemo, useState } from 'react'
import Header from '../component/Header'
import Product from '../component/Product';
import { ClipLoader } from 'react-spinners'
import useProductStore from '../store/productStore';
import Filters from '../component/Filters';
import ProductList from '../component/ProductList';
import ProductListHeader from '../component/ProductListHeader';





const Products = () => {

  const [priceRange, setPriceRange] = useState('309999')
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('All')
  const [isGridView, setIsGridView] = useState(true)
  const [loading, setLoading] = useState(true)

  // const products = useProductStore(state => state.products)
  // const fetchProducts = useProductStore(state => state.fetchProducts)
  // const singleProduct = useProductStore(state => state.singleProduct)

  const { products, fetchProducts } = useProductStore(state => ({
    products: state.products,
    fetchProducts: state.fetchProducts,
    // fetchSingleProduct: state.fetchSingleProduct,
    // singleProduct: state.singleProduct
  }))



  useEffect(() => {
    fetchProducts()
  }, [])


  console.log("here goes product", products)

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const response = await fetch('https://course-api.com/react-store-products')
  //     const data = await response.json()
  //     setItems(data)
  //     setLoading(false)
  //   }

  //   fetchData()
  // }, [])

  const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number / 100)
  }

  const price = formatPrice(priceRange)

  return (
    <>
      <Header title="Products" />
      {/* {loading ? <div className='flex items-center justify-center mb-20'>
        <ClipLoader color="#AB7A5F" size={60} />
      </div> : */}

      <div className='flex flex-col items-start md:flex-row max-w-[85em] mx-auto '>
        <Filters />

        <div className='flex flex-col w-full  '>
          <ProductListHeader />

          <div>
            <ProductList products={products} />

            {/* {
                items
                  .filter(item => !selectedCategory || item.category === selectedCategory || selectedCategory === 'All' || item.company === selectedCompany || selectedCompany === 'all')
                  .map(item => (
                    <Product
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      description={item.description}
                      isGridView={isGridView}
                      id={item.id}
                    />
                  ))
              } */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
