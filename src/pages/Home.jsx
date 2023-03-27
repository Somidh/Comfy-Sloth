import React, { useCallback, useEffect, useState } from "react";
import Hero from "../component/Hero";
import FeaturedProducts from "../component/FeaturedProducts";
import HomeAbout from "../component/HomeAbout";
import Subscribe from "../component/Subscribe";
import useProductStore from "../store/productStore";

const Home = () => {
  const { fetchCartItem, setCartLength, setCartItem } = useProductStore(
    (state) => ({
      setCartItem,
      fetchCartItem: state.fetchCartItem,
      setCartLength: state.setCartLength,
    })
  );

  const fetchCartItemsCallback = useCallback(async () => {
    const items = await fetchCartItem();
    setCartItem(items);
    setCartLength(items.length);
  }, []);

  useEffect(() => {
    fetchCartItemsCallback();
  }, [fetchCartItemsCallback]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Hero />
      <FeaturedProducts />
      <HomeAbout />
      <Subscribe />
    </div>
  );
};

export default Home;
