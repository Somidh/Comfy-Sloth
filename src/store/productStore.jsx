import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import axios from 'axios'

const url = 'https://course-api.com/react-store-products'


const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      loading: true,
      cart: [],
      singleProduct: {},
      count: 1,
   

      fetchProducts: async () => {
        const response = await axios.get(url)
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
        

        set({
          cart: state.cart.filter(item => item.id != id)
        })
      },

      clearCart: () => {
        const state = get()

        set({
          cart: []
        })
      },
      
      increaseQty: (id) => {
        const state = get()
        const item = state.cart?.find(item => item.id === id)
        set({
          item: state.cart.length > 0 ? item.qty += state.count : state.count
        })
      },
      decreaseQty: (id) => {
        const state = get()
        const item = state.cart?.find(item => item.id === id)

        set({
          item: state.cart.length > 0  ? item.qty -= 1 : state.count
        })
      },

      increaseCount: (id) => {
        const state = get()
        const item = state.cart?.find(item => item.id === id)

        set({
          count: state.count += 1
        })
      },
      decreaseCount: (id) => {
        set({
          count: state.count -= 1
        })
      },
      setCount: () => {
        const state = get()
        set({
          count: state.count = 1
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
