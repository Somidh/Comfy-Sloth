import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Header from '../component/Header'


const AboutProduct = () => {

    const [productDetail, setProductDetail] = useState()
    const navigate = useNavigate()
    const { id } = useParams()



    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://course-api.com/react-store-single-product?id=${id}`)
            const data = await response.json()
            setProductDetail(data)
        }

        fetchData()
    }, [])


    const handleBackClick = () => {
        navigate('/products')
    }
    console.log(productDetail)
    console.log(productDetail?.images[0].url)


    return (
        <div>
            <Header title="Product" productName={productDetail?.name} />

            <div className='px-5'>
                <div>
                    <button onClick={handleBackClick} className='bg-[#AB7A5F] text-[#EADED7] text-[14px] tracking-widest px-3 py-1.5 uppercase rounded-md'>back to products</button>

                    <div>
                        {productDetail?.images.map((img, index) => (
                            <img key={index} src={img.url} alt="image" />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AboutProduct
