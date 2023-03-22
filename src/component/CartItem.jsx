import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import useProductStore from '../store/productStore';


const CartItem = ({ name, image, price, qty, formatPrice, stock, id, itemCount }) => {

    const { removeFromCart, increaseQty, decreaseQty, setItemCount, fetchCartItem } = useProductStore(state => ({
        removeFromCart: state.removeFromCart,
        increaseQty: state.increaseQty,
        decreaseQty: state.decreaseQty,
        setItemCount: state.setItemCount,
        fetchCartItem: state.fetchCartItem
    }))


    useEffect(() => {
        setItemCount()
    }, [])
    useEffect(() => {
        fetchCartItem();
      }, []);



    const increase = () => {
        stock > qty && increaseQty(id)
    }
    const decrease = () => {
        qty > 1 && decreaseQty(id)
    }

    const handleDelete = () => {
        removeFromCart()
    }

    return (
        <div className='flex items-center justify-between mb-10 '>
            <div className='flex items-center gap-4 w-52'>
                <img src={image} alt="" className='w-20 h-20 rounded-md' />
                <div>
                    <p className='text-[#102A42] text-sm w-full capitalize font-bold tracking-widest '>{name}</p>
                    <span className='text-[#AB7A5F]'>{formatPrice(price)}</span>
                </div>
            </div>

            <span className=' text-[#AB7A5F] hidden md:block'>{formatPrice(price)}</span>

            <div className='flex items-center gap-5 '>
                <span onClick={decrease} className='text-3xl md:text-4xl cursor-pointer font-medium'>-</span>
                <span className='text-[#102A42] font-bold text-3xl md:text-4xl'>{itemCount}</span>
                <span onClick={increase} className='text-xl md:text-2xl font-bold cursor-pointer'>+</span>
            </div>

            <div className='hidden md:block'>
                <span className='text-[#617D98]'>{formatPrice(price * itemCount)}</span>
            </div>
            <DeleteIcon onClick={handleDelete} style={{ color: 'white', backgroundColor: '#BB2525', padding: '3px 3px', fontSize: '25px', cursor: 'pointer', borderRadius: '5px' }} />
        </div>
    )
}

export default CartItem
