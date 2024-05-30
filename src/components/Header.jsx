import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <section className="bg-secondary">
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{ height: "100px" }}
      >
        <h1>Shopping Cart</h1>

        <ul className="list-unstyled d-flex gap-5 align-items-center text-white position-relative">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <li className="li-hover" style={{ cursor: "pointer" }}>
              Home
            </li>
          </Link>
          <Link
            to="/ourStore"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li className="li-hover" style={{ cursor: "pointer" }}>
              Our Store
            </li>
          </Link>
          <Link to="/wishlist" className="text-decoration-none text-white">
            <li className="li-hover" style={{ cursor: "pointer" }}>
              Wish List
            </li>
          </Link>
          <Link to="/orders" className="text-decoration-none text-white">
            <li className="li-hover" style={{ cursor: "pointer" }}>
              Orders
            </li>
          </Link>
          <Link to="/cart" className="text-decoration-none text-white">
            <li className="li-hover" style={{ cursor: "pointer" }}>
              Cart
            </li>
          </Link>
          <li className="login p-3" style={{ cursor: "pointer" }}>
            {user !== null ? `Welcome ${user?.user}` : "Profile"}
            <div
              className="p-1 position-absolute top-0 end-0 linklogin"
              style={{
                backgroundColor: "black",
                width: "100px",
                transform: "translateY(50px)",
                cursor: "pointer",
              }}
            >
              {user !== null ? (
                <p
                  className="text-center mb-0 p-2"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </p>
              ) : (
                <Link to="/login" className="text-decoration-none text-center">
                  <p className="text-white mb-0 p-2">Login</p>
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Header;
