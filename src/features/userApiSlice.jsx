import { apiSlice } from "../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => "/users/getcartitems",

      providesTags: ["User"],
    }),
    getWishlist: builder.query({
      query: () => "/users/getwishlist",
      providesTags: ["User"],
    }),
    addNewUser: builder.mutation({
      query: (newUserData) => ({
        url: "/users/register",
        method: "POST",
        body: {
          ...newUserData,
        },
      }),
      invalidatesTags: ["User"],
    }),
    addToWishlist: builder.mutation({
      query: ({ id }) => ({
        url: `/users/addtowishlist/${id}`,
        method: "PUT",
      }),

      invalidatesTags: ["User"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/users/addtocart",
        method: "POST",
        body: { ...data },
      }),

      invalidatesTags: ["User"],
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `users/deletecartitem/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],
    }),
    updateCartItem: builder.mutation({
      query: (body) => ({
        url: "users/updatecartitem",
        method: "POST",
        body: { ...body },
      }),

      invalidatesTags: ["User"],
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "users/createorder",
        method: "POST",
        body: { ...body },
      }),

      invalidatesTags: ["User"],
    }),
    getOrders: builder.query({
      query: () => "users/getorders",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useGetCartItemsQuery,
  useAddNewUserMutation,
  useAddToCartMutation,
  useAddToWishlistMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
} = userApiSlice;
