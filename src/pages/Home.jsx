import React from "react";
import Header from "../components/Header";
import Login from "./Login";
import RegularProducts from "../components/RegularProducts";
import { useGetProductsQuery } from "../features/productApiSlice";
/* import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"; */
import img1 from "../assets/images/img1.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img4.webp";
import img5 from "../assets/images/img5.webp";
import img6 from "../assets/images/img6.webp";
import Carousel from "react-material-ui-carousel";
import SpecialProducts from "../components/SpecialProducts";
import BestSellingProducts from "../components/BestSellingProducts";
import WeekendSpecial from "../components/WeekendSpecial";

const Home = () => {
  const {
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
    isError: isProductsError,
    error,
    ProductsData,
  } = useGetProductsQuery("productList", {
    selectFromResult: ({ data }) => ({
      ProductsData: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  console.log(ProductsData);

  return (
    <>
      <section>
        <Carousel infiniteLoop>
          <div>
            <img src={img1} />
          </div>
          <div>
            <img src={img3} />
          </div>
          <div>
            <img src={img4} />
          </div>
        </Carousel>
      </section>
      <section className="container mt-5 p-3 ">
        <h5>Regular Products</h5>
        <div
          className="d-flex gap-3 flex-wrap rounded-1"
          style={{ minHeight: "200px" }}
        >
          {ProductsData &&
            ProductsData?.map((product) => {
              if (product.feature === "Regular") {
                return <RegularProducts product={product} key={product?._id} />;
              }
            })}
        </div>
      </section>
      <section className="container  mt-5 p-3 ">
        <h5>Special Products</h5>
        <div
          className="d-flex gap-5 flex-wrap rounded-1"
          style={{ minHeight: "200px" }}
        >
          {ProductsData &&
            ProductsData?.map((product) => {
              if (product.feature === "Special") {
                return <SpecialProducts product={product} key={product?._id} />;
              }
            })}
        </div>
      </section>
      <section className="container  mt-5 p-3 ">
        <h5>Best Selling</h5>
        <div
          className="d-flex gap-5 flex-wrap rounded-1"
          style={{ minHeight: "200px" }}
        >
          {ProductsData &&
            ProductsData?.map((product) => {
              if (product.feature === "Best Selling") {
                return (
                  <BestSellingProducts product={product} key={product?._id} />
                );
              }
            })}
        </div>
      </section>
      <section className="container  mt-5 p-3 ">
        <h5>Weekend Specials</h5>
        <div
          className="d-flex gap-5 flex-wrap rounded-1"
          style={{ minHeight: "200px" }}
        >
          {ProductsData &&
            ProductsData?.map((product) => {
              if (product.feature === "Weekend Specials") {
                return <WeekendSpecial product={product} key={product?._id} />;
              }
            })}
        </div>
      </section>
    </>
  );
};

export default Home;
