import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const ContextProvider = ({ children }) => {

    const [showNavbar, setShowNavbar] = useState(false)

    const handleNavbarClick = () => {
        setShowNavbar(prev => !prev)
    }

    return (
        <StateContext.Provider
            value={{
                showNavbar,
                setShowNavbar,
                handleNavbarClick
            }}
        >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)