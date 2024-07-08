import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAttendance, createAttendanceClean } from '../../../../redux/reducers/attendance/createAttendanceSlice';
import { message, } from 'antd';
const AttendanceModal = ({ isOpen, handleModalClose, selectedBatch, studentId }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [status, setStatus] = useState('');
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user.user);
    const { success, isLoading } = useSelector((state) => state.attendance);
    console.log("selectedBatch", selectedBatch);
    const handleATtendanceSubmit = () => {
        const batchId = selectedBatch
        const data = { studentId, batchId, status, date: selectedDate };
        console.log(data);
        dispatch(createAttendance({ token, data }));
    };
    useEffect(() => {
        if (success) {
            message.success("Attendance successfully placed");
            dispatch(createAttendanceClean())
        }
    }, [success, dispatch]);
    return (
        <div>
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

                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-2xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                <div className="mt-2 text-center">
                                    <h3
                                        className="text-start text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                                        id="modal-title"
                                    >
                                        Update Attendance
                                    </h3>
                                    <div className="mt-8 mb-8">
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            className="border w-3/4 mx-auto h-10 p-4"
                                        />
                                        <div className="mt-8 mb-8  w-3/4 mx-auto">

                                            <input
                                                name="status"
                                                type="radio"
                                                value="present"
                                              onChange={(e) => setStatus(e.target.value)}
                                            ></input>{" "}
                                            Present  {" "}
                                            <input
                                                type="radio"
                                                name="status"
                                                value="absent"
                                              onChange={(e) => setStatus(e.target.value)}
                                            ></input>{" "}
                                            Absent
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 ">
                                <div className="flex items-center justify-between">
                                    <button
                                        // onClick={handleModalClose}
                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        onClick={handleModalClose}
                                    >
                                        Cancel
                                    </button>
                                    {
                                        isLoading ? <button className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md sm:w-auto sm:mt-0 hover:bg-black focus:outline-none " disabled>
                                            Loading
                                        </button> : <button className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md sm:w-auto sm:mt-0 hover:bg-black focus:outline-none " onClick={handleATtendanceSubmit}>
                                            Update
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceModal;