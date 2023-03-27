import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ stars, reviews }) => {
  const starArray = Array.from({ length: 5 }, (i, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars > number ? (
          <BsStarFill style={{ color: "#ffb900" }} />
        ) : stars > index ? (
          <BsStarHalf style={{ color: "#ffb900" }} />
        ) : stars > index ? (
          <BsStarHalf style={{ color: "#ffb900" }} />
        ) : (
          <BsStar style={{ color: "#ffb900" }} />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">{starArray}</div>
      <span className="text-[#324D67] text-sm md:text-base">
        ({reviews} customer reviews)
      </span>
    </div>
  );
};

export default Stars;
