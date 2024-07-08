import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentEnrollment } from '../../../../redux/reducers/enrollment/teacherBookSlice';
import { Link } from 'react-router-dom';

const EnrollmentCrad = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user.user);
    const { count } = useSelector((state) => state.enrollment.myEnrollments);
    useEffect(() => {
        dispatch(fetchStudentEnrollment({ token }));
    }, [dispatch, token]);
    return (
        <div className='w-full'>
            <Link to="/student/dashboard/enrollment">
                <div className=' h-40 w-full overflow-hidden bg-blue-500 rounded-lg shadow-lg dark:bg-gray-800 p-4'>
                    <p className='text-start text-2xl text-white flex justify-center items-center'>Total Enrollments </p>
                    <p className=' mt-4 text-start text-3xl text-white flex justify-center items-center'>{count}</p>
                </div></Link>
        </div>

    );
};

export default EnrollmentCrad;