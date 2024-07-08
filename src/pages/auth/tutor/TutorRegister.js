import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { message, Alert } from 'antd';
import { createTeacherRegister, registrationClean } from "../../../redux/reducers/auth/registerSlice";

const TutorRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, errorMessage,isLoading } = useSelector(
        (state) => state.register
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTeacherRegister({email,password}));
    };
    useEffect(() => {
        if (success) {
            message.success("Registration successful");
            const timerId = setTimeout(() => {
                navigate('/auth/tutor/verify/account');
                dispatch(registrationClean())
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [success, navigate,dispatch]);
    return (
        <main className=" flex flex-1 justify-center items-center mt-24">
            <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <p className="mt-10 text-start text-gray-500 dark:text-gray-400 font-mono">
                        Login or create account
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="justify-between gap-2">
                            <div className="w-full mt-4">
                                <input
                                    className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-black"
                                    type="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-black"
                                    type="text"
                                    placeholder="Password"
                                    aria-label="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {isLoading?<button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg ">
                            Loading
                        </button>:<button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg ">
                            Register
                        </button>}
                        {
                            errorMessage ? <Alert
                                message={errorMessage}
                                showIcon
                                type="error"
                                className="mt-4"
                            /> : null
                        }
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200 font-mono">
                        Already have an account?{" "}
                    </span>
                    <Link
                        to="/auth/tutor/login"
                        className="font-mono mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
};
export default TutorRegister;