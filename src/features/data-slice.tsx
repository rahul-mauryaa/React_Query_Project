import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FetchData {
  createdAt: Date;
  name: string;
  id: string;
  avatar: string;
  gender: string;
  phone: string;
  address: string;
}

export const dataSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64dc793ae64a8525a0f68ad0.mockapi.io/api",
  }),
  endpoints(builder) {
    return {
      fetchData: builder.query<FetchData[], void>({
        query() {
          return `/users`;
        },
      }),
      createPost: builder.mutation<FetchData[], void>({
        query: (data) => ({
          url: `/users`,
          method: "POST",
          body: data,
        }),
      }),
    };
  },
});

export const { useFetchDataQuery, useCreatePostMutation } = dataSlice;
