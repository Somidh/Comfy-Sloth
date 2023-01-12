import React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const url = 'https://course-api.com/react-store-products'
0

const useProductStore = create(
  (set, get) => ({
    products: [],
    loading: false,
    cart: [],
    singleProduct: {},
    fetchProducts: async () => {
      const response = await axios.get('https://course-api.com/react-store-products')
      set(
        {
          loading: false,
          products: response.data
        })
    },
    addToCart: (id) => {
      const state = get()
      const item = state.product.find(product => product.id === id)
      // Checking if item is in cart already
      const inCart = state.cart.find(item => item.id === id ? true : false)

      set({
        cart: inCart
          ?
          state.cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
          :
          [...state.cart, { ...item, qty: 1 }]
      })
    },

    removeFromCart: (id) => {
      const state = get()
      const item = state.cart.find(item => item.id === id)

      set({
        cart: state.cart.filter(item => item.id !== id)
      })
    },

    fetchSingleProduct: async (id) => {
      const res = await axios.get(`https://course-api.com/react-store-single-product?id=${id}`)
      set({
        loading: false,
        singleProduct: res.data
      })
    }
  })
)


export default useProductStore
