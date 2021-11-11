import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api';

const name = 'carriers';

const initialState = {
  reports: {
    data: [],
    params: {
      fromDate: null,
      toDate: null,
    },
    isFetching: false,
  },
};

const CarriersSlice = createSlice({
  name,
  initialState,
  reducers: {
    reset(s) {
      Object.assign(s, initialState);
    },
  }
});

export const thunks = {
  fetchReports: createAsyncThunk(`${name}/fetchReports`, async (params) => {
    const result = await API.carriers.getReports(params);

    return result;
  }),
};

export const actions = CarriersSlice.actions;

export default CarriersSlice;
