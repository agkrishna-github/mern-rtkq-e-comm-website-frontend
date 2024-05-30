import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const productAdapter = createEntityAdapter({});

const initialState = productAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product/getproducts",
      transformResponse: (responseData) => {
        const loadedProducts = responseData.map((product) => {
          product.id = product._id;
          return product;
        });

        return productAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApiSlice;

export const selectProductsResult =
  productApiSlice.endpoints.getProducts.select();

console.log(selectProductsResult);

const selectTitlesData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
);

console.log(selectTitlesData);

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productAdapter.getSelectors(
  (state) => selectTitlesData(state) ?? initialState
);
