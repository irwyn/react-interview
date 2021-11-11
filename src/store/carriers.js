import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '@/api';

const name = 'carriers';

const CarriersSlice = createSlice({
  name,
  initialState: {
    reports: {
      data: [],
      params: {
        fromDate: null,
        toDate: null,
      },
      isFetching: false,
    },
  },
});

export const thunks = {
  fetchReports: createAsyncThunk(`${name}/fetchReports`, async (params) => {
    const result = await API.carriers.getReports(params);

    return result;
  }),
};

export default CarriersSlice;
