// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/user';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: () => `/auth/admin/user`,
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query(data) {
        const { ...body } = data;

        return {
          url: `/auth/admin/users/info`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useUpdateUserMutation } = userApi;

// url: `/auth/admin/users/info`,
// method: 'PUT',
// data: form,
// headers: {
//   'Content-type': 'application/json; charset=UTF-8',
// },
