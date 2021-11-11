/**
 * Redux store configuration file
 */

import { configureStore } from '@reduxjs/toolkit';

import CarriersSlice from './carriers';

const Store = configureStore({
  reducer: {
    carriers: CarriersSlice.reducer,
  },
});

export default Store;
