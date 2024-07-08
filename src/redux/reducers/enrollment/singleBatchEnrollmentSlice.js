import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';


export const fetchEnrollmentByBatchId = createAsyncThunk(
  "teacher/fetchEnrollmentByBatchId",
  async ({ token, batchId }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/enrollment/${batchId}`,token);
      console.log("response",response)
      return response;
    } catch (err) {
      console.log("error",err.response);
      return rejectWithValue(err.response);
    }
  }
);

const batchEnrollmentSliceById = createSlice({
  name: 'teacher',
  initialState: {
    enrollments: [],
    success:false,
    isLoading:false,
    error: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollmentByBatchId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEnrollmentByBatchId.fulfilled, (state, action) => {
        state.status = true;
        state.enrollments = action.payload && action.payload.students ? action.payload.students : [];
      })
      .addCase(fetchEnrollmentByBatchId.rejected, (state, action) => {
        state.status = false;
        state.errorMessage = action.payload.data.message;
      });
  }
});

export default batchEnrollmentSliceById.reducer;
