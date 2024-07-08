import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../../redux/utilities/helper';
import { fetchTutionBatch } from '../../../../redux/reducers/tuionPost/tuitionPostSlice';
import { createEnrollmentTeacher, enrollmentClean } from '../../../../redux/reducers/enrollment/teacherBookSlice';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchTutionBatch());
    }, [dispatch]);

    const { batches, isLoading } = useSelector((state) => state.posts);
    const { success } = useSelector((state) => state.enrollment);
    const { token } = useSelector((state) => state.user.user);

    const [loadingButtons, setLoadingButtons] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleClick = (batchId, teacherId) => {
        const data = {
            batchId,
            teacherId,
        };
        if (token) {
            setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: true }));
            dispatch(createEnrollmentTeacher({ token, data }))
                .then(() => {
                    setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: false }));
                })
                .catch(() => {
                    setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: false }));
                });
        } else {
            navigate('/student/dashboard');
        }
    };

    useEffect(() => {
        if (success) {
            setModalMessage("Enrollment request successfully sent");
            setIsModalOpen(true);
            setTimeout(() => {
                dispatch(enrollmentClean());
            }, 1000);
        }
    }, [success, dispatch]);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between">
                <h1 className="text-xl text-start text-gray-900 font-mono">All Tuition Batches</h1>
                <p className="text-gray-900 text-sm font-mono">see all</p>
            </div>
            {isLoading ? (
                <div>
                    <p className="mt-24 text-white text-sm md:text-4xl font-semibold font-serif loader-text">
                        Loading
                    </p>
                </div>
            ) : (
                <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 m-4">
                    {batches?.map((post) => (
                        <div key={post.batchId} className="border border-gray-900 bg-gray-900 rounded-lg p-4">
                            <div className='flex gap-4'>
                                <div className="w-1/4">
                                    {post?.teacherInfo?.image ? (
                                        <img className="object-cover w-12 h-12 rounded-full" src={post?.teacherInfo?.image} alt="" />
                                    ) : (
                                        <img className="object-cover w-12 h-12 rounded-full" src="" alt="" />
                                    )}
                                </div>
                                <div className="w-full">
                                    <h1 className="text-white font-mono text-xl text-start">{post?.teacherInfo?.name}</h1>
                                    <p className='text-start text-white text-xs'>Subject Name : {post?.subject}</p>
                                    <p className='text-start text-white text-xs'>Batch Name : {post?.name}</p>
                                    <p className='text-start text-white text-xs'>Capacity  :{post?.capacity}</p>
                                    <p className='text-start text-xs text-white '>Days: {post.days.join(', ')}</p>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <h1 className="text-start text-xs text-white">
                                    <span className='text-blue-500'>Hey Students</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </h1>
                                <h1 className="text-white text-xs text-start font-mono mt-2">{formatDate(post?.createdAt)}</h1>
                                <button
                                    onClick={() => handleClick(post.batchId, post?.teacherInfo?.teacherId)}
                                    className={`bg-white text-gray-900 mt-4 w-2/4 h-10 justify-start ${loadingButtons[post.batchId] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loadingButtons[post.batchId]}
                                >
                                    {loadingButtons[post.batchId] ? 'Enrolling...' : 'Enroll'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && (
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
                                        className="text-start text-lg font-medium leading-6 text-green-500 capitalize dark:text-white"
                                        id="modal-title"
                                    >
                                        Enrollment Status
                                    </h3>
                                    <div className="mt-8 mb-8">
                                        <p id="demo-row-radio-buttons-group-label" className="text-start text-gray-900">
                                            {modalMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={handleModalClose}
                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 border border-red-500 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200   focus:outline-none focus:ring-opacity-40"
                                    >
                                        Close
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

export default Post;






// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { formatDate } from '../../../../redux/utilities/helper';
// import { fetchTutionBatch} from '../../../../redux/reducers/tuionPost/tuitionPostSlice';
// import { createEnrollmentTeacher, enrollmentClean } from '../../../../redux/reducers/enrollment/teacherBookSlice';
// import { message } from 'antd';
// import { useNavigate } from 'react-router-dom';

// const Post = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     useEffect(() => {
//         dispatch(fetchTutionBatch());
//     }, [dispatch]);

//     const { batches,isLoading } = useSelector((state) => state.posts);
//     const { success} = useSelector((state) => state.enrollment);
//     const { token } = useSelector((state) => state.user.user);

//     const [loadingButtons, setLoadingButtons] = useState({}); // Add this state

//     const handleClick = (batchId, teacherId) => {
//         const data = {
//             batchId,
//             teacherId,
//         };
//         if (token) {
//             setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: true })); // Set loading for the specific button
//             dispatch(createEnrollmentTeacher({ token, data }))
//                 .then(() => {
//                     setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: false })); // Reset loading after request
//                 })
//                 .catch(() => {
//                     setLoadingButtons((prevLoadingButtons) => ({ ...prevLoadingButtons, [batchId]: false })); // Reset loading on error
//                 });
//         } else {
//             navigate('/student/dashboard');
//         }
//     };

//     useEffect(() => {
//         if (success) {
//             message.success("Enrollment request successfuly sent");
//             setTimeout(() => {
//                 dispatch(enrollmentClean());
//             }, 1000); // Clean up after 1 second
//         }
//     }, [success, dispatch]);

//     return (
//         <div className="w-full mx-auto">
//             <div className="flex justify-between">
//                 <h1 className="text-xl text-start text-gray-900 font-mono ">All Tuition Batches</h1>
//                 <p className="text-gray-900 text-sm font-mono ">see all</p>
//             </div>
//             {
//                 isLoading ? <div>
                    
//                 </div>:(<div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 m-4">
//                     {batches?.map((post) => (
//                         <div key={post.batchId} className="border border-gray-900 bg-gray-900 rounded-lg p-4">
//                             <div className='flex gap-4'>
//                                 <div className="w-1/4">
//                                     {
//                                         post?.teacherInfo?.image? <img className="object-cover w-12 h-12 rounded-full" src={post?.teacherInfo?.image} alt=""></img>:<img className="object-cover w-12 h-12 rounded-full" src="" alt=""></img>
//                                     }
//                                 </div>
//                                 <div className="w-full">
//                                     <h1 className="text-white font-mono text-xl text-start">{post?.teacherInfo?.name}</h1>
//                                     <p className='text-start text-white text-xs'>Subject Name : {post?.subject}</p>
//                                     <p className='text-start text-white text-xs'>Batch Name : {post?.name}</p>
//                                     <p className='text-start text-white text-xs'>Capacity  :{post?.capacity}</p>
//                                     <p className='text-start text-xs text-white '>Days: {post.days.join(', ')}</p>
//                                 </div>
//                             </div>
//                             <div className='mt-4'>
//                                 <h1 className="text-start text-xs text-white">
//                                     <span className='text-blue-500'>Hey Students</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                                 </h1>
//                                 <h1 className="text-white text-xs text-start font-mono mt-2">{formatDate(post?.createdAt)}</h1>
//                                 <button
//                                     onClick={() => handleClick(post.batchId, post?.teacherInfo?.teacherId)}
//                                     className={`bg-white text-gray-900 mt-4 w-2/4 h-10 justify-start ${loadingButtons[post.batchId] ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                     disabled={loadingButtons[post.batchId]}
//                                 >
//                                     {loadingButtons[post.batchId] ? 'Enrolling...' : 'Enroll'}
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>)
//             }
//         </div>
//     );
// };

// export default Post;