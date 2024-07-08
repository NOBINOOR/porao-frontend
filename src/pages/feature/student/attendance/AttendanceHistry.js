import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentAttendanceHistry
} from "../../../../redux/reducers/attendance/createAttendanceSlice";
import { fetchStudentEnrollment } from "../../../../redux/reducers/enrollment/teacherBookSlice";
import { fetchAttendanceByBatchId } from "../../../../redux/reducers/attendance/filterStudentAttendanceApi";
import { dateFormat } from "../../../../redux/utilities/helper";

const AttendanceHistry = () => {
  const { token } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchStudentAttendanceHistry({ token }));
    dispatch(fetchStudentEnrollment({ token }));
  }, [dispatch, token]);
  
  const { attendance, totalResults } = useSelector(
    (state) => state.attendanceResults
  );
  const { enrollments } = useSelector((state) => state.enrollment.myEnrollments);
  
  const [selectedBatch, setSelectedBatch] = useState("");
  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };
  
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  
  const handleSearchClick = () => {
    const batchId = selectedBatch;
    dispatch(fetchAttendanceByBatchId({ batchId, page, perPage, token }));
  };
  
  return (
    <div>
      <p className="text-start text-2xl font-semibold text-gray-700 capitalize dark:text-white p-16">
        Attendance History
      </p>
      <div className="w-2/4 justify-start flex pl-16">
        <select
          onChange={handleBatchChange}
          value={selectedBatch}
          className="h-10 w-full border border-gray-100 outline-none"
        >
          <option value="">Select a batch</option>
          {enrollments?.map((batch) => (
            <option key={batch.id} value={batch.batchInfo.batchId}>
              {batch.batchInfo.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearchClick}
          className="h-10 w-full bg-blue-500 text-white font-semibold"
        >
          Filter
        </button>
      </div>
      <section className="w-3/4 p-16">
        {attendance && attendance.length === 0 && (
          <p className="text-xl text-gray-500 dark:text-gray-400 mt-2">No attendance data found !</p>
        )}
        {attendance && attendance?.length > 0 && (
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {attendance?.map((dt, index) => (
                        <tr key={index}>
                          <td className="px-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white text-start">
                                {dateFormat(dt.date)}
                              </h2>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              {dt.status}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AttendanceHistry;



// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchStudentAttendanceHistry
// } from "../../../../redux/reducers/attendance/createAttendanceSlice";
// import { fetchStudentEnrollment } from "../../../../redux/reducers/enrollment/teacherBookSlice";
// import { useState } from "react";
// import { fetchAttendanceByBatchId } from "../../../../redux/reducers/attendance/filterStudentAttendanceApi";
// import { dateFormat, formatDate } from "../../../../redux/utilities/helper";

// const AttendanceHistry = () => {
//   const { token } = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchStudentAttendanceHistry({ token }));
//     dispatch(fetchStudentEnrollment({ token }));
//   }, [dispatch, token]);
//   const { attendance, totalResults } = useSelector(
//     (state) => state.attendanceResults
//   );
//   const { enrollments } = useSelector((state) => state.enrollment.myEnrollments);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const handleBatchChange = (e) => {
//     setSelectedBatch(e.target.value);
//   };
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(4);
//   const handleSearchClick = () => {
//     const batchId = selectedBatch;
//     dispatch(fetchAttendanceByBatchId({ batchId, page, perPage, token }));
//   };
//   return (
//     <div>
//       <p className="text-start text-2xl font-semibold text-gray-700 capitalize dark:text-white p-16">
//         Attendance History
//       </p>
//       <div className="w-2/4 justify-start flex pl-16">
//         <select
//           onChange={handleBatchChange}
//           value={selectedBatch}
//           className="h-10 w-full border border-gray-100 outline-none"
//         >
//           <option value="">Select a batch</option>
//           {enrollments.map((batch) => (
//             <option key={batch.id} value={batch.batchInfo.batchId}>
//               {batch.batchInfo.name}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={handleSearchClick}
//           className="h-10 w-full bg-blue-500 text-white font-semibold"
//         >
//           Filter
//         </button>
//       </div>
//       <section className="w-3/4 p-16">
//         <h2 className="text-start text-xs">Search Result </h2>
//         <div className="flex flex-col mt-6">
//           <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//               <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-800">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-start"
//                       >
//                         Date
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center"
//                       >
//                         Status
//                       </th>

//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
//                     {attendance?.map((dt) => (
//                       <tr>
//                         <td className="px-4 text-sm font-medium whitespace-nowrap">
//                           <div>
//                             <h2 className="font-medium text-gray-800 dark:text-white text-start">
//                               {dateFormat(dt.date)}
//                             </h2>
//                           </div>
//                         </td>
//                         <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
//                           <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
//                             {dt.status}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AttendanceHistry;
