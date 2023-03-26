import React from "react";
import useProductStore from "../store/productStore";

const categories = [
  "office",
  "living room",
  "kitchen",
  "bedroom",
  "dining",
  "kids",
];

const Filters = () => {
  const {
    products,
    setSelectedCategory,
    setSelectedBrand,
    setSelectedPrice,
    selectedPrice,
    selectedBrand,
    selectedCategory,
    setFilteredProducts,
  } = useProductStore((state) => ({
    setSelectedCategory: state.setSelectedCategory,
    setSelectedBrand: state.setSelectedBrand,
    setSelectedPrice: state.setSelectedPrice,
    selectedPrice: state.selectedPrice,
    selectedCategory: state.selectedCategory,
    selectedBrand: state.selectedBrand,
    products: state.products,
    setFilteredProducts: state.setFilteredProducts,
  }));

  function handleSelectBrand(event) {
    setSelectedBrand(event.target.value);
  }
  function handleSelectPrice(event) {
    setSelectedPrice(parseInt(event.target.value));
  }
  function handleClearFilter() {
    setFilteredProducts(products);
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedPrice(309999);
  }

  const formatPrice = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number / 100);
  };

  const formatedPrice = formatPrice(selectedPrice);

  return (
    <div className="px-5 md:h-[calc(100vh-423px)] mb-5 flex flex-col items-start justify-center gap-5 md:sticky ">
      <input
        type="text"
        placeholder="Search"
        className="bg-[#F1F5F8] py-2 w-60 px-3 font-normal text-sm rounded-md tracking-widest "
      />
      <div>
        <h1 className="text-[#102A42]  font-bold tracking-widest">Category</h1>
        <ul className="text-[#617D98] text-sm tracking-widest flex flex-col items-start justify-center gap-2 mt-3 ">
          {categories.map((category, idx) => (
            <li
              onClick={() => setSelectedCategory(category)}
              key={idx}
              className={`cursor-pointer capitalize ${
                selectedCategory === category && "border-b-2 border-[#AB7A5F]"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-[#102A42] font-bold tracking-widest">Company</h1>
        <select
          onChange={handleSelectBrand}
          className="pl-2 py-1 text-sm mt-2 rounded-md w-20 cursor-pointer"
          value={selectedBrand}
        >
          <option value="default" selected>
            Select
          </option>
          <option value="marcos">Marcos</option>
          <option value="liddy">Liddy</option>
          <option value="ikea">Ikea</option>
          <option value="caressa">Caressa</option>
        </select>
      </div>

      <div className="flex flex-col items-start gap-1">
        <h1 className="text-[#102A42] font-bold tracking-widest">Price</h1>
        <p className="text-[#324D67]">{formatedPrice}</p>
        <input
          onChange={handleSelectPrice}
          type="range"
          min="0"
          max="309999"
          className="w-32 cursor-pointer"
          value={selectedPrice}
        />
      </div>

      <div className="flex items-center justify-between w-[14em]">
        <label htmlFor="free-shipping">Free Shipping</label>
        <input type="checkbox" id="free-shipping" name="free-shipping" />
      </div>

      <button
        onClick={handleClearFilter}
        className="bg-[#BB2525] text-white tracking-widest text-sm py-1 px-3 rounded-md"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
