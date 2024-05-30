import React from "react";
import { Link } from "react-router-dom";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
} from "../features/userApiSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";

function WeekendSpecial({ product }) {
  const user = useSelector((state) => selectCurrentUser(state));

  const navigate = useNavigate();

  const [addToWishlist, { isSuccess: isWishlistSuccess }] =
    useAddToWishlistMutation();

  const { isSuccess, data: wishListData } = useGetWishlistQuery();

  const wishList = wishListData?.find((li) => li._id === product._id);
  const [bg, setBg] = useState(false);

  useEffect(() => {
    if (wishList) {
      setBg(true);
    } else {
      setBg(false);
    }
  }, [wishListData, wishList]);

  return (
    <>
      <div
        className="ms-3 p-3 mt-3 shadow-lg position-relative w-22 d-flex flex-column gap-2 justify-content-around border border-dark rounded-3"
        style={{ minWidth: "250px" }}
      >
        <div>
          {product.images.map((img, i) => (
            <div key={i}>
              <img src={img.url} alt="" width={100} height={100} />
            </div>
          ))}
        </div>
        <span
          className="inline-block position-absolute top-0 end-0 me-3 mt-3"
          onClick={
            user !== null
              ? () => addToWishlist({ id: product._id })
              : () => navigate("/login")
          }
          style={bg ? { color: "red" } : { color: "black" }}
        >
          <FaRegHeart style={{ fontSize: "1.5em", cursor: "pointer" }} />
        </span>
        <p>{product.title.slice(0, 25)}</p>
        <b>Rs. {product.price}</b>

        <div className="d-flex gap-3">
          <button className="p-1 rounded-3" style={{ width: "100%" }}>
            <Link
              to={`/singleProduct/${product._id}`}
              className="text-decoration-none text-dark"
            >
              View Details
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default WeekendSpecial;
