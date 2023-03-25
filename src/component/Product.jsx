import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Product = ({ name, image, price, id }) => {
  const formatPrice = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number / 100);
  };
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/product/${id}`);
  };

  const number = formatPrice(price);

  return (
    <Link to={`/product/${id}`} className="px-5 mx-auto w-full ">
      <div className="product_image relative bg-black">
        <img
          src={image}
          alt="product_image"
          className="w-full h-[12em] bg-center bg-cover rounded-sm object-cover cursor-pointer hover:opacity-50 transition-opacity duration-500 "
        />
        <div className=" search-icon hidden absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#AB7A5F] w-10 h-10  rounded-full cursor-pointer">
          {/* <Link to={`/product/${id}`}> */}
          <FaSearch
            onClick={goToProduct}
            style={{ color: "white", fontSize: "20px" }}
          />
          {/* </Link> */}
        </div>
      </div>

      <div className="flex justify-between items-center my-4">
        <p className="text-[#102A42] tracking-widest capitalize text-sm  md:text-lg ">
          {name}
        </p>
        <span className="text-[#AB7A5F] tracking-widest text-[14px] md:text-[16px]">
          {number}
        </span>
      </div>
    </Link>
  );
};

export default Product;
