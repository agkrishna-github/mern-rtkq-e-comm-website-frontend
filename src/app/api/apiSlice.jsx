import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  // baseUrl: "https://mern-rtkq-e-comm-website-backend.onrender.com/",

  prepareHeaders: (headers, { getState }) => {
    console.log(getState());
    const token = getState().auth?.user?.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["User", "Product"],
  endpoints: (builder) => ({}),
});
