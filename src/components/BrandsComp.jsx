import React from "react";

const BrandsComp = ({ allbrands, setBrand }) => {
  console.log(allbrands);
  return (
    <>
      {allbrands.map((brand, i) => (
        <div
          className="mt-3"
          key={i}
          onClick={() => setBrand(brand)}
          style={{ cursor: "pointer" }}
        >
          {brand}
        </div>
      ))}
    </>
  );
};

export default BrandsComp;
