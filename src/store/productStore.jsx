import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { supabase } from "../../server/supabase";
import { useEffect } from "react";

const url = "https://course-api.com/react-store-products";

const useProductStore = create(
  // persist(
  (set, get) => ({
    // user: {
    //   email: "",
    //   password: "",
    // },
    products: [],
    cartItem: [],
    singleProduct: {},
    user: false,
    userId: "",
    full_name: "",
    email: "",
    password: "",
    loading: true,
    // count: 1,
    gridView: true,
    itemCount: 1,

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
    // addToCart: (id) => {
    //   const state = get();
    //   const item = state.singleProduct;
    //   Checking if item is in cart already
    //   const inCart = state.cart.find((item) => (item.id === id ? true : false));

    //   set({
    //     cart: inCart
    //       ? state.cart.map((item) =>
    //           item.id === id ? { ...item, qty: item.qty + 1 } : item
    //         )
    //       : [...state.cart, { ...item, qty: 1 }],
    //   });
    // },
    addToCart: async (name, price, userId, productId, image, itemCount) => {
      const { data, error } = await supabase
        .from("cartItem")
        .insert({ name, price, userId, productId, image, itemCount });
      if (error) console.log("Error while inserting items:", error);
    },
    fetchCartItem: async () => {

      const state = get();
      const { data, error } = await supabase
        .from("cartItem")
        .select("*")
        .eq("userId", state.userId);
      if (error) console.log("Error while fetching cart item:", error);
      set({ cartItem: data });
      console.log("cartItem:", data.itemCount);
    },

    removeFromCart: async () => {
      const state = get();

      const { data, error } = await supabase
        .from("cartItem")
        .delete()
        .eq("userId", state.userId)
        .eq("productId", state.productId)

      console.log("some", data);

      if (error) console.log("Error while deleting item:", error);
      console.log("item deleted", data);
      set({ cartItem: data });

      // set({
      //   cart: state.cart.filter((item) => item.id != id),
      // });
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
        item:
          state.cart.length > 0
            ? (item.qty += state.temcount)
            : state.itemCount,
      });
    },
    decreaseQty: (id) => {
      const state = get();
      const item = state.cart?.find((item) => item.id === id);

      set({
        item: state.cart.length > 0 ? (item.qty -= 1) : state.itemCount,
      });
    },

    increaseItemCount: (id) => {
      const state = get();
      const item = state.cart?.find((item) => item.id === id);

      set({
        itemCount: (state.itemCount += 1),
      });
    },
    decreaseItemCount: (id) => {
      set({
        itemCount: (state.itemCount -= 1),
      });
    },
    // setCount: () => {
    //   const state = get();
    //   set({
    //     count: (state.count = 1),
    //   });
    // },
    setItemCount: (count) => {
      const state = get();
      set({
        itemCount: count,
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

    // handleUser: (email, password) => {
    //   set({ email: email, password: password });

    //   const state = get();
    //   state.user.email = email;
    //   state.user.password = password;
    // },

    setEmail: (value) => {
      set({ email: value });
    },
    setPassword: (value) => {
      set({ password: value });
    },
    setFullName: (value) => {
      set({ full_name: value });
    },
    setLoading: (value) => {
      set({ loading: value });
    },
    setUser: (value) => {
      set({ user: value });
    },
    setUserId: (id) => {
      set({ userId: id });
    },

    // handleSignup: async (e) => {
    //   e.preventDefault();
    //   set({ loading: true });
    //   const { data, error } = await supabase.auth.signUp({
    //     email: email,
    //     password: password,

    //     options: {
    //       user: {
    //         full_name: full_name,
    //       },
    //     },
    //   });
    //   if (error) console.log("Error signing up:", error);
    //   else console.log("Signed up user:", data);
    //   set({ loading: false });
    // },

    // handleLogin: async (e) => {
    //   e.preventDefault();

    //   set({ loading: true });
    //   const { data, error } = await supabase.auth.signInWithPassword({
    //     email: email,
    //     password: password,
    //   });

    //   if (error) console.log("Error in signing in:", error);
    //   else {
    //     console.log("Signed In user:", data);
    //     navigate("/");
    //   }

    //   set({ loading: false });
    // },

    handleLogout: async () => {
      set({ loading: true });
      const { error } = await supabase.auth.signOut();

      if (error) console.log("Error signing out:", error);
      else console.log("Signed out user!");
      set({ loading: false });
    },
  })

  //   {
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
);

export default useProductStore;
