// src/redux/reducers/tuionPost/singleBatchSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicGet } from "../../utilities/apiCaller";


export const fetchSingleBatch = createAsyncThunk(
  "singleBatch/fetchSingleBatch",
  async (batchId) => {
    const response = await publicGet(`/batch/${batchId}`);
    return response.data.batch;
  }
);

const singleBatchSlice = createSlice({
  name: "singleBatch",
  initialState: {
    batch:{},
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleBatch.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchSingleBatch.fulfilled, (state, action) => {
        state.batch = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleBatch.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.batch = null;
      });
  },
});

export default singleBatchSlice.reducer;
