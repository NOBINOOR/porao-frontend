import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';


export const fetchStudentPendingEnrollment = createAsyncThunk(
    'fetch/StudentPendingEnrollment ',
    async ({token}, { rejectWithValue }) => {
        const results = await privateGet('/enrollment/student/pending',token);
        return results;
    }
);
export const fetchStudentApprovedEnrollment = createAsyncThunk(
    'fetch/StudentApprovedEnrollment ',
    async ({token}, { rejectWithValue }) => {
        const results = await privateGet('/enrollment/student/approved',token);
        return results;
    }
);
// export const fetchEmployerApprovedJobs = createAsyncThunk(
//     'fetch/EmployerApprovedJobs ',
//     async ({token}, { rejectWithValue }) => {
//         const jobs = await privateGet('/user/approved/job',token);
//         return jobs;
//     }
// );

// export const fetchEmployerAllJobs = createAsyncThunk(
//     'fetch/EmployerAllJobs ',
//     async ({token}, { rejectWithValue }) => {
//         const jobs = await privateGet('/user/upload/job',token);
//         return jobs;
//     }
// );
export const studentEnrollmentStatusSlice = createSlice({
    name: 'employerPendingJobs',
    initialState:{
        // employerJobs: [],
        pendingStatus:[],
        approvedStatus:[],
        isLoading: false,
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentPendingEnrollment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchStudentPendingEnrollment.fulfilled, (state, action) => {
                state.pendingStatus = action.payload;
                state.isLoading = false
                
            })
            .addCase(fetchStudentPendingEnrollment.rejected, (state, action) => {
                state.isLoading = true
                state.pendingStatus = [];
               
            })
            .addCase(fetchStudentApprovedEnrollment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchStudentApprovedEnrollment.fulfilled, (state, action) => {
                state.approvedStatus = action.payload;
                state.isLoading = false
                
            })
            .addCase(fetchStudentApprovedEnrollment.rejected, (state, action) => {
                state.isLoading = true
                state.approvedStatus = [];
               
            })
    }
});

export default studentEnrollmentStatusSlice.reducer;