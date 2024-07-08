import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';

export const fetchEnrolledTeacherByStudent = createAsyncThunk(
  'fetch/enrolledTeacher',
  async ({ token }, { rejectWithValue }) => {
    const response = await privateGet('/enrollment/student/enrolled-teachers', token);
    return response;
  }
);

export const enrolledTeacherSlice = createSlice({
  name: 'enrolledTeacher',
  initialState: {
    enrolledTeachers: [],
    isLoading: false,
    selectedTeacher: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledTeacherByStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEnrolledTeacherByStudent.fulfilled, (state, action) => {
        state.enrolledTeachers = action.payload.enrollments;
        state.isLoading = false;
      })
      .addCase(fetchEnrolledTeacherByStudent.rejected, (state, action) => {
        state.isLoading = true;
        state.enrolledTeachers = [];
      });
  },
  reducers: {
    setSelectedTeacher: (state, action) => {
        state.selectedTeacher = null; // Remove previous selected teacher
        localStorage.removeItem('selectedTeacher'); // Remove from local storage
        state.selectedTeacher = action.payload; // Add new selected teacher
        localStorage.setItem('selectedTeacher', JSON.stringify(action.payload)); // Add to local storage
      },
      removeSelectedTeacher: (state) => {
        state.selectedTeacher = null;
        localStorage.removeItem('selectedTeacher');
      },
  },
});

export const { setSelectedTeacher, removeSelectedTeacher } = enrolledTeacherSlice.actions;
export default enrolledTeacherSlice.reducer;









// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { privateGet } from '../../utilities/apiCaller';



// export const fetchEnrolledTeacherByStudent = createAsyncThunk(
//     'fetch/enrolledTeacher ',
//     async ({token}, { rejectWithValue }) => {
//         const response = await privateGet('/enrollment/student/enrolled-teachers',token);
//         return response;
//     }
// );
// export const enrolledTeacherSlice = createSlice({
//     name: 'enrolledTeacher',
//     initialState:{
//         enrolledTeachers: [],
//         isLoading: false,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchEnrolledTeacherByStudent.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(fetchEnrolledTeacherByStudent.fulfilled, (state, action) => {
//                 state.enrolledTeachers = action.payload.enrollments;
//                 state.isLoading = false
                
//             })
//             .addCase(fetchEnrolledTeacherByStudent.rejected, (state, action) => {
//                 state.isLoading = true
//                 state.enrolledTeachers = [];
               
//             })
//     }
// });

// export default enrolledTeacherSlice.reducer;