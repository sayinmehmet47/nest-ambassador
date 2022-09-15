// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/product';

export interface ProductInfo {
  success?: boolean;
  message?: string;
  error?: string;
}

export interface BackendProducts {
  data: Product[];
  total: number;
  page: number;
  last_page: number;
}

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/ambassador',
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  //   refetchOnReconnect: true,
  //   refetchOnMountOrArgChange: 5,

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products/frontend`,
    }),
    getProductsFromBackend: builder.query<
      BackendProducts,
      { search: string; sort: string; page: number }
    >({
      query: (data) => {
        const { search, sort, page } = data;
        return {
          url: `/products/backend`,
          method: 'GET',
          params: { search, sort, page },
        };
      },
    }),
    createLinks: builder.mutation<number[], any>({
      query(data) {
        return {
          url: `/links`,
          method: 'POST',
          body: {
            products: data,
          },
        };
      },
    }),

    getStats: builder.query({
      query: () => `/stats`,
    }),
    // loginUser: builder.mutation<UserInfo, Partial<Product>>({
    //   query(data) {
    //     const { ...body } = data;
    //     return {
    //       url: `auth/ambassador/login`,
    //       method: 'POST',
    //       body,
    //     };
    //   },
    // }),
    // logoutUser: builder.mutation<any, Partial<Product>>({
    //   query() {
    //     return {
    //       url: `auth/ambassador/logout`,
    //       method: 'POST',
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsFromBackendQuery,
  useCreateLinksMutation,
  useGetStatsQuery,
} = productApi;
