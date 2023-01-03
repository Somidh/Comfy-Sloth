import React, { useEffect, useState } from 'react'
import Product from './Product'

const GridView = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://course-api.com/react-store-products')
            const data = await response.json()
            setItems(data)
        }

        fetchData()
    }, [])

    console.log(items)

    return (
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
    )
}

export default GridView
