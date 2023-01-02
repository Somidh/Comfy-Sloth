import React, { useState } from 'react'
import Header from '../component/Header'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MenuIcon from '@mui/icons-material/Menu';


const Products = () => {

  const [priceRange, setPriceRange] = useState('0')

  const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number / 100)
  }

  const price = formatPrice(priceRange)


  console.log(priceRange)

  return (
    <div>
      <Header title="Products" />

      <div>
        <input type="text" placeholder='Search' />
        <div>
          <h1>Category</h1>
          <ul>
            <li>All</li>
            <li>office</li>
            <li>Living Room</li>
            <li>Kitchen</li>
            <li>Bedroom</li>
            <li>Dining</li>
            <li>Kids</li>
          </ul>
        </div>

        <div>
          <h1>Company</h1>
          <select className='pl-1'>
            <option value="all">All</option>
            <option value="marcos">Marcos</option>
            <option value="liddy">Liddy</option>
            <option value="ikea">Ikea</option>
            <option value="caressa">Caressa</option>
          </select>
        </div>

        <div>
          <h1>Price</h1>
          <input onChange={e => setPriceRange(e.target.value)} type="range" min="0" max="309999" step="any" />
          <p>{price}</p>
        </div>

        <div>
          <label htmlFor="free-shipping">Free Shipping</label>
          <input type="checkbox" id='free-shipping' name='free-shipping' />
        </div>

        <button>Clear Filters</button>
      </div>


      <div>
        <div>
          <GridViewRoundedIcon style={{color: 'black'}} />
          <MenuIcon />
        </div>
        <p>20 Products found</p>
        <div className='h-1 w-full bg-black' />
        <div>
          Sort By
          <select className='pl-1'>
            <option value="lowest">Price (Lowest)</option>
            <option value="highest">Price (Highest)</option>
            <option value="a-z">Name (A-Z)</option>
            <option value="z-a">Name (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Products
