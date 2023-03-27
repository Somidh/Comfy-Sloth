import { create } from "zustand";
import axios from "axios";
import { supabase } from "../../server/supabase";

const useProductStore = create((set, get) => ({
  products: [],
  cartItem: [],
  cartLength: 0,
  singleProduct: {},
  filteredProducts: [],
  quantity: 1,
  userId: "",
  full_name: "",
  email: "",
  password: "",
  gridView: true,
  showSidebar: false,
  selectedCategory: null,
  selectedBrand: "",
  selectedPrice: 309999,
  setFilteredProducts: (filteredProducts) => set(() => ({ filteredProducts })),
  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),
  setSelectedBrand: (brand) => set(() => ({ selectedBrand: brand })),
  setSelectedPrice: (price) => set(() => ({ selectedPrice: price })),

  fetchProducts: async () => {
    const { data, error } = await supabase.from("products").select();
    if (error) console.log("error", error);
    else {
      set({
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
      .eq("userId", userId)
      .select();
    if (error) console.log("Error while fetching cart item:", error);
    if (data) {
      console.log("succes item fetching", data);
      return data;
      // set({ cartItem: data });
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
    return data;
  },

  clearCart: async () => {
    const { data, error } = await supabase
      .from("cartItem")
      .delete()
      .neq("id", 0)
      .select();

    if (error) {
      console.log("Error deleting cart items:", error);
      return;
    }
    return data;
  },

  setQuantity: (newQuantity) => {
    set({
      quantity: newQuantity,
    });
  },

  increaseItemCount: async (newQuantity, productId) => {
    const state = get();
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
    }
  },
  decreaseItemCount: async (newQuantity, productId) => {
    const state = get();
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
    }
  },

  setItemCount: (count) => {
    set({
      quantity: count,
    });
  },

  fetchSingleProduct: async (id) => {
    const res = await axios.get(
      `https://course-api.com/react-store-single-product?id=${id}`
    );

    set({
      singleProduct: res.data,
    });
  },
  setCartItem: (item) => {
    set({
      cartItem: item,
    });
  },
  setShowSidebar: (value) => {
    set({
      showSidebar: value,
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
  setUserId: (id) => {
    set({ userId: id });
  },
  setCartLength: (value) => {
    set({ cartLength: value });
  },
}));

export default useProductStore;
