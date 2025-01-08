import { Routes, Route } from "react-router-dom";
import React from "react";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import Layout from "./components/Layout";
import SkeletonHome from "./components/SkeletonHome";
import ErrorFallback from "./components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishList from "./pages/WishList";
import RequireAuth from "./components/RequireAuth";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import OurStore from "./pages/OurStore";
import CheckOut from "./pages/CheckOut";
import { HelmetProvider } from "react-helmet-async";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <div>
      <HelmetProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="ourStore" element={<OurStore />} />
                <Route
                  path="singleProduct/:prodId"
                  element={<SingleProduct />}
                />
                <Route element={<RequireAuth />}>
                  <Route path="wishlist" element={<WishList />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="checkout" element={<CheckOut />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
          <ToastContainer />
        </ErrorBoundary>
      </HelmetProvider>
    </div>
  );
}

export default App;
