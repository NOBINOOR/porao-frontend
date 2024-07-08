import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAttendanceHistry } from '../../../../redux/reducers/attendance/createAttendanceSlice';
import { Link } from 'react-router-dom';

const AttendanceCard = () => {
    const { token } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudentAttendanceHistry({ token }));
  }, [dispatch, token]);
  const {data  } = useSelector(
    (state) => state.attendance.studentAttendances
  );
    return (
        <div className='w-full'>
          <Link to='/student/dashboard/attendance'>
          <div className=' h-40 w-full overflow-hidden bg-pink-500 rounded-lg shadow-lg dark:bg-gray-800 p-4'>
            <p className='text-start text-2xl text-white flex justify-center items-center'>Total Attendances </p>
            <p className=' mt-4 text-start text-3xl text-white flex justify-center items-center'>{data?.presentPercentage} %</p>
        </div></Link>
        </div>
    );
};

export default AttendanceCard;