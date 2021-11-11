/**
 * Redux store configuration file
 */

import { configureStore } from '@reduxjs/toolkit';
import CarriersSlice from './carriers';

const Store = configureStore({
  reducer: {
    carriers: CarriersSlice,
  },
});

export default Store;
