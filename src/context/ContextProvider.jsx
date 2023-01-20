import React, { createContext, useContext, useState } from 'react'
import { Navigate } from 'react-router'

const StateContext = createContext()

export const ContextProvider = ({ children }) => {

    const [showNavbar, setShowNavbar] = useState(false)
    const [productDetail, setProductDetail] = useState()
    const [addingCartCount, setAddingCartCount] = useState(1)
    const [cartCount, setCartCount] = useState(0)

    const handleNavbarClick = () => {
        setShowNavbar(prev => !prev)
    }

    const handleAddToCartButton = () => {
        Navigate('/cart')
        setCartCount(prev => prev + 1)
    }

    return (
        <StateContext.Provider
            value={{
                showNavbar,
                setShowNavbar,
                handleNavbarClick,
                productDetail,
                setProductDetail,
                addingCartCount,
                setAddingCartCount,
                handleAddToCartButton,
                cartCount, 
                setCartCount
            }}
        >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)