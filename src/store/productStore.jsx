import React from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import axios from 'axios'

const url = 'https://course-api.com/react-store-products'


// const useProductStoree = create(persist(
//   set,get => ({

//   })
// ))

const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      loading: true,
      cart: [],
      singleProduct: {},
      amount: 0,
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
        const item = state.singleProduct
        // Checking if item is in cart already
        const inCart = state.cart.find(item => item.id === id ? true : false)

        set({
          cart: inCart
            ?
            state.cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
            :
            [...state.cart, { ...item, qty: 1 }],
        })
      },

      removeFromCart: (id) => {
        const state = get()
        const item = state.cart.find(item => item.id === id)

        set({
          cart: state.cart.filter(item => item.id != id)
        })
      },
      increaseAmount: (id) => {
        const state = get()
        const item = state.cart.find(item => item.id === id)
          set({
            amount: item.qty + amount
          })
      },
      decreaseAmount: (id) => {
        const state = get()
        const item = state.cart.find(item => item.id === id)
          set({
            amount: item.qty - amount
          })
      },

      fetchSingleProduct: async (id) => {
        const res = await axios.get(`https://course-api.com/react-store-single-product?id=${id}`)
        set({
          loading: false,
          singleProduct: res.data
        })
      }
    }),

    {
      storage: createJSONStorage(() => sessionStorage)
    }
  ))


export default useProductStore
