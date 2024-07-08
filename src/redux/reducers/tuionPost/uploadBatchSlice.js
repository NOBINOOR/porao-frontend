import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet, privatePost, } from "../../utilities/apiCaller";


export const createTutionBatch = createAsyncThunk(
  "upload/tuition/post",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/batch/create/new", token, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const fetchTeacherBatch = createAsyncThunk(
  'fetchTeacherBatch ',
  async ({ token }, { rejectWithValue }) => {
    try {
      const batches = await privateGet('/batch/all', token);
      return batches;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const uploadTuitionPostSlice = createSlice({
  name: "uploadBatch",
  initialState: {
    batch: [],
    tutorBatches: [],
    isLoading: false,
    isError: false,
    success: false
    // error: "",
  }, reducers: {

    updatePostClean: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTutionBatch.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTutionBatch.fulfilled, (state, action) => {
        state.batch = action.payload;
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createTutionBatch.rejected, (state, action) => {
        state.isLoading = true;
        state.batch = [];
        state.isError = true;
        state.success = false;
      })
      .addCase(fetchTeacherBatch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTeacherBatch.fulfilled, (state, action) => {
        state.tutorBatches = action.payload.batches;
        state.isLoading = false

      })
      .addCase(fetchTeacherBatch.rejected, (state, action) => {
        state.isLoading = true
        state.tutorEnrollments = [];
      })
  },
});
export const { updatePostClean } = uploadTuitionPostSlice.actions;
export default uploadTuitionPostSlice.reducer;