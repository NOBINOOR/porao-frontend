import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privatePost, publicGet } from "../../utilities/apiCaller";
export const fetchTutionPost = createAsyncThunk(
    "fetch/tuition/post",
    async () => {
        const response = await publicGet("/teacher/tuition/post");
        return response.data;
    }
);
export const fetchTutionBatch = createAsyncThunk(
    "fetch/tuition/batch",
    async () => {
        const response = await publicGet("/batch/all/batches");
        return response.data;
    }
);
export const createTutionPost = createAsyncThunk(
    "upload/tuition/post",
    async ({ token, data }, { rejectWithValue }) => {
        try {
            const response = await privatePost("/teacher/tuition/post", token, data);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);
export const tuitionPostSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        batches:[],
        uploadPost: [],
        isLoading: false,
        isError: false,
    },
    reducers: {

        updatePostClean: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTutionPost.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTutionPost.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTutionPost.rejected, (state, action) => {
                state.isLoading = true;
                state.posts = [];
                state.isError = true;
            })
            .addCase(fetchTutionBatch.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTutionBatch.fulfilled, (state, action) => {
                state.batches = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTutionBatch.rejected, (state, action) => {
                state.isLoading = true;
                state.batches = [];
                state.isError = true;
            })
            .addCase(createTutionPost.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTutionPost.fulfilled, (state, action) => {
                state.uploadPost = action.payload;
                state.isLoading = false;
                state.success = true;
            })
            .addCase(createTutionPost.rejected, (state, action) => {
                state.isLoading = true;
                state.uploadPost = [];
                state.isError = true;
            })
    },
});
export default tuitionPostSlice.reducer;