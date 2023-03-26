import { create } from "zustand";
import axios from "axios";
import { supabase } from "../../server/supabase";
import { useAuth } from "../context/ContextProvider";

const useProductStore = create((set, get) => ({
  products: [],
  cartItem: [],
  singleProduct: {},
  user: false,
  userId: "",
  full_name: "",
  email: "",
  password: "",
  loading: true,
  gridView: true,
  quantity: 1,
  showSidebar: false,

  setShowSidebar: (value) => {
    set({
      showSidebar: value,
    });
  },

  // setSome: () => {
  //   const { user } = useAuth();
  //   set({
  //     userId: user.id,
  //   });
  // },

  fetchProducts: async () => {
    const { data, error } = await supabase.from("products").select();
    if (error) console.log("error", error);
    else {
      set({
        loading: false,
        products: data,
      });
    }
  },
  addToCart: async (name, price, userId, productId, image, quantity, stock) => {
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
        .insert({ name, price, userId, productId, image, quantity, stock })
        .select();
      if (error) console.log("Error while inserting items:", error);

      console.log("Cart item inserted successfully!");
    }
  },

  fetchCartItem: async () => {
    const state = get();
    const userId = state.userId;
    const { data, error } = await supabase
      .from("cartItem")
      .select()
      .eq("userId", userId);
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
    }
  },
  decreaseItemCount: async (newQuantity, productId) => {
    const state = get();
    // const item = state.cartItem?.find((item) => item.id === id);
    const { data, error } = await supabase
      .from("cartItem")
      .update({ quantity: newQuantity - 1 })
      .eq("productId", productId)
      .select();
    if (error) console.log("error while increaseing count:", error);

    if (data) {
      set({
        quantity: (state.quantity -= 1),
      });
      console.log(data);
    }
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

    set({
      loading: false,
      singleProduct: res.data,
    });
  },

  setGridView: (value) =>
    set(() => ({
      gridView: value,
    })),
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
}));

export default useProductStore;
