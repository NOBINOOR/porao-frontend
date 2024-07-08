import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';

export const fetchAttendanceByBatchId = createAsyncThunk(
  'attendance/fetchByBatchId',
  async ({ batchId, page, perPage, token }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/attendance/student?batchId=${batchId}&page=${page}&perPage=${perPage}`, token);
      return response.data;
    } catch (err) {
      const errorMessage = err.response && err.response.data && err.response.data.message 
        ? err.response.data.message 
        : err.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: [],
    totalResults: 0,
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
    // other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceByBatchId.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchAttendanceByBatchId.fulfilled, (state, action) => {
        state.attendance = action.payload.results;
        state.totalResults = action.payload.totalResult;
        state.isLoading = false;
        state.success = true;
      })
      .addCase(fetchAttendanceByBatchId.rejected, (state, action) => {
        state.isLoading = false;
        state.attendance = [];
        state.success = false;
        state.error = action.payload; // Store the error message
      });
  }
});

export default attendanceSlice.reducer;
