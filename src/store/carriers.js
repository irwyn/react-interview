import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api';

const name = 'carriers';

export const thunks = {
  fetchReports: createAsyncThunk(`${name}/fetchReports`, async (params) => {
    const result = await API.carriers.getReports(params);

    return result.data;
  }),
};

const initialState = {
  reports: {
    data: [],
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
  },
  extraReducers: {
    [thunks.fetchReports.pending]: (s) => {
      s.reports.isFetching = true;
    },
    [thunks.fetchReports.rejected]: (s) => {
      s.reports.data = [];
      s.reports.isFetching = false;
    },
    [thunks.fetchReports.fulfilled]: (s, { payload }) => {
      s.reports.data = payload;
      s.reports.isFetching = false;
    },
  }
});

export const actions = CarriersSlice.actions;

export default CarriersSlice;
