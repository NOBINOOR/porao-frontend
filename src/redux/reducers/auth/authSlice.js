import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privatePutFile, publicPost } from "../../utilities/apiCaller";


export const createUserLogin = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/auth/student/login", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const createTutorLogin = createAsyncThunk(
  "tutor/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/teacher/login", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const updateTutorProfile = createAsyncThunk(
  "teacher/updateTeacherProfile",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePutFile("/teacher/update/profile", token, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const updateStudentProfile = createAsyncThunk(
  "auth/updateStudentProfile",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePutFile("/auth/student/update/profile", token, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: {},
    error: false,
    errorMessage: "",
    updatedStudent: false,
    updatedTeacher: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = {};
      state.token = "";
      state.error = false;
      state.errorMessage = "";
    },
    errorClean: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.updatedStudent = false;
      state.updatedTeacher = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserLogin.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errorMessage = "";
      state.token = action.payload.token;
    });
    builder.addCase(createUserLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.data.message;
    });
    builder.addCase(createTutorLogin.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createTutorLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errorMessage = "";
      state.token = action.payload.token;
    });
    builder.addCase(createTutorLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.data.message;
    });
    builder.addCase(updateTutorProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateTutorProfile.fulfilled, (state, action) => {
      const { user: previousUser } = state;
      state.isLoading = false;
      state.error = null;
      state.updatedTeacher = true;
      state.user = { token: previousUser.token, ...action.payload };
      state.errorMessage = "";
    });
    builder.addCase(updateTutorProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.data.message;
    })
    builder.addCase(updateStudentProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateStudentProfile.fulfilled, (state, action) => {
      const { user: previousUser } = state;
      state.isLoading = false;
      state.error = null;
      state.updatedStudent = true;
      state.user = { token: previousUser.token, ...action.payload };
      state.errorMessage = "";
    });
    builder.addCase(updateStudentProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.data.message;
    })
  },
});

export const { login, logout, errorClean } = authSlice.actions;
export default authSlice.reducer;