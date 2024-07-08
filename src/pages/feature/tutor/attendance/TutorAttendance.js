import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherBatch } from '../../../../redux/reducers/tuionPost/uploadBatchSlice';
import { fetchEnrollmentByBatchId } from '../../../../redux/reducers/enrollment/singleBatchEnrollmentSlice';
import { formatDate } from '../../../../redux/utilities/helper';
import { IoMdAdd } from "react-icons/io";
import AttendanceModal from './AttendanceModal';

const TutorAttendance = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user.user);
    const { tutorBatches } = useSelector((state) => state.uploadPost);
    const { enrollments } = useSelector((state) => state.batchDetails);

    useEffect(() => {
        dispatch(fetchTeacherBatch({ token }));
    }, [dispatch, token]);

    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');

    const handleBatchChange = (e) => {
        setSelectedBatch(e.target.value);
    };

    const handleSearchClick = () => {
        const batchId = selectedBatch;
        dispatch(fetchEnrollmentByBatchId({ token, batchId }));
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleModalOpen = (enrollment) => {
        const studentId = enrollment.studentDetails.studentId;
        setSelectedStudentId(studentId);
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="w-full p-16">
            <h2 className="text-start text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                Give Attendance
            </h2>
            <div className='w-2/4 justify-start flex mt-8'>
                <select onChange={handleBatchChange} value={selectedBatch} className='h-10 w-full border border-gray-500 outline-none'>
                    <option value="">Select a batch</option>
                    {tutorBatches.map((batch) => (
                        <option key={batch.id} value={batch.batchId}>
                            {batch.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearchClick} className='h-10 w-full bg-black text-white'>Search</button>
            </div>

            {
                enrollments?.length ?
                    <section className="w-full mx-auto mt-24">
                        <h2 className='text-start text-xl'>All Students</h2>
                        <div className="flex flex-col mt-6">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start">
                                                        Date
                                                    </th>
                                                    <th scope="col" className="py-3.5 text-sm font-normal text-start rtl:text-right text-gray-500 dark:text-gray-400 text-start">
                                                        Batch
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start">
                                                        Student Name
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start">
                                                        Give Attendance
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {enrollments.map((enrollment) => (
                                                    <tr key={enrollment.id}>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div>
                                                                <p className="text-start text-gray-500 dark:text-gray-400">
                                                                    {formatDate(enrollment.createdAt)}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div>
                                                                <p className="text-start text-gray-500 dark:text-gray-400">
                                                                    {enrollment.batchDetails.name}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div>
                                                                <p className="text-start text-gray-500 dark:text-gray-400">
                                                                    {enrollment.studentDetails.name}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div>
                                                                <p className="text-start text-gray-500 dark:text-gray-400">
                                                                    {enrollment.studentDetails.email}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div>
                                                                <IoMdAdd className='text-xl text-blue-500 text-center' onClick={() => handleModalOpen(enrollment)} />
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
                    </section>
                    :
                    <p className='mt-32 text-red-500 '>No Data found</p>
            }
            <AttendanceModal isOpen={isOpen} handleModalClose={handleModalClose} selectedBatch={selectedBatch} studentId={selectedStudentId} />
        </div>
    );
};

export default TutorAttendance;
