import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { supabase } from "../../server/supabase";
import { useEffect } from "react";

const url = "https://course-api.com/react-store-products";

const useProductStore = create(
  // persist(
  (set, get) => ({
    products: [],
    loading: true,
    cart: [],
    singleProduct: {},
    count: 1,
    gridView: true,

    fetchProducts: async () => {
      // const response = await axios.get(url);
      // set({
      //   loading: false,
      //   products: response.data,
      // });

      // const { data } = await supabase.from("Products").select()
      // set({
      //   loading: false,
      //   products: Products
      // })

      const { data, error } = await supabase.from("products").select();
      if (error) console.log("error", error);
      else {
        // console.log("data",data)
        set({
          loading: false,
          products: data,
        });
      }
    },
    addToCart: (id) => {
      const state = get();
      const item = state.singleProduct;
      // Checking if item is in cart already
      const inCart = state.cart.find((item) => (item.id === id ? true : false));

      set({
        cart: inCart
          ? state.cart.map((item) =>
              item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      });
    },

    removeFromCart: (id) => {
      const state = get();

      set({
        cart: state.cart.filter((item) => item.id != id),
      });
    },

    clearCart: () => {
      set({
        cart: [],
      });
    },

    increaseQty: (id) => {
      const state = get();
      const item = state.cart?.find((item) => item.id === id);
      set({
        item: state.cart.length > 0 ? (item.qty += state.count) : state.count,
      });
    },
    decreaseQty: (id) => {
      const state = get();
      const item = state.cart?.find((item) => item.id === id);

      set({
        item: state.cart.length > 0 ? (item.qty -= 1) : state.count,
      });
    },

    increaseCount: (id) => {
      const state = get();
      const item = state.cart?.find((item) => item.id === id);

      set({
        count: (state.count += 1),
      });
    },
    decreaseCount: (id) => {
      set({
        count: (state.count -= 1),
      });
    },
    setCount: () => {
      const state = get();
      set({
        count: (state.count = 1),
      });
    },

    fetchSingleProduct: async (id) => {
      const res = await axios.get(
        `https://course-api.com/react-store-single-product?id=${id}`
      );

      // const url = `https://course-api.com/react-store-single-product?id=${ids}`;
      // const response = await fetch(url);
      // const productData = await response.json();

      // const {
      //   id,
      //   images,
      //   name,
      //   price,
      //   reviews,
      //   stars,
      //   description,
      //   stock,
      //   company,
      //   qty,
      // } = productData;

      // const { data, error } = await supabase
      //   .from("single-product")
      //   .insert([
      //     {
      //       id,
      //       images,
      //       name,
      //       price,
      //       reviews,
      //       stars,
      //       description,
      //       stock,
      //       company,
      //     },
      //   ])
      // if (error) {
      //   console.error(error);
      // } else {
      //   console.log("data", data);
      //   console.log("data inserted successfully");
      // }
      // console.log("data", data);

      // // console.log("productData", productData);

      // const { fetchData, fetchError } = await supabase
      //   .from("single-product")
      //   .select()
      //   .eq("id", ids);

      //   console.log("fetchData",fetchData)

      set({
        loading: false,
        singleProduct: res.data,
      });
    },

    setGridView: (value) =>
      set(() => ({
        gridView: value,
      })),
  })

  //   {
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
);

export default useProductStore;
