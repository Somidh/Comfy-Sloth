import React, { useCallback, useEffect, useState } from "react";
import Header from "../component/Header";
import useProductStore from "../store/productStore";
import CartItem from "../component/CartItem";
import { useNavigate } from "react-router";
import SubTotal from "../component/SubTotal";
import { ClipLoader } from "react-spinners";

const Cart = () => {
  const {
    cartItem,
    setCartItem,
    clearCart,
    fetchCartItem,
    setCartLength,
    removeFromCart,
  } = useProductStore((state) => ({
    cartItem: state.cartItem,
    setCartItem: state.setCartItem,
    clearCart: state.clearCart,
    fetchCartItem: state.fetchCartItem,
    setCartLength: state.setCartLength,
    removeFromCart: state.removeFromCart,
  }));

  const [loading, setLoading] = useState(true);

  const fetchCartItemsCallback = useCallback(async () => {
    const items = await fetchCartItem();
    setCartItem(items);
    setCartLength(items.length);
  }, []);

  useEffect(() => {
    let timeoutId;
    const debouncedFetchCartItems = async () => {
      timeoutId = setTimeout(() => {
        fetchCartItemsCallback();
        setLoading(false);
      }, 500);
    };
    debouncedFetchCartItems();
    return () => clearTimeout(timeoutId);
  }, [fetchCartItemsCallback]);

  const handleDeleteItem = async (itemId) => {
    await removeFromCart(itemId);
    fetchCartItemsCallback();
  };

  const handleClearAll = async () => {
    await clearCart();
    fetchCartItemsCallback();
  };
  let subTotal = 0;

  const navigate = useNavigate();

  const formatPrice = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number / 100);
  };

  const goToProducts = () => {
    navigate("/products");
  };

  return loading ? (
    <div className="flex items-center justify-center mb-20 h-[calc(100vh-167px)]">
      <ClipLoader color="#AB7A5F" size={60} />
    </div>
  ) : cartItem.length === 0 ? (
    <div className="flex flex-col text-center items-center justify-center h-[calc(100vh-167px)] gap-4">
      <h1 className="font-bold text-5xl text-[#102A42] tracking-widest">
        Your cart is empty
      </h1>
      <button
        onClick={goToProducts}
        className="bg-[#AB7A5F] text-[#EADED7] uppercase tracking-widest px-3 py-1 rounded-md"
      >
        fill it
      </button>
    </div>
  ) : (
    <>
      <Header title="Cart" />

      <div className="max-w-[85em] mx-auto px-5 mb-10">
        <ul className="hidden md:grid grid-cols-4 items-center ml-20  text-[#617D98]">
          <li>Item</li>
          <li className="ml-11">Price</li>
          <li className="ml-4">Quantity</li>
          <li>Subtotal</li>
        </ul>

        <hr className="w-full  border-[#bcccdc] hidden my-10 md:block" />

        {cartItem.map((item, idx) => {
          subTotal += item.price * item.quantity;
          return (
            <CartItem
              key={idx}
              formatPrice={formatPrice}
              handleDeleteItem={handleDeleteItem}
              {...item}
            />
          );
        })}

        <hr className="w-full border-[#bcccdc] mt-10" />

        <div className="flex item-center justify-between my-10 gap-2">
          <button
            onClick={goToProducts}
            className="bg-[#AB7A5F] text-white px-3 py-1  tracking-widest rounded-[3px]"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleClearAll}
            className="bg-[#222222] text-white text-sm px-3 py-1 tracking-widest rounded-[3px]"
          >
            Clear Shopping Cart
          </button>
        </div>

        <SubTotal subTotal={subTotal} />
      </div>
    </>
  );
};

export default Cart;
