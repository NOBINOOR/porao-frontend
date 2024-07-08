import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/auth/authSlice";
import registerSlice from "./reducers/auth/registerSlice";
import tuitionPostSlice from "./reducers/tuionPost/tuitionPostSlice";
import  verifyOTPSlice from "./reducers/auth/verifyOtpSlice";
import  uploadTuitionPostSlice  from "./reducers/tuionPost/uploadBatchSlice";
import  singleBatchReducer  from "./reducers/batch/singleBatchSlice";
import  teacherEnrollmentSlice  from "./reducers/enrollment/teacherBookSlice";
import  batchEnrollmentSliceById  from "./reducers/enrollment/singleBatchEnrollmentSlice";
import createAttendanceSlice from "./reducers/attendance/createAttendanceSlice";
import  studentEnrollmentStatusSlice  from "./reducers/enrollment/studentEnrollmentSlice";
import attendanceSlice from "./reducers/attendance/filterStudentAttendanceApi";
import enrolledTeacherSlice from "./reducers/conversations/enrolledTeacherSlice";

const persistConfig = {
  key: "authentication",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);
const combinedReducer = {
  user: persistedReducer,
  register:registerSlice,
  otpVerification:verifyOTPSlice,
  posts:tuitionPostSlice,
  uploadPost:uploadTuitionPostSlice,
  singleBatch:singleBatchReducer,
  enrollment:teacherEnrollmentSlice,
  batchDetails:batchEnrollmentSliceById,
  attendance:createAttendanceSlice,
  enrollmentStatus:studentEnrollmentStatusSlice,
  attendanceResults:attendanceSlice,
  enrolledTeachers:enrolledTeacherSlice
 
};
const middlewares = [];
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
  // devTools: false,
});
export const persistor = persistStore(store);