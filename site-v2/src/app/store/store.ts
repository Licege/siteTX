import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { restaurantApi } from '../../entities/restaurant';

const setupStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) => {
  return configureStore({
    reducer: {
      [restaurantApi.reducerPath]: restaurantApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(restaurantApi.middleware),
    ...options
  });
};

export const store = setupStore();
