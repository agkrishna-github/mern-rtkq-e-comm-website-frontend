import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../features/userApiSlice";
import { useEffect } from "react";

const CartItem = ({ cartItem }) => {
  console.log(cartItem);
  const [deleteCartItem, { isSuccess: isDeleteSuccess, data: deletedData }] =
    useDeleteCartItemMutation();
  const [updateCartItem, { isSuccess: isUpdateSuccess }] =
    useUpdateCartItemMutation();
  const { productId } = cartItem;
  const [qty, setQty] = useState(cartItem.qty);

  useEffect(() => {
    updateCartItem({ id: cartItem._id, qty });
  }, [qty]);

  return (
    <div
      className="container  my-5 py-4 d-flex justify-content-around gap-3 shadow-lg"
      style={{ minHeight: "300px" }}
    >
      <div className="d-flex  w-25 gap-3 align-items-center justify-content-center border border-1">
        {productId?.images?.map((prod, i) => (
          <div key={i}>
            <img src={prod?.url} alt="Product Image" height={100} width={100} />
          </div>
        ))}
      </div>
      <div className="d-flex flex-column  justify-content-center gap-2  w-50">
        <h5>{productId?.title.slice(0, 40)}...</h5>
        <p className=" d-flex align-items-center" style={{ height: "30px" }}>
          Color : &nbsp;
          <span
            className="rounded-circle"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: `${cartItem.pcolor}`,
            }}
          ></span>
        </p>
        <p>
          Rs. <b>{productId?.price}</b>
        </p>
        <div className="d-flex gap-3  align-items-center">
          <button
            className="p-2"
            disabled={qty === 1}
            onClick={() => setQty((prev) => prev - 1)}
          >
            -
          </button>
          <span className="p-2 ">
            <b className="display-6">{qty}</b>
          </span>
          <button className="p-2" onClick={() => setQty((prev) => prev + 1)}>
            +
          </button>
        </div>
        <Link
          to={`/singleProduct/${productId?._id}`}
          className="text-decoration-none text-white mt-3"
        >
          <button className="p-2 rounded-2">View Product</button>
        </Link>
        <button
          className="p-2 mt-3 w-25 rounded-2 text-danger"
          onClick={() => deleteCartItem(cartItem._id)}
        >
          Remove
        </button>
      </div>
      <div
        style={{ height: "100%" }}
        className=" d-flex flex-column justify-content-end w-25 border border-1"
      >
        <div className="p-2">
          <p>
            Price : <b>{cartItem.productId.price}</b>
          </p>
          <p>
            Qty : <b>{cartItem.qty}</b>
          </p>
          <p className="border border-2 p-2">
            Total : <b>{cartItem.productId.price * cartItem.qty}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
