import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import useProductStore from "../store/productStore";
import CartItem from "../component/CartItem";
import { useNavigate } from "react-router";
import SubTotal from "../component/SubTotal";
import { useStateContext } from "../context/ContextProvider";
import { useAuth } from "../component/AuthProvider";

const Cart = () => {
  const { cartItem, clearCart, fetchCartItem } = useProductStore((state) => ({
    cartItem: state.cartItem,
    clearCart: state.clearCart,
    fetchCartItem: state.fetchCartItem,
  }));

  const { user } = useAuth();
  console.log("cart user:", user?.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    fetchCartItem(user?.id);

    return () => clearTimeout(timer);
  }, []);

  console.log("cartItems:", cartItem);
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
    "loading"
  ) : cartItem.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-[82vh] gap-4">
      <h1 className="font-bold text-5xl text-[#102A42] tracking-widest">
        Your cart is empty
      </h1>
      <button
        onClick={goToProducts}
        className="bg-[#AB7A5F] text-[#EADED7]  uppercase  tracking-widest px-3 py-1 rounded-md"
      >
        fill it
      </button>
    </div>
  ) : (
    <>
      <Header title="Cart" />

      <div className="max-w-[85em] mx-auto px-5 mb-10">
        <ul className="hidden md:grid grid-cols-4 items-center ml-20 px-5 text-[#617D98]">
          <li>Item</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Subtotal</li>
        </ul>

        <hr className="w-full  border-[#bcccdc] hidden my-10 md:block" />

        {cartItem.map((item, idx) => {
          subTotal += item.price * item.quantity;
          // console.log(item)
          return <CartItem key={idx} formatPrice={formatPrice} {...item} />;
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
            onClick={clearCart}
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
