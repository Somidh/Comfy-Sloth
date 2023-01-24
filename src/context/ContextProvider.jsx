import React, { createContext, useContext, useState, useEffect } from 'react'
import { Navigate } from 'react-router'

const StateContext = createContext()

export const ContextProvider = ({ children }) => {

    const [showNavbar, setShowNavbar] = useState(false)
    const [cartCount, setCartCount] = useState(0)

    const handleNavbarClick = () => {
        setShowNavbar(prev => !prev)
    }

    const handleAddToCartButton = () => {
        Navigate('/cart')
        setCartCount(prev => prev + 1)
    }


    const [token, setToken] = useState(false)

    token && sessionStorage.setItem('token', JSON.stringify(token))

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            let data = JSON.parse(sessionStorage.getItem('token'))
            setToken(data)
        }
    }, [])

    return (
        <StateContext.Provider
            value={{
                showNavbar,
                setShowNavbar,
                handleNavbarClick,
                handleAddToCartButton,
                cartCount,
                setCartCount,
                token,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)