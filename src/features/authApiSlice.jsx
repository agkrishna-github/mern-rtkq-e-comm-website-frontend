import { apiSlice } from "../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (loginUserData) => ({
        url: "/auth/loginUser",
        method: "POST",
        body: {
          ...loginUserData,
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApiSlice;
