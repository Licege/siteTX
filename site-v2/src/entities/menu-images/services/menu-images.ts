import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FetchMenuArgs {
  type: 'bar' | 'menu',
  restaurantId: number,
}

const BASE_URL = 'http://pub.trixolma.localhost:5000/api/v1';

export const menuImagesApi = createApi({
  reducerPath: 'menu-images',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getMenuImages: build.query({
      query: (args: FetchMenuArgs) => ({
        url: `/menu-images/${args.type}/restaurant/${args.restaurantId}`,
        method: 'GET'
      })
    })
  })
});

export const { useLazyGetMenuImagesQuery } = menuImagesApi;
