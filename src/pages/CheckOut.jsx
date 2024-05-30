import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
  useCreateOrderMutation,
} from "../features/userApiSlice";
import StripeCheckout from "react-stripe-checkout";

const CheckOut = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [other, setOther] = useState("");
  const [pincode, setPincode] = useState("");

  const [cartProductState, setCartProductState] = useState([]);

  const { isSuccess, data: cartData } = useGetCartItemsQuery();

  const [deleteCartItem, { isSuccess: isDeleteSuccess, data: deletedData }] =
    useDeleteCartItemMutation();

  const [
    createOrder,
    { isSuccess: isCreateOrderSuccess, data: orderCreatedData },
  ] = useCreateOrderMutation();

  console.log(cartData);
  useEffect(() => {
    let totalC = 0;
    cartData?.forEach((item) => {
      totalC += Number(item?.productId.price) * Number(item.qty);
    });
    setTotal(totalC);
  }, [cartData]);

  /* const handleSubmit = async (e) => {
    e.preventDefault();

   
  }; */

  useEffect(() => {
    const items = cartData?.map((item) => {
      console.log(item);
      return {
        product: item?.productId._id,
        color: item?.pcolor,
        title: item?.productId?.title,
        quantity: item?.qty,
        price: item?.productId.price,
        image: item?.productId?.images[0]?.url,
        cartItemId: item?._id,
      };
    });
    setCartProductState(items);
  }, [cartData]);

  const onToken = async (token) => {
    await createOrder({
      orderItems: cartProductState,
      token: token,
      totalAmount: total,
      shippingInfo: {
        firstName,
        lastName,
        address,
        state,
        city,
        country,
        pincode,
        other,
      },
    });

    setTotal(0);
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setOther("");
    setPincode("");
  };

  return (
    <main>
      <section className="p-3  d-flex gap-3">
        <article className=" w-50 d-flex flex-column border border-2">
          <h2 className="p-2">Contact Information</h2>
          <p className="p-2">krishcart@gmail.com</p>
          <h2 className="p-2">Shipping Address</h2>
          <form className="py-2 px-5 mt-3 d-flex  flex-column gap-2">
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              id=""
              className="py-2 mt-2"
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
            </select>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 mt-2"
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 mt-2"
              placeholder="Last Name"
            />
            <input
              type="text"
              className=" p-2 mt-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="p-2 mt-2"
            />
            <input
              type="text"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Other"
              className="p-2 mt-2"
            />
            <select
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              id=""
              className="p-2 mt-2"
            >
              <option value="">Select State</option>
              <option value="Telangana">Telangana</option>
            </select>
            <input
              type="number"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Zipcode"
              className="p-2 mt-2"
            />
          </form>
          <StripeCheckout
            amount={total * 100}
            token={onToken}
            currency="INR"
            stripeKey="pk_test_51P7sZfSHcnaFG3YWQklofbfA1kCIBzdL9dHNCjtYavOdcss1ABnR6Lc3yRrPogCoHE4RNLpJW7eLnaNngPVjSTqd00Ie9nF3mB"
          >
            <button className="d-flex p-2 rounded-pill">Paynow</button>
          </StripeCheckout>

          <button type="button" className="">
            Continue To Shopping
          </button>
          <Link className="" to="/cart">
            - Return To Cart
          </Link>
        </article>

        <article className="p-3 w-50 ">
          {cartProductState &&
            cartProductState?.map((item) => (
              <section
                className="p-3 shadow-lg  gap-2 mt-3 mb-3 "
                key={item?.id}
              >
                <div className="d-flex gap-3  p-2">
                  <div className="" style={{ width: "100px", height: "100px" }}>
                    <img src={item?.image} alt="" className="img-fluid" />
                  </div>
                  <div className="ps-2">
                    <h5 className="">{(item?.title).slice(0, 40)}</h5>
                    <div
                      className="d-flex mt-2  align-items-center"
                      style={{ height: "40px" }}
                    >
                      <p className=" d-flex mt-3 gap-3 justify-content-center">
                        Color :
                        <span
                          className="rounded-circle d-inline-block"
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: `${item.color}`,
                          }}
                        ></span>
                      </p>
                    </div>
                    <div className=" mt-3 d-flex border border-1 justify-content-between gap-2">
                      <div>
                        <div className="p-2">
                          Qty : <b>{item?.quantity}</b>
                        </div>
                        <p className="p-2">
                          Rs. <b>{item?.price}</b>
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          className=" rounded-pill  p-2"
                          onClick={() => deleteCartItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className=" p-2">
                        <h4 className="ps-2">Total</h4>
                        <p className="p-2">
                          Rs. <b>{item?.price * item?.quantity}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}

          <div
            className=" d-flex justify-content-center border border-5 mt-5 w-50 mx-auto rounded-pill"
            style={{ alignItems: "end", height: "60px" }}
          >
            <p className="me-3 ">Payment Total</p>
            <p className="">
              Rs. <b>{total}</b>
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default CheckOut;
