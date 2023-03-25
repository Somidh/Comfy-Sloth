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
    quantity: 1,

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
    addToCart: async (name, price, userId, productId, image, quantity) => {
      // here

      const { data: cartItems, error } = await supabase
        .from("cartItem")
        .select("*")
        .eq("productId", productId);

      if (error) {
        console.log("Error fetching cart items:", error);
        return;
      }

      if (cartItems.length > 0) {
        const updatedQuantity = cartItems[0].quantity + quantity;

        const { error: updateError } = await supabase
          .from("cartItem")
          .update({ quantity: updatedQuantity })
          .eq("productId", productId)
          .select();

        if (updateError) {
          console.log("Error updating cart item:", updateError);
          return;
        }
        console.log("Cart item updated successfully!");
      } else {
        const { data, error } = await supabase
          .from("cartItem")
          .insert({ name, price, userId, productId, image, quantity });
        if (error) console.log("Error while inserting items:", error);

        console.log("Cart item inserted successfully!");
      }

      // end here
    },

    fetchCartItem: async () => {
      const state = get();
      const user = supabase.auth.getUser();
      const { data, error } = await supabase
        .from("cartItem")
        .select()
        .eq("userId", state.userId);
      if (error) console.log("Error while fetching cart item:", error);
      if (data) {
        console.log("succes item fetching", data);
        set({ cartItem: data });
      }
    },

    removeFromCart: async (productId) => {
      const state = get();

      const { data, error } = await supabase
        .from("cartItem")
        .delete()
        .eq("productId", productId)
        .eq("userId", state.userId)
        .select();

      console.log("some", data);

      if (error) console.log("Error while deleting item:", error);
      console.log("item deleted", data);
      // set({ cartItem: data });

      // set({
      //   cart: state.cart.filter((item) => item.id != id),
      // });
    },

    clearCart: async () => {
      const { data, error } = await supabase
        .from("cartItem")
        .delete()
        .neq("id", 0);

      if (error) {
        console.log("Error deleting cart items:", error);
        return;
      }

      console.log("Cart items deleted successfully!");
    },

    // increaseQty: async (userId) => {
    //   const state = get();
    //   const item = state.cartItem?.find((item) => item.id === id);
    //   set({
    //     item:
    //       state.cartItem.length > 0
    //         ? (item.itemCount += state.itemCount)
    //         : state.itemCount,
    //   });

    //   const { error } = await supabase
    //     .from("cartItem")
    //     .update({ quantity: state.quantity + 1 })
    //     .eq("userId", userId);

    //   if (error) console.log("error while updating count:", error);
    // },
    // decreaseQty: (id) => {
    //   const state = get();
    //   const item = state.cartItem?.find((item) => item.id === id);

    //   set({
    //     item: state.cartItem.length > 0 ? (item.qty -= 1) : state.quantity,
    //   });
    // },

    setQuantity: (newQuantity) => {
      set({
        quantity: newQuantity,
      });
    },

    increaseItemCount: async (newQuantity, productId) => {
      const state = get();
      // const item = state.cartItem?.find((item) => item.id === id);
      const { data, error } = await supabase
        .from("cartItem")
        .update({ quantity: newQuantity + 1 })
        .eq("productId", productId)
        .select();
      if (error) console.log("error while increaseing count:", error);

      if (data) {
        set({
          quantity: (state.quantity += 1),
        });
        console.log(data);
        console.log("updated quantity:", data[0]?.quantity);
      }
    },
    decreaseItemCount: () => {
      const state = get();
      set({
        quantity: (state.quantity -= 1),
      });
    },
    // updateCartCount: async (newQuantity, productId) => {
    //   const { data, error } = await supabase
    //     .from("cartItem")
    //     .update({ quantity: newQuantity })
    //     .eq("productId", productId)
    //     .select();
    //   if (error) console.log("Error while updating quantity:", error);
    //   const { quantity } = data[0];
    //   if (data) {
    //     set({
    //       quantity: newQuantity,
    //     });
    //     console.log("SFJSE:", data[0].quantity);
    //   }
    // },

    // addToCart: async (name, price, userId, productId, image, quantity) => {
    // const { data, error } = await supabase
    // .from("cartItem")
    // .insert({ name, price, userId, productId, image, quantity });
    // if (error) console.log("Error while inserting items:", error);
    // },

    setItemCount: (count) => {
      const state = get();
      set({
        quantity: count,
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

    // handleLogout: async () => {
    //   set({ loading: true });
    //   const { error } = await supabase.auth.signOut();

    //   if (error) console.log("Error signing out:", error);
    //   else console.log("Signed out user!");
    //   set({ loading: false });
    // },
  })

  //   {
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
);

export default useProductStore;
