import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../features/productApiSlice";
import StoreProducts from "../components/StoreProducts";
import Categories from "../components/Categories";
import Slider from "@mui/material/Slider";
import BrandsComp from "../components/BrandsComp";
import FeaturesComp from "../components/FeaturesComp";

const OurStore = () => {
  //   const dispatch = useDispatch();

  const [value, setValue] = useState([0, 150000]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  console.log(category);
  const [feature, setFeature] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [products, setProducts] = useState([]);

  console.log(sort);

  const {
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
    isError: isProductsError,
    error,
    ProductsData,
  } = useGetProductsQuery("productList", {
    selectFromResult: ({ data, isSuccess }) => ({
      ProductsData: data?.ids.map((id) => data?.entities[id]),
      isSuccess,
    }),
  });
  console.log(ProductsData);
  console.log(isProductsSuccess);
  console.log(isProductsError);

  // const [products, setProducts] = useState(ProductsData);

  useEffect(() => {
    setTimeout(() => {
      setProducts(ProductsData);
    }, 0);
  }, []);
  console.log(products);
  const allcategories = [...new Set(products?.map((item) => item?.category))];
  console.log(allcategories);

  const allbrands = [...new Set(products?.map((item) => item?.brand))];
  console.log(allbrands);

  const allFeatures = [...new Set(products?.map((item) => item?.feature))];
  console.log(allFeatures);
  /* 
  const allcategories = [
    ...new Set(ProductsData && ProductsData?.map((item) => item?.category)),
  ];
  console.log(allcategories);

  const allbrands = [
    ...new Set(ProductsData && ProductsData?.map((item) => item?.brand)),
  ];
  console.log(allbrands);

  const allFeatures = [
    ...new Set(ProductsData && ProductsData?.map((item) => item?.feature)),
  ];
  console.log(allFeatures); */

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  /* 
  useEffect(() => {
    const searchData = ProductsData.filter((item) => {
      return (
        (Number(item.price) >= value[0] && Number(item.price) <= value[1]) ||
        item.brand === brand ||
        item.category === category ||
        item.feature === feature
      );
    });

    setProducts(searchData);
  }, [value, brand, category, feature]);
 */

  useEffect(() => {
    if (products) {
      const searchData =
        // ProductsData &&
        products.filter(
          (item) =>
            Number(item.price) >= value[0] && Number(item.price) <= value[1]
        );

      setProducts(searchData);
    }
  }, [value]);

  useEffect(() => {
    const brandsData =
      // ProductsData &&
      products.filter((branditems) => branditems.brand === brand);

    setProducts(brandsData);
  }, [brand]);

  useEffect(() => {
    const categoriesData =
      // ProductsData &&
      products.filter((item) => item.category === category);

    setProducts(categoriesData);
  }, [category]);

  useEffect(() => {
    const featuresData =
      // ProductsData &&
      products.filter((item) => item.feature === feature);

    setProducts(featuresData);
  }, [feature]);

  useEffect(() => {
    const searchedData =
      ProductsData &&
      ProductsData.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.brand.toLowerCase().includes(search.toLocaleLowerCase())
      );

    setProducts(searchedData);
  }, [search]);

  useEffect(() => {
    const sortedProducts =
      products && sort === "-price"
        ? products?.slice()?.sort((a, b) => b?.price - a?.price)
        : sort === "price"
        ? products?.slice()?.sort((a, b) => a?.price - b?.price)
        : sort === "title"
        ? products?.slice()?.sort((a, b) => a?.title.localeCompare(b?.title))
        : sort === "-title"
        ? products?.slice()?.sort((a, b) => b?.title.localeCompare(a?.title))
        : products;

    setProducts(sortedProducts);
  }, [sort]);

  return (
    <main className=" d-flex min-vh-100 gap-3">
      <div className="" style={{ width: "15%" }}>
        <section className="mt-5  p-3 bgy">
          <Categories allcategories={allcategories} setCategory={setCategory} />
        </section>
        <section className="mt-5 p-3">
          <div
            className="mx-auto p-2 rounded-pill"
            style={{ backgroundColor: "white", width: "90%" }}
          >
            <Slider
              className="ms-4"
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              style={{ width: "80%" }}
              min={0}
              step={50}
              max={150000}
            />
          </div>
        </section>
        <section className="mt-5 bgy p-3">
          <BrandsComp allbrands={allbrands} setBrand={setBrand} />
        </section>
        <section className="mt-5 bgy p-3">
          <FeaturesComp allFeatures={allFeatures} setFeature={setFeature} />
        </section>
        <div className="mt-5 p-3">
          <button
            type="button"
            onClick={() => {
              setSort("");
              setProducts(ProductsData);
              setValue([0, 150000]);
            }}
            style={{}}
            className="w-75 mx-auto d-block p-2 rounded-pill"
          >
            Clear Filter
          </button>
        </div>
      </div>
      <div className="" style={{ width: "75%" }}>
        <div className=" mt-5 d-flex gap-3">
          <div className="d-flex justify-content-center align-items-center h-100 w-75">
            <input
              type="text"
              className="p-3 w-50 mx-auto rounded-pill"
              placeholder="Search Product Here........"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="my-3 d-flex justify-content-center w-25">
            <select
              name=""
              defaultValue={"manual"}
              className="p-2 rounded"
              id=""
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Select</option>
              <option value="title">Alphabetically, A-Z</option>
              <option value="-title">Alphabetically, Z-A</option>
              <option value="price">Price, low to high</option>
              <option value="-price">Price, high to low</option>
              {/*  <option value="createdAt">Date, old to new</option>
              <option value="-createdAt">Date, new to old</option> */}
            </select>
          </div>
        </div>
        <div className="">
          {products?.length !== 0 ? (
            <div>
              <div
                className="d-flex gap-3  flex-wrap rounded-1"
                style={{ minHeight: "200px" }}
              >
                {products?.map((product) => (
                  <StoreProducts product={product} key={product._id} />
                ))}
              </div>
            </div>
          ) : (
            <div className="">
              <div
                className="d-flex gap-3  flex-wrap rounded-1"
                style={{ minHeight: "200px" }}
              >
                {ProductsData?.map((product) => (
                  <StoreProducts product={product} key={product._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default OurStore;
