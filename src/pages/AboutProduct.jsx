import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Header from '../component/Header'
import Stars from '../component/Stars'
import { ClipLoader } from 'react-spinners'
import useProductStore from '../store/productStore'
import { v4 as uuidv4 } from 'uuid';


const AboutProduct = () => {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()


    const {
        fetchSingleProduct,
        singleProduct,
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        count,
        increaseCount,
        decreaseCount,
        setCount } = useProductStore(state => ({

            fetchSingleProduct: state.fetchSingleProduct,
            singleProduct: state.singleProduct,
            cart: state.cart,
            addToCart: state.addToCart,
            increaseQty: state.increaseQty,
            decreaseQty: state.decreaseQty,
            count: state.count,
            increaseCount: state.increaseCount,
            decreaseCount: state.decreaseCount,
            setCount: state.setCount
        }))

    const {
        images,
        name,
        price,
        reviews,
        stars,
        description,
        stock,
        company,
        qty } = singleProduct

    const handleIncrease = () => {
        count < stock && increaseCount(id)
        increaseQty(id)
    }

    const handleDecrease = () => {
        count > 1 && decreaseCount(id)
        decreaseQty(id)
    }


    useEffect(() => {
        setCount(1)
    }, [])


    useEffect(() => {
        let timer = setTimeout(() => {
            setLoading(false)
        }, 500);

        fetchSingleProduct(id)

        return () => clearTimeout(timer)
    }, [])



    const handleAddToCartButton = () => {
        navigate('/cart')
        addToCart(id)
    }
    const handleBackClick = () => {
        navigate('/products')
    }


    const formatPrice = (number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(number / 100)
    }

    const formatedPrice = formatPrice(price)


    return (
        <div>
            <Header title="Product" productName={name} />

            {loading ? <div className='flex items-center justify-center mb-20'>
                <ClipLoader color="#AB7A5F" size={60} />
            </div> :

                <div className='px-5 mb-20 grid lg:grid-cols-2 gap-10 max-w-[85em] mx-auto'>
                    <div className='flex flex-col items-start gap-5' >
                        <button onClick={handleBackClick} className='bg-[#AB7A5F] text-[#EADED7] text-[14px] tracking-widest px-3 py-1.5 uppercase rounded-md'>back to products</button>

                        <div className='grid grid-rows-1 w-full ' >
                            <img className='bg-cover object-cover w-full  sm:h-[500px] lg:- mb-3 rounded-sm' src={images[0]?.url} alt="" />
                            <div className='grid grid-cols-5 gap-[1rem]'>
                                {images?.map((img, index) => (
                                    <img className='object-cover cursor-pointer h-[50px] sm:h-[100px] lg:h-[80px] w-full rounded-sm' key={index} src={img.url} alt="image" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='mt-20 flex flex-col items-start gap-2'>
                        <h1 className='text-[#102A42] font-bold text-3xl md:text-4xl capitalize' >{name}</h1>
                        <Stars key={uuidv4()} stars={stars} reviews={reviews} />
                        <span className='text-[#AB7A5F] font-bold tracking-widest md:text-lg'>{formatedPrice}</span>
                        <p className='text-[#324D67] text-sm md:text-base leading-7 md:leading-8'>{description}</p>

                        <div className='flex flex-col gap-4 text-[#324D67] mt-5 md:text-lg'>
                            <p className='grid grid-cols-2'>
                                <span className='font-bold '>Available:</span>
                                <span className={`${stock > 0 ? 'text-[green]' : 'text-[red]'}`}>{stock > 0 ? 'In Stock' : 'Out Of Stock'}</span>

                            </p>
                            <p className='grid grid-cols-2 capitalize'>
                                <span className='font-bold'>SKU:</span>
                                {singleProduct?.id}
                            </p>
                            <p className='grid grid-cols-2 capitalize'>
                                <span className='font-bold'>Brand:</span>
                                {company}
                            </p>
                        </div>
                        <hr className='w-full my-5' />

                        {stock > 0 &&
                            <div className='flex flex-col items-center gap-3'>
                                <div className='flex items-center gap-5 '>
                                    <span onClick={handleDecrease} className='text-3xl md:text-4xl cursor-pointer font-medium'>-</span>
                                    <span className='text-[#102A42] font-bold text-3xl md:text-4xl'>{count}</span>
                                    <span onClick={handleIncrease} className='text-xl md:text-2xl font-bold cursor-pointer'>+</span>
                                </div>

                                <button onClick={handleAddToCartButton} className='bg-[#ab7a5f] text-[#EADED7] text-[14px] tracking-widest px-5 py-1.5 uppercase rounded-md'>add to cart</button>

                            </div>
                        }

                    </div>

                </div>
            }

        </div>
    )
}

export default AboutProduct
