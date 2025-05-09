import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { restaurantApi, menuImagesApi } from '@entities';

const setupStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) => {
  return configureStore({
    reducer: {
      [restaurantApi.reducerPath]: restaurantApi.reducer,
      [menuImagesApi.reducerPath]: menuImagesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(restaurantApi.middleware, menuImagesApi.middleware),
    ...options
  });
};

export const store = setupStore();
