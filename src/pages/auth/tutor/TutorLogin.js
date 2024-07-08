import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from 'antd';
import { useEffect } from "react";
import { createTutorLogin } from "../../../redux/reducers/auth/authSlice";

const TutorLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { errorMessage, isAuthenticated} = useSelector(
        (state) => state.user
    );
    const [password, setPassword] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTutorLogin({ email, password }));
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tutor/dashboard');
        }
    }, [navigate, isAuthenticated]);
    return (
        <main className="flex flex-1 justify-center items-center mt-24">
            <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <p className="mt-10 text-start text-gray-500 dark:text-gray-400 font-mono">
                        Login or create account
                    </p>
                    <form onSubmit={handleSubmit}>

                    <div className="w-full mt-4">
                            <input
                                className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-black"
                                type="email"
                                placeholder="Email"
                                aria-label="Email"
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="w-full mt-4">
                            <input
                                className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-black dark:focus:border-black focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-black"
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <Link
                                to="#"
                                className="font-mono text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                            >
                                Forget Password?
                            </Link>

                            <button className=" font-mono px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg ">
                                Sign In
                            </button>
                        </div>
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
                        Don't have an account?{" "}
                    </span>

                    <Link
                        to="/auth/tutor/register"
                        className="font-mono mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Create
                    </Link>
                </div>
            </div>
        </main>
    );
};
export default TutorLogin;