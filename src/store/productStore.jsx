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
      cartAmount: 1,
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
        // const item = state.cart.find(item => item.id === id)

        set({
          cart: state.cart.filter(item => item.id != id)
        })
      },
      increaseQty: (id) => {
        const state = get()
        const item = state.cart?.find(item => item.id === id)
        console.log(state)
          set({
            
          })
      },
      decreaseQty: (id) => {
        const state = get()
        const item = state.cart?.find(item => item.id === id)

          set({
            cartAmount: state.cart.length > 0 ?  item.qty -= 1 : state.cartAmount -= 1
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
