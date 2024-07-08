import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateGet, privatePatch, privatePost, privatePut } from "../../utilities/apiCaller";

export const createEnrollmentTeacher = createAsyncThunk(
    "create/teacher/enrollment",
    async ({ token, data }, { rejectWithValue }) => {
        try {
            const response = await privatePost("/enrollment/create/new", token, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const fetchStudentEnrollment = createAsyncThunk(
    'fetchStudentEnrollment',
    async ({ token }, { rejectWithValue }) => {
        try {
            const enrollments = await privateGet('/enrollment/student', token);
            return enrollments;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const fetchTeacherEnrollment = createAsyncThunk(
    'fetchTeacherEnrollment',
    async ({ token }, { rejectWithValue }) => {
        try {
            const enrollments = await privateGet('/enrollment/teacher', token);
            return enrollments;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const updateEnrollmentStatus = createAsyncThunk(
    "teacher/updateEnrollmentStatus",
    async ({ token, enrollmentId, status }, { rejectWithValue }) => {
        try {
            const response = await privatePatch(`/enrollment/update/${enrollmentId}`, token, { status });
            return { enrollmentId, status, ...response.data };
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const teacherEnrollmentSlice = createSlice({
    name: "posts",
    initialState: {
        enrollment: [],
        myEnrollments: [],
        tutorEnrollments: [],
        updatedStatus: {},
        isLoading: false,
        isError: false,
        success: false,
        updateStatus: false,
        isEnrollemtUpdated: false
    },
    reducers: {
        enrollmentClean: (state) => {
            state.errorMessage = "";
            state.success = false;
            state.isEnrollemtUpdated = false;
        },
        updateEnrollmentClean: (state) => {
            state.isEnrollemtUpdated = false;
            state.updateStatus = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEnrollmentTeacher.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createEnrollmentTeacher.fulfilled, (state, action) => {
                state.enrollment = action.payload;
                state.isLoading = false;
                state.success = true;
            })
            .addCase(createEnrollmentTeacher.rejected, (state, action) => {
                state.isLoading = true;
                state.enrollment = [];
                state.isError = true;
            })
            .addCase(fetchStudentEnrollment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStudentEnrollment.fulfilled, (state, action) => {
                state.myEnrollments = action.payload.enrollments;
                state.isLoading = false;
            })
            .addCase(fetchStudentEnrollment.rejected, (state, action) => {
                state.isLoading = true;
                state.myEnrollments = [];
            })
            .addCase(fetchTeacherEnrollment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTeacherEnrollment.fulfilled, (state, action) => {
                state.tutorEnrollments = action.payload.enrollments;
                state.isLoading = false;
            })
            .addCase(fetchTeacherEnrollment.rejected, (state, action) => {
                state.isLoading = true;
                state.tutorEnrollments = [];
            })
            .addCase(updateEnrollmentStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEnrollmentStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updatedStatus = action.payload;
                state.errorMessage = "";
                state.isEnrollemtUpdated = true;
                state.updateStatus = true;
                // Update the specific enrollment in the array
                const index = state.tutorEnrollments.findIndex(enrollment => enrollment.enrollmentId === action.payload.enrollmentId);
                if (index !== -1) {
                    state.tutorEnrollments[index].status = action.payload.status;
                }
            })
            .addCase(updateEnrollmentStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
            });
    },
});

export const { enrollmentClean, updateEnrollmentClean } = teacherEnrollmentSlice.actions;
export default teacherEnrollmentSlice.reducer;





// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { privateGet, privatePatch, privatePost, privatePut,} from "../../utilities/apiCaller";


// export const createEnrollmentTeacher = createAsyncThunk(
//     "create/teacher/enrollment",
//     async ({ token,data},{ rejectWithValue }) => {
//         try{
//             const response = await privatePost("/enrollment/create/new",token,data);
//         return response.data;
//         }catch (err) {
//             return rejectWithValue(err.response.data.message);
//           }
//     }
// );
// export const fetchStudentEnrollment = createAsyncThunk(
//     'fetchStudentEnrollment ',
//     async ({token}, { rejectWithValue }) => {
//         try{
//             const enrollments = await privateGet('/enrollment/student',token);
//             return enrollments;
//         }catch (err) {
//             return rejectWithValue(err.response.data.message);
//           }
//     }
// );
// export const fetchTeacherEnrollment = createAsyncThunk(
//     'fetchTeacherEnrollment ',
//     async ({token}, { rejectWithValue }) => {
//         try{
//             const enrollments = await privateGet('/enrollment/teacher',token);
//             return enrollments;
//         }catch (err) {
//             return rejectWithValue(err.response.data.message);
//           }
//     }
// );

// export const updateEnrollmentStatus = createAsyncThunk(
//     "teacher/updateEnrollmentStatus",
//     async ({ token,enrollmentId,status}, { rejectWithValue }) => {
//       try {
//         const response = await privatePatch(`/enrollment/update/${enrollmentId}`, token, {status});
//         return response;
//       } catch (err) {
//         return rejectWithValue(err.response);
//       }
//     }
//   );
// export const teacherEnrollmentSlice = createSlice({
//     name: "posts",
//     initialState: {
//         enrollment: [],
//         myEnrollments: [],
//         tutorEnrollments: [],
//         updatedStatus: {},
//         isLoading: false,
//         isError: false,
//         success:false,
//         updateStatus:false,
//         isEnrollemtUpdated:false
//     },
//     reducers: {
//         enrollmentClean: (state) => {
//           state.errorMessage = "";
//           state.success = false;
//           state.isEnrollemtUpdated = false;
//         },
//         updateEnrollmentClean: (state) => {
//             state.isEnrollemtUpdated = false;
//             state.updateStatus=false
//           },

//       },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createEnrollmentTeacher.pending, (state) => {
//                 state.isError = false;
//                 state.isLoading = true;
//             })
//             .addCase(createEnrollmentTeacher.fulfilled, (state, action) => {
//                 state.enrollment = action.payload;
//                 state.isLoading = false;
//                 state.success=true
//             })
//             .addCase(createEnrollmentTeacher.rejected, (state, action) => {
//                 state.isLoading = true;
//                 state.enrollment = [];
//                 state.isError = true;
//                 // state.error = action.payload.error?.message;
//             })
//             .addCase(fetchStudentEnrollment.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(fetchStudentEnrollment.fulfilled, (state, action) => {
//                 state.myEnrollments= action.payload.enrollments;
//                 console.log("payload",action.payload.enrollments)
//                 state.isLoading = false
                
//             })
//             .addCase(fetchStudentEnrollment.rejected, (state, action) => {
//                 state.isLoading = true
//                 state.myEnrollments = [];
//             })
//             .addCase(fetchTeacherEnrollment.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(fetchTeacherEnrollment.fulfilled, (state, action) => {
//                 state.tutorEnrollments= action.payload.enrollments;
//                 console.log("payload",action.payload.enrollments)
//                 state.isLoading = false
                
//             })
//             .addCase(fetchTeacherEnrollment.rejected, (state, action) => {
//                 state.isLoading = true
//                 state.tutorEnrollments = [];
//             })
//             builder.addCase(updateEnrollmentStatus.pending, (state) => {
//                 state.isLoading = true;
//               });
//               builder.addCase(updateEnrollmentStatus.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.updatedStatus = action.payload;
//                 state.errorMessage = "";
//                 state.isEnrollemtUpdated=true
//                 state.updateStatus=true
//               });
//               builder.addCase(updateEnrollmentStatus.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.errorMessage = action.payload.data.message;
//               });
//     },
// });
// export const { enrollmentClean,updateEnrollmentClean } = teacherEnrollmentSlice.actions;
// export default teacherEnrollmentSlice.reducer;