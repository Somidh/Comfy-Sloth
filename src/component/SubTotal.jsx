import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/ContextProvider";
import { Link } from "react-router-dom";

const SubTotal = ({ subTotal }) => {

  const navigate = useNavigate();

  const formatPrice = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number / 100);
  };

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const formatedPrice = formatPrice(subTotal);
  const orderTotal = formatPrice(subTotal + 500);

  return (
    <div className="flex justify-center md:justify-end w-full  ">
      <div className="flex flex-col item-center justify-center w-[24em]">
        <div className="border-2 px-8 py-3">
          <div className="flex flex-col gap-2 ">
            <div className="text-[#102A42] text-base md:text-lg flex items-center justify-between font-semibold tracking-widest">
              <p className="">Subtotal: </p>
              <span>{formatedPrice}</span>
            </div>
            <div className="text-[#324D67] flex items-center justify-between">
              <p className="">Shipping Fee: </p>
              <span>$5.00</span>
            </div>
          </div>
          <hr className="w-full border-[#bcccdc] my-5" />

          <div className="text-[#102A42] text-xl md:text-2xl tracking-widest flex items-center justify-between font-bold ">
            <p className="">Order Total: </p>
            <span>{orderTotal}</span>
          </div>
        </div>

        <Link
          role="link"
          to={user ? "/cart" : "/login"}
          className="bg-[#AB7A5F] text-center text-white text-sm mt-5 py-2 rounded-sm uppercase font-medium tracking-widest"
        >
          {user ? "Procees To Checkout" : "Login"}
        </Link>
      </div>
    </div>
  );
};

export default SubTotal;
