import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { message } from 'antd';
import { updatePostClean } from '../../../../redux/reducers/tuionPost/uploadBatchSlice';
import { createTutionPost } from '../../../../redux/reducers/tuionPost/tuitionPostSlice';
const PostForm = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.user.user);
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            description
        };
        dispatch(createTutionPost({ token, data }))
    };
    const { success, isLoading } = useSelector((state) => state.uploadPost);
    useEffect(() => {
        if (success) {
            message.success("Post Successfully Uploaded");
            dispatch(updatePostClean());
            setDescription('')
        }
    }, [dispatch, success]);
    return (
        <div className="w-3/4 xl:w-2/4 p-16">
            <h2 className="text-start text-2xl text-gray-900">Became a Home Tutor</h2>

            <form className=" gap-6 mt-20 " onSubmit={handleSubmit}>

                <div>
                    <label className="text-start block mb-2 text-sm text-gray-600 dark:text-gray-200">Write a description</label>
                    <textarea type="text" placeholder="Write a description" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 h-48"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                {isLoading ? (
                    <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500  ">
                        Loading
                    </button>
                ) : (
                    <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 ">
                        Upload
                    </button>
                )}
            </form>
        </div>
    );
};

export default PostForm;