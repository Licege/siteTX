import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Address {
  city: string;
  house: string;
  street: string;
}

export interface SocialNetworks {
  inst: string | null;
  vk: string | null;
  fb: string | null;
  tg: string | null;
  tw: string | null;
}

interface Restaurant {
  id: number;
  name: string;
  phone: string;
  address: Address;
  openHours: string[];
  socialNetworks: SocialNetworks;
}

const BASE_URL = 'http://pub.trixolma.localhost:5000/api/v1';

export const restaurantApi = createApi({
  reducerPath: 'restaurant',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    restaurant: build.query<Restaurant, void>({
      query: () => ({
        url: '/restaurants'
      }),
    })
  })
});

export const { useRestaurantQuery } = restaurantApi;
