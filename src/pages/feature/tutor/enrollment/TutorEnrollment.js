import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherEnrollment, updateEnrollmentClean, updateEnrollmentStatus } from "../../../../redux/reducers/enrollment/teacherBookSlice";
import { formatDate } from "../../../../redux/utilities/helper";
import { CiEdit } from "react-icons/ci";
import { message } from 'antd';

const TutorEnrollment = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user.user);
  const { tutorEnrollments, updateStatus } = useSelector((state) => state.enrollment);

  useEffect(() => {
    dispatch(fetchTeacherEnrollment({ token }));
  }, [dispatch, token]);

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleUpdate = (enrollmentId) => {
    setEnrollmentId(enrollmentId);
    setIsOpen(true);
  };

  const updateEnrollment = () => {
    dispatch(updateEnrollmentStatus({ token, enrollmentId, status }));
  };

  useEffect(() => {
    if (updateStatus) {
      message.success("Enrollment Status updated successfully");
      dispatch(updateEnrollmentClean());
      setIsOpen(false); // Close the modal after successful update
    }
  }, [updateStatus, dispatch]);

  return (
    <div className="w-full p-16">
      <h2 className="text-start text-2xl font-semibold text-gray-700 capitalize dark:text-white">
        My Enrollment
      </h2>
      <section className="w-full  mx-auto ">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Batch
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Student
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Edit Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {tutorEnrollments?.map((dt) => (
                      <tr key={dt.enrollmentId}>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {formatDate(dt.createdAt)}
                            </p>
                          </div>
                        </td>
                        <td className=" text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">
                              {dt.batchInfo?.name}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">
                              {dt.studentInfo?.name}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <h2 className="text-start text-green-500">
                            {dt.status}
                          </h2>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <CiEdit
                            className="text-xl text-red-500"
                            onClick={() => handleUpdate(dt.enrollmentId)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white  shadow-2xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-2 text-center">
                  <h3
                    className="text-start text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Update Enrollment Status
                  </h3>
                  <div className="mt-8 mb-8">
                    <p id="demo-row-radio-buttons-group-label" className="text-start mb-4">
                      Select Status
                    </p>
                    <input
                      name="status"
                      type="radio"
                      value="approved"
                      
                      onChange={(e) => setStatus(e.target.value)}
                    />{" "}
                    Approved  {" "}
                    <input
                      type="radio"
                      name="status"
                      value="rejected"
                      onChange={(e) => setStatus(e.target.value)}
                    />{" "}
                    Rejected
                  </div>
                </div>
              </div>

              <div className="mt-5 ">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleModalClose}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md sm:w-auto sm:mt-0 hover:bg-black focus:outline-none"
                    onClick={updateEnrollment}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorEnrollment;



// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTeacherEnrollment, updateEnrollmentClean, updateEnrollmentStatus } from "../../../../redux/reducers/enrollment/teacherBookSlice";
// import { formatDate } from "../../../../redux/utilities/helper";
// import { CiEdit } from "react-icons/ci";
// import { useState } from "react";
// import { message } from 'antd';

// const TutorEnrollment = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.user.user);
//   const { tutorEnrollments,updateStatus } = useSelector((state) => state.enrollment);
//   useEffect(() => {
//     dispatch(fetchTeacherEnrollment({ token }));
//   }, [dispatch, token]);

//   const [isOpen, setIsOpen] = useState(false);
//   const [status, setStatus] = useState("");
//   const [enrollmentId, seteErollmentId] = useState("");

//   const handleModalClose = () => {
//     setIsOpen(false);
//   };
//   const handleUpdate = (enrollmentId) => {
//     seteErollmentId(enrollmentId)
//     setIsOpen(true);
//   };
//   const updateEnrollment = () => {
//     console.log("enrollmentId", enrollmentId);
//     console.log(status);
//     dispatch(updateEnrollmentStatus({ token,  enrollmentId,status }))
//   }
//   useEffect(()=>{
//  if(updateStatus){
//   message.success("Enrollment Status updated successfull");
//   dispatch(updateEnrollmentClean())
//  }
//   },[updateStatus,dispatch])

//   return (
//     <div className="w-full p-16">
//       <h2 className="text-start text-2xl font-semibold text-gray-700 capitalize dark:text-white">
//         My Enrollment
//       </h2>
//       <section className="w-full  mx-auto ">
//         <div className="flex flex-col mt-6">
//           <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//               <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-800">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
//                       >
//                         Date
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
//                       >
//                         Batch
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
//                       >
//                         Student
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
//                       >
//                         Status
//                       </th>

//                       <th
//                         scope="col"
//                         className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
//                       >
//                         Edit Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
//                     {tutorEnrollments?.map((dt) => (
//                       <tr>
//                         <td className="px-4 py-4 text-sm whitespace-nowrap">
//                           <div>
//                             <p className="text-gray-500 dark:text-gray-400">
//                               {formatDate(dt.createdAt)}
//                             </p>
//                           </div>
//                         </td>
//                         <td className=" text-sm font-medium whitespace-nowrap">
//                           <div>
//                             <h2 className="font-medium text-gray-800 dark:text-white ">
//                               {dt.batchInfo?.name}
//                               {/* Hello */}
//                             </h2>
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
//                           <div>
//                             <h2 className="font-medium text-gray-800 dark:text-white ">
//                               {dt.studentInfo?.name}
//                             </h2>
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
//                           <h2 className="text-start text-green-500">
//                             {" "}
//                             {dt.status}
//                           </h2>
//                         </td>
//                         <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
//                           <CiEdit
//                             className="text-xl text-red-500"
//                             onClick={() => handleUpdate(dt.enrollmentId)}
//                           />
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

//       {isOpen && (
//         <div
//           className="fixed inset-0 z-10 overflow-y-auto"
//           aria-labelledby="modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>

//             <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
//               <div>
//                 <div className="mt-2 text-center">
//                   <h3
//                     className="text-start text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
//                     id="modal-title"
//                   >
//                     Update Enrollment Status
//                   </h3>
//                   <div className="mt-8 mb-8">

//                     <p
//                       id="demo-row-radio-buttons-group-label"
//                       className="text-start"
//                     >
//                       Select Status
//                     </p>
//                     {" "}
//                     <input
//                       name="status"
//                       type="radio"
//                       value="approved"
//                       onChange={(e) => setStatus(e.target.value)}
//                     ></input>{" "}
//                     Approved  {" "}
//                     <input
//                       type="radio"
//                       name="status"
//                       value="rejected"
//                       onChange={(e) => setStatus(e.target.value)}
//                     ></input>{" "}
//                     Rejected
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-5 ">
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={handleModalClose}
//                     className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
//                   >
//                     Cancel
//                   </button>
//                   <button className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md sm:w-auto sm:mt-0 hover:bg-black focus:outline-none " onClick={updateEnrollment}>
//                     Update
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorEnrollment;
