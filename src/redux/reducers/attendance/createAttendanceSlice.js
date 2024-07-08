import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet, privatePost } from "../../utilities/apiCaller";

export const createAttendance = createAsyncThunk(
  "create/Attendance",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/attendance/record/student/attendance", token, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);


export const fetchStudentAttendance = createAsyncThunk(
  "fetch/Attendance",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await privateGet("/attendance/student/attendance", token);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const fetchStudentAttendanceHistry = createAsyncThunk(
  "fetch/AttendanceHistry",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await privateGet("/attendance/student/last-three-months", token);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const fetchStudentBatchAttendance = createAsyncThunk(
  "fetch/batchAttendanceHistry",
  async ({ token,batchId }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/attendance/student/attendance/${batchId}`, token);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const createAttendanceSlice = createSlice({
    name: "createAttendance",
    initialState: {
      createAttendance: [],
      studentAttendances: [],
      studentAttendancesHistry: [],
      studentBatchAttendancesHistry: [],
      isLoading: false,
      isError: false,
      success: false
      // error: "",
    }, reducers: {
  
      createAttendanceClean: (state) => {
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createAttendance.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(createAttendance.fulfilled, (state, action) => {
          state.createAttendance = action.payload;
          state.isLoading = false;
          state.success = true;
        })
        .addCase(createAttendance.rejected, (state, action) => {
          state.isLoading = true;
          state.createAttendance = [];
          state.isError = true;
          state.success = false;
        })
        .addCase(fetchStudentAttendance.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(fetchStudentAttendance.fulfilled, (state, action) => {
          state.studentAttendances = action.payload;
          state.isLoading = false;
          state.success = true;
        })
        .addCase(fetchStudentAttendance.rejected, (state, action) => {
          state.isLoading = true;
          state.studentAttendances = [];
          state.isError = true;
          state.success = false;
        })
        .addCase(fetchStudentAttendanceHistry.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(fetchStudentAttendanceHistry.fulfilled, (state, action) => {
          state.studentAttendancesHistry = action.payload;
          state.isLoading = false;
          state.success = true;
        })
        .addCase(fetchStudentAttendanceHistry.rejected, (state, action) => {
          state.isLoading = true;
          state.studentAttendancesHistry = [];
          state.isError = true;
          state.success = false;
        })
        .addCase(fetchStudentBatchAttendance.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(fetchStudentBatchAttendance.fulfilled, (state, action) => {
          state.studentBatchAttendancesHistry = action.payload;
          state.isLoading = false;
          state.success = true;
        })
        .addCase(fetchStudentBatchAttendance.rejected, (state, action) => {
          state.isLoading = true;
          state.studentBatchAttendancesHistry = [];
          state.isError = true;
          state.success = false;
        })
    },
  });
  export const { createAttendanceClean } = createAttendanceSlice.actions;
  export default createAttendanceSlice.reducer;