import {
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["getUsers", "getUserByID"],
  endpoints(builder) {
    return {
      fetchUsers: builder.query<FetchData[], void>({
        query: () => {
          return `/users`;
        },
        providesTags: ["getUsers"],
      }),
      fetchUsersById: builder.query<any, number>({
        query(id) {
          return `/users/${id}`;
        },
        providesTags: ["getUserByID"],
      }),
      createUsers: builder.mutation<FetchData[], void>({
        query: (data) => ({
          url: `/users`,
          method: "POST",
          body: data,
        }),

        invalidatesTags: ["getUsers"],
      }),
      updateUsers: builder.mutation<FetchData[], string | any>({
        query: ({ id, data }) => ({
          url: `/users/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["getUsers"],
      }),
      deleteUsers: builder.mutation<FetchData[], number>({
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["getUsers"],
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
  useCreateUsersMutation,
  useDeleteUsersMutation,
  useFetchUsersByIdQuery,
  useUpdateUsersMutation,
} = dataSlice;
