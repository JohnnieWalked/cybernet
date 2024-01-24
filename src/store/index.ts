import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './slices/userSlice';
import { songSlice } from './slices/song';

export const makeStore = () => {
  return configureStore({
    reducer: {
      userSlice: userSlice.reducer,
      songSlice: songSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
