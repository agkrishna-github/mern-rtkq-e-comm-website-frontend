import React from "react";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
} from "../features/userApiSlice";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";

function WishList() {
  const [addToWishlist, { isSuccess: isWishlistSuccess }] =
    useAddToWishlistMutation();
  const {
    isSuccess,
    isError,
    error,
    data: wishListData,
  } = useGetWishlistQuery();
  console.log(wishListData);

  if (wishListData?.length === 0) {
    return (
      <div className="" style={{ minHeight: "100vh" }}>
        <div className="display-3 mt-5 mb-5">
          Your Wishlist Is Empty..............
        </div>
        <Link to="/">Go To Home</Link>
      </div>
    );
  }

  return (
    <div className="container p-3 d-flex  flex-wrap gap-3">
      {wishListData?.map((product) => (
        <div
          className=" p-2  gap-3 shadow-lg"
          style={{ minHeight: "300px", width: "300px" }}
          key={product._id}
        >
          <div className="d-flex justify-content-end">
            <span
              className="inline-block  me-3 mt-3"
              onClick={() => addToWishlist({ id: product._id })}
              style={{ color: "red" }}
            >
              <FaRegHeart style={{ fontSize: "1.5em", cursor: "pointer" }} />
            </span>
          </div>
          <div className="d-flex gap-3">
            <div>
              {product.images.map((img, i) => (
                <div key={i}>
                  <img src={img.url} alt="" width={100} height={100} />
                </div>
              ))}
            </div>

            <div>
              <p className="mt-3">
                <b>{product?.title.slice(0, 40)}</b>
              </p>
              <p>Colors:</p>
              <div className="d-flex gap-3">
                {product?.color.map((col, i) => (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: `${col}`,
                    }}
                    className="rounded-circle"
                    key={i}
                  ></div>
                ))}
              </div>

              <p className="mt-3">
                Rs. <b>{product?.price}</b>
              </p>
            </div>
          </div>
          <div>
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
        </div>
      ))}
    </div>
  );
}

export default WishList;
