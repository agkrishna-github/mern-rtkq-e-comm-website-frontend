import React from "react";
import { useGetProductsQuery } from "../features/productApiSlice";
const Categories = ({ allcategories, setCategory }) => {
  return (
    <>
      {allcategories?.map((category, i) => (
        <div className="mt-3" key={i}>
          <input
            type="checkbox"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="category">{category}</label>
        </div>
        /*  <div
          className="mt-3"
          style={{ cursor: "pointer" }}
          key={i}
          onClick={() => setCategory(category)}
        >
          {category}
        </div>  */
      ))}
    </>
  );
};

export default Categories;
