import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Product from '../component/Product';


const Products = () => {

  const [priceRange, setPriceRange] = useState('0')
  const [items, setItems] = useState([])
  // const [filteredItems, ] = useState(items)


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://course-api.com/react-store-products')
      const data = await response.json()
      setItems(data)
    }

    fetchData()
  }, [])
  
  console.log(items)


  const filterAll = () => {
    setItems(items)
  }

  const officeFilter = () => {
    setItems(items.filter(item => item.category === 'office'))

  }
  const livingRoomFilter = () => {
    setItems(items.filter(item => item.category === 'living room'))
  }
  const kitchenFilter = () => {
    setItems(items.filter(item => item.category === 'kitchen'))
  }
  const bedroomFilter = () => {
    setItems(items.filter(item => item.category === 'bedroom'))
  }
  const diningFilter = () => {
    setItems(items.filter(item => item.category === 'dining'))
  }
  const kidsFilter = () => {
    setItems(items.filter(item => item.category === 'kids'))
  }


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
      <div className='flex flex-col items-start md:flex-row max-w-[85em] mx-auto '>

        <div className='px-5 flex flex-col items-start justify-center gap-5'>
          <input type="text" placeholder='Search' className='bg-[#F1F5F8] py-2 w-60 px-3 font-normal text-sm rounded-md tracking-widest ' />
          <div>
            <h1 className='text-[#102A42]  font-bold tracking-widest'>Category</h1>
            <ul className='text-[#617D98] text-sm tracking-widest flex flex-col items-start justify-center gap-2 mt-3 cursor-pointer'>
              <li onClick={filterAll}>All</li>
              <li onClick={officeFilter} >office</li>
              <li onClick={livingRoomFilter}>Living Room</li>
              <li onClick={kitchenFilter}>Kitchen</li>
              <li onClick={bedroomFilter}>Bedroom</li>
              <li onClick={diningFilter}>Dining</li>
              <li onClick={kidsFilter}>Kids</li>
            </ul>
          </div>

          <div>
            <h1 className='text-[#102A42] font-bold tracking-widest'>Company</h1>
            <select className='pl-2 py-1 text-sm mt-2 rounded-md w-20'>
              <option value="all">All</option>
              <option value="marcos">Marcos</option>
              <option value="liddy">Liddy</option>
              <option value="ikea">Ikea</option>
              <option value="caressa">Caressa</option>
            </select>
          </div>

          <div className='flex flex-col items-start gap-1'>
            <h1 className='text-[#102A42] font-bold tracking-widest'>Price</h1>
            <p className='text-[#324D67]'>{price}</p>
            <input onChange={e => setPriceRange(e.target.value)} type="range" min="0" max="309999" step="any" className='w-40' />
          </div>

          <div className='flex items-center justify-between w-[14em]'>
            <label htmlFor="free-shipping">Free Shipping</label>
            <input type="checkbox" id='free-shipping' name='free-shipping' />
          </div>

          <button className='bg-[#BB2525] text-white tracking-widest text-sm py-1 px-3 rounded-md'>Clear Filters</button>
        </div>

        <div className='flex flex-col w-full '>
          <div className='view_section mt-10 flex flex-col px-5 items-start gap-3'>
            <div className='flex items-center gap-2 '>
              <GridViewRoundedIcon style={{ color: 'white', backgroundColor: 'black', padding: '2px', borderRadius: '4px', cursor: 'pointer' }} />
              <MenuIcon style={{ border: '1px solid black', padding: '2px', borderRadius: '4px', cursor: 'pointer' }} />
            </div>
            <p className='text-[#324D67] text-sm tracking-wide'>20 Products Found</p>
            <div className='line h-[1px] w-full bg-[#bcccdc]' />
            <div className='tracking-wide flex items-center justify-center gap-2 '>
              <h1>Sort By</h1>
              <select className='pl-3 py-2 text-base  rounded-md w-36 '>
                <option value="lowest">Price (Lowest)</option>
                <option value="highest">Price (Highest)</option>
                <option value="a-z">Name (A-Z)</option>
                <option value="z-a">Name (Z-A)</option>
              </select>
            </div>
          </div>

          <div className='mt-10 grid lg:grid-cols-2 xl:grid-cols-3 '>
            {items.map(item => (
              <Product
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
