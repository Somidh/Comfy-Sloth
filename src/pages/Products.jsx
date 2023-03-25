import React, { useEffect, useMemo, useState } from "react";
import Header from "../component/Header";
import Product from "../component/Product";
import { ClipLoader } from "react-spinners";
import useProductStore from "../store/productStore";
import Filters from "../component/Filters";
import ProductList from "../component/ProductList";
import ProductListHeader from "../component/ProductListHeader";
import { supabase } from "../../server/supabase";

const Products = () => {
  const [priceRange, setPriceRange] = useState("309999");
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [isGridView, setIsGridView] = useState(true);

  const { products, fetchProducts, fetchCartItem } = useProductStore(
    (state) => ({
      products: state.products,
      fetchProducts: state.fetchProducts,
      fetchCartItem: state.fetchCartItem,
    })
  );

  useEffect(() => {
    fetchProducts();
  }, []);

 

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data, error } = await supabase.from("products").select();

  //     if (error) {
  //       setFetchError("could not fetch ");
  //       setProducts(null);
  //       console.log(error);
  //     }

  //     if (data) {
  //       setFetchError(null);
  //       setProducts(data);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data, error } = await supabase
  //       .from("products")
  //       .select("*");
  //       if(error) {
  //         console.log("error", error)
  //       }
  //       else {
  //         console.log("data", data)
  //         setProducts(data);
  //       }
  //   };
  //   fetchProducts();
  // }, []);

  // console.log("products", products);

  const formatPrice = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number / 100);
  };

  const price = formatPrice(priceRange);

  return (
    <>
      <Header title="Products" />

      <div className="flex flex-col items-start md:flex-row max-w-[85em] mx-auto ">
        <Filters />

        <div className="flex flex-col w-full  ">
          <ProductListHeader />

          <div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
