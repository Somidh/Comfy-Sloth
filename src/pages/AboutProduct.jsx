import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'


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



    return (
        <div>
            <p>
                {/* <img src={items.image} alt="" /> */}
                {productDetail?.name}
            </p>
        </div>
    )
}

export default AboutProduct
