import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Credentials {
  email: string;
  password: string;
}

const BASE_URL = 'http://pub.trixolma.localhost:5000/api/v1';

export const authApi = createApi({
  reducerPath: 'restaurant',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    login: build.mutation<any, Credentials>({
      query: (credentials: Credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation } = authApi;
