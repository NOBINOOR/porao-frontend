import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from "../../utilities/apiCaller";



export const createStudentRegister = createAsyncThunk(
  "student/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/auth/student/register", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const createTeacherRegister = createAsyncThunk(
  "teacher/register",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data",data)
      const response = await publicPost("/teacher/register", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    register: {},
    tutorRegister:{},
    error: false,
    success: false,
    errorMessage: "",
    email: '',
  },
  reducers: {
    registrationClean: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createStudentRegister.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createStudentRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.register = action.payload;
      state.errorMessage = "";
      state.success = true;
    });
    builder.addCase(createStudentRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.data.message;
    })
    builder.addCase(createTeacherRegister.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createTeacherRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.tutorRegister = action.payload;
      state.errorMessage = "";
      state.success = true;
      state.email = action.meta.arg.email;
      // Save phone and pin to localStorage
      localStorage.setItem('email', action.meta.arg.email);
    });
    builder.addCase(createTeacherRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.data.message;
    });
  },
});
export const { registrationClean } = registerSlice.actions;
export default registerSlice.reducer;