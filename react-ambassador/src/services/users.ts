// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../models/user';

export interface UserInfo {
  success?: boolean;
  message?: string;
  error?: string;
}

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
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 5,

  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: () => `/auth/ambassador/user`,
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
    loginUser: builder.mutation<UserInfo, Partial<User>>({
      query(data) {
        const { ...body } = data;
        return {
          url: `auth/ambassador/login`,
          method: 'POST',
          body,
        };
      },
    }),
    logoutUser: builder.mutation<any, Partial<User>>({
      query() {
        return {
          url: `auth/ambassador/logout`,
          method: 'POST',
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;
