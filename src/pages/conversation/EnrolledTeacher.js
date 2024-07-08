import React from 'react';
import { removeSelectedTeacher, setSelectedTeacher } from '../../redux/reducers/conversations/enrolledTeacherSlice';
import { useDispatch } from 'react-redux';

const EnrolledTeacher = ({teacher}) => {
    const dispatch=useDispatch()
    const handleTeacherClick = () => {
        dispatch(removeSelectedTeacher());
        dispatch(setSelectedTeacher(teacher?.teacher));
      };
    return (
        <div className='flex flex-col py-4'>

            <div className='flex gap-2'>
            <img src={teacher?.teacher.image} alt="" className='h-8 w-8 border rounded-full'/>
            <p className='text-gray-700 text-sm flex items-center' onClick={handleTeacherClick}>{teacher?.teacher.name}</p>
            </div>
        </div>
    );
};

export default EnrolledTeacher;