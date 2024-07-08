import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrolledTeacherByStudent } from '../../redux/reducers/conversations/enrolledTeacherSlice';
import { useEffect } from 'react';
import EnrolledTeacher from './EnrolledTeacher';
const EnrolledTeachers = () => {
    const { token } = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchEnrolledTeacherByStudent({ token }));
  
    }, [dispatch, token]);
    const { enrolledTeachers } = useSelector((state) => state.enrolledTeachers);
    return (
        <div>
            {
                enrolledTeachers?.map((teacher)=>{
                    return (
                        <EnrolledTeacher key={teacher._id} teacher={teacher}/>
                    )
                })
            }
        </div>
    );
};

export default EnrolledTeachers;