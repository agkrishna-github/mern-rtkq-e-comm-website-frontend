import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../features/productApiSlice";
import {
  useAddToWishlistMutation,
  useGetCartItemsQuery,
  useGetWishlistQuery,
  useAddToCartMutation,
} from "../features/userApiSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const [bg, setBg] = useState(false);
  const [add, setAdd] = useState(false);
  const [pcolor, setPcolor] = useState("");
  const [qty, setQty] = useState(1);
  const { prodId } = useParams();
  const user = useSelector((state) => selectCurrentUser(state));
  const navigate = useNavigate();
  const {
    isSuccess: isProductsSuccess,
    isError: isProductsError,
    error,
    Product,
  } = useGetProductsQuery("productList", {
    selectFromResult: ({ data }) => ({
      Product: data?.entities[prodId],
    }),
  });
  console.log(Product);
  const [addToCart, { isSuccess: isAddToCartSuccess }] = useAddToCartMutation();

  const { isSuccess, data: wishListData } = useGetWishlistQuery();

  useEffect(() => {
    if (wishListData?.find((li) => li._id === prodId)) {
      setBg(true);
    } else {
      setBg(false);
    }
  }, [wishListData]);

  const { isSuccess: isCartItemsSuccess, data: cartItemsData } =
    useGetCartItemsQuery();

  const cartItem = cartItemsData?.find(
    (prod) => prod?.productId?._id === prodId
  );
  console.log(cartItem);
  useEffect(() => {
    if (cartItem) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }, [prodId, cartItem]);

  const [addToWishlist, { isSuccess: isWishlistSuccess }] =
    useAddToWishlistMutation();

  const handleCart = () => {
    if (!pcolor) {
      return alert("Please select the Color");
    }
    addToCart({ id: Product._id, qty, pcolor });
  };

  return (
    <section className="p-5 mt-5 justify-content-around d-flex gap-3">
      <div className="w-50 d-flex justify-content-center align-items-center shadow-lg">
        {Product?.images?.map((img, i) => (
          <div
            key={i}
            className="bgr"
            style={{ width: "300px", height: "300px" }}
          >
            <img
              className="bgr"
              style={{ width: "100%", height: "100%" }}
              src={img.url}
              alt=""
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <div className="d-flex gap-3 w-50 border border-2">
        <div className="w-75 d-flex flex-column gap-3 p-2">
          <h4>{Product?.title}</h4>
          <p>
            Rs. <b>{Product?.price}</b>
          </p>
          <div
            className="d-flex  align-items-center gap-3"
            style={{ height: "60px" }}
          >
            <p className="">Colors : </p>
            <div className="d-flex align-items-center  h-100 gap-3">
              {cartItem ? (
                <div
                  className="rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: `${cartItem.pcolor}`,
                  }}
                ></div>
              ) : (
                <div className="d-flex align-items-center  h-100 gap-3">
                  {Product?.color.map((col, i) => (
                    <div
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: `${col}`,
                        cursor: "pointer",
                      }}
                      key={i}
                      onClick={() => setPcolor(col)}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p>
            Left Only : <b className="display-6">{Product?.qty}</b>
          </p>
          <div className="d-flex gap-3 mt-3 align-items-center">
            <p>Quantity</p>
            <button
              className="p-2"
              disabled={qty === 1 || cartItem}
              onClick={() => setQty((prev) => prev - 1)}
            >
              -
            </button>
            <span className="p-2">{cartItem ? cartItem.qty : qty}</span>
            <button
              className="p-2"
              onClick={() => setQty((prev) => prev + 1)}
              disabled={cartItem}
            >
              +
            </button>
          </div>
          <div className="d-flex gap-3">
            <button
              className="p-3 rounded-3"
              onClick={
                user !== null
                  ? () => addToWishlist({ id: Product._id })
                  : () => navigate("/login")
              }
              style={
                bg ? { backgroundColor: "red" } : { backgroundColor: "white" }
              }
            >
              Add to Wishlist
            </button>
            <button
              className="p-3 rounded-3"
              onClick={
                user !== null && add
                  ? () => navigate("/cart")
                  : user !== null
                  ? () => handleCart()
                  : () => navigate("/login")
              }
            >
              {add ? "Go" : "Add"} to Cart
            </button>
          </div>
        </div>
        {cartItem && (
          <div
            style={{ width: "200px", height: "100%" }}
            className=" d-flex flex-column justify-content-end"
          >
            <div className=" p-2 border border-2">
              <p>
                Price : <b>{cartItem.productId.price}</b>
              </p>
              <p>
                Qty : <b>{cartItem.qty}</b>
              </p>
              <p>
                Total : <b>{cartItem.productId.price * cartItem.qty}</b>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
