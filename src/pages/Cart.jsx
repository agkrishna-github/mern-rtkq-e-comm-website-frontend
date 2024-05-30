import React from "react";
import { useGetCartItemsQuery } from "../features/userApiSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartItem from "../components/CartItem";
import { useEffect } from "react";

function Cart() {
  const { isSuccess, data: cartData } = useGetCartItemsQuery();
  console.log(cartData);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalC = 0;
    cartData?.forEach((item) => {
      totalC += Number(item.qty) * Number(item.productId.price);
    });
    setTotal(totalC);
  }, [cartData]);

  return (
    <>
      {cartData?.length !== 0 ? (
        <div className=" py-1">
          <div>
            {cartData?.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem._id} />
            ))}
          </div>
          <div className="container p-2 d-flex gap-2 mt-3">
            <Link
              to="/"
              className="p-2 w-25 rounded-pill bgy text-center text-decoration-none text-dark"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="p-2 w-25 rounded-pill bgy text-center text-decoration-none text-dark"
            >
              Place order
            </Link>
          </div>
          <div
            className="h100 d-flex gap-3 p-3 align-items-center position-fixed bottom-0 end-0 rounded-pill"
            style={{ backgroundColor: "rgb(0,0,0)", color: "white" }}
          >
            <h5>Total Cart Amount:</h5>
            <h5 className="display-6">Rs. {total} /-</h5>
          </div>
        </div>
      ) : (
        <h1 className="h100 mt-5 ms-5">Your Cart is Empty</h1>
      )}
    </>
  );

  /* return (
   
    <div className=" py-1">
      <div>
        {cartData?.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem._id} />
        ))}
      </div>
      <div className="container p-2 d-flex gap-2 mt-3">
        <Link
          to="/"
          className="p-2 w-25 rounded-pill bgy text-center text-decoration-none text-dark"
        >
          Continue Shopping
        </Link>
        <Link
          to="/checkout"
          className="p-2 w-25 rounded-pill bgy text-center text-decoration-none text-dark"
        >
          Place order
        </Link>
      </div>
      <div
        className="h100 d-flex gap-3 p-3 align-items-center position-fixed bottom-0 end-0 rounded-pill"
        style={{ backgroundColor: "rgb(0,0,0)", color: "white" }}
      >
        <h5>Total Cart Amount:</h5>
        <h5 className="display-6">Rs. {total} /-</h5>
      </div>
    </div>
  ); */
}

export default Cart;
