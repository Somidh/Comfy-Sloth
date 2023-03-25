import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assests/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../context/ContextProvider";
import useProductStore from "../store/productStore";
import { supabase } from "../../server/supabase";

const Navbar = () => {
  const { cartItem, setLoading, fetchCartItem } = useProductStore((state) => ({
    cartItem: state.cartItem,
   
    setLoading: state.setLoading,
    fetchCartItem: state.fetchCartItem,
  }));

  const { user, handleNavbarClick, signOut } = useAuth();

  // useEffect(() => {
  //   if (!user) {
  //     console.log("not User");
  //   }
  //   fetchCartItem(user?.id);
  // }, [user]);

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  // const handleLogout = async () => {
  //   setLoading(true);
  //   const { error } = await supabase.auth.signOut();

  //   if (error) console.log("Error signing out:", error);
  //   else console.log("Signed out user!");

  //   alert("Sign out succesful");
  //   navigate("/");
  //   setLoading(false);
  // };

  const handleLogout = () => {
    signOut();
    navigate('/')
    alert("Succesfully sign out")
  };

  return (
    <div className="flex items-center justify-between max-w-[85em] mx-auto px-5 py-4 ">
      <img src={Logo} alt="logo" className="w-[10em] " />

      <div className="hidden lg:flex items-center gap-28 tracking-widest text-[#324D67] ">
        <Link
          className="cursor-pointer hover:underline decoration-[#AB7A5F] decoration-2 underline-offset-8"
          to="/"
        >
          Home
        </Link>
        <Link
          className="cursor-pointer hover:underline decoration-[#AB7A5F] decoration-2 underline-offset-8"
          to="/about"
        >
          About
        </Link>
        <Link
          className="cursor-pointer hover:underline decoration-[#AB7A5F] decoration-2 underline-offset-8"
          to="/products"
        >
          Products
        </Link>
      </div>
      <div className="lg:hidden">
        <MenuIcon
          onClick={handleNavbarClick}
          fontSize="large"
          className=" text-[#AB7A5F]"
        />
      </div>

      <div className=" items-center justify-center gap-5 hidden lg:flex">
        <div
          onClick={handleCartClick}
          className="flex items-center justify-center gap-2 cursor-pointer relative"
        >
          <h2 className="text-[25px] ">Cart</h2>
          <ShoppingCartIcon fontSize="medium" />
          <span className="w-5 h-5 bg-[#AB7A5F] rounded-full absolute -right-2 -top-1 flex items-center justify-center text-white text-sm">
            {cartItem.length}
          </span>
        </div>
        <Link
          to={!user && "/login"}
          onClick={user && handleLogout}
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <h2 className="text-[25px]">{user ? "Logout" : "Login"} </h2>
          <div className="flex items-center ">
            <PersonIcon fontSize="medium" />
            <span className="font-medium text-2xl">-</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
