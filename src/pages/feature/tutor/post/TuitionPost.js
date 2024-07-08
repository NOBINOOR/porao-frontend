import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../../redux/utilities/helper';
import { fetchTutionPost } from '../../../../redux/reducers/tuionPost/tuitionPostSlice';
import { createEnrollmentTeacher, enrollmentClean } from '../../../../redux/reducers/enrollment/teacherBookSlice';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const TuitonPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchTutionPost());
    }, [dispatch]);

    const { posts, isLoading } = useSelector((state) => state.posts);
    const { success, } = useSelector((state) => state.enrollment);
    const { token } = useSelector((state) => state.user.user);

    const [loadingButtons, setLoadingButtons] = useState({}); // Add this state

    const handleClick = (batchId, teacherId) => {
        const data = {
            batchId,
            teacherId,
        };
        if (token) {
            setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: true })); // Set loading for the specific button
            dispatch(createEnrollmentTeacher({ token, data }))
                .then(() => {
                    setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: false })); // Reset loading after request
                })
                .catch(() => {
                    setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: false })); // Reset loading on error
                });
        } else {
            navigate('/student/dashboard');
        }
    };

    useEffect(() => {
        if (success) {
            message.success("Enrollment request successfuly sent");
            setTimeout(() => {
                dispatch(enrollmentClean());
            }, 1000); // Clean up after 1 second
        }
    }, [success, dispatch]);

    return (
        <div className="w-full 2xl:w-3/4 mx-auto mt-24">
            <div className="flex justify-between">
                <h1 className="text-xl text-start text-gray-900 font-mono ">All Home Tutor Post</h1>
            </div>
            {
                isLoading ? <div>
                    <p className="mt-24 text-white text-sm md:text-4xl font-semibold font-serif loader-text">
                       Loading
                    </p>
                </div> : (<div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
                    {posts?.map((post) => (
                        <div key={post.postId} className="border border-gray-900 bg-gray-900 rounded-lg p-4">
                            <div className='flex gap-4'>
                                <div className="w-1/4">
                                    {
                                        post.teacherInfo?.image ? <img className="object-cover w-12 h-12 rounded-full" src={post?.teacherInfo?.image} alt=""></img> : <img className="object-cover w-12 h-12 rounded-full" src="" alt=""></img>
                                    }
                                </div>
                                {/* <div className="w-full">
                                <h1 className="text-white font-mono text-xl text-start">{post?.teacherInfo?.name}</h1>
                                <p className='text-start text-white text-xs'>Subject Name : {post.subject}</p>
                                <p className='text-start text-white text-xs'>Batch Name : {post.name}</p>
                                <p className='text-start text-white text-xs'>Capacity  :{post.capacity}</p>
                                <p className='text-start text-xs text-white '>Days: {post.days.join(', ')}</p>
                            </div> */}
                            </div>
                            <div className='mt-4'>
                                <h1 className="text-start text-xs text-white">
                                    <span className='text-blue-500'>Hey Students</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </h1>
                                <h1 className="text-white text-xs text-start font-mono mt-2">{formatDate(post?.createdAt)}</h1>
                                <button
                                    onClick={() => handleClick(post.batchId, post?.teacherInfo?.teacherId)}
                                    className={`bg-white text-gray-900 mt-4 w-2/4 h-10 justify-start ${loadingButtons[post.postId] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loadingButtons[post.postId]}
                                >
                                    {loadingButtons[post.postId] ? 'Booking...' : 'Book Tutor'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>)
            }
        </div>
    );
};

export default TuitonPost;

