import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { CgMenuGridO } from 'react-icons/cg';
import { logout } from '../../redux/reducers/auth/authSlice';
import { FaFacebookMessenger } from "react-icons/fa";
const Navbar = () => {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.user);
    const [active, setActive] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setActive(false);
    };

    // const dashboardLink = user?.role === 'teacher' ? '/tutor/dashboard' : '/student/dashboard';
    const dashboardLink = user?.role === 'teacher' ? '/tutor/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';


    return (
        <nav className="w-full md:w-full lg:w-full xl:w-3/4 mx-auto relative">
            <div className="container py-4 mx-auto">
                <div className="flex lg:items-center justify-between">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-gray-900 text-xl md:text-3xl font-semibold nav-text font-mono">
                            Porao
                        </Link>
                    </div>
                    <div className="hidden md:flex absolute inset-x-0 z-20 w-full px-6 transition-all duration-300 ease-in-out bg-gray-800 dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:items-center">
                        <div className="flex flex-col -mx-6 md:flex-row md:items-center md:mx-4 lg:mx-4 2xl:mx-8">
                            <Link to="#" className="mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 dark:hover:bg-gray-700 font-mono">Contact Us</Link>
                            <Link to="#" className="px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 dark:hover:bg-gray-700 font-mono">About Us</Link>
                           
                            {token && user?.role === "teacher" ?
                                null :
                                <Link to="/auth/tutor/register" className="px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 dark:hover:bg-gray-700 font-mono">Become a Tutor</Link>
                            }
                             {token && user?.role === "teacher" ?
                                null :
                                <Link to="/home/tutor" className="px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 dark:hover:bg-gray-700 font-mono">Find Home Tutor</Link>
                            }
                        </div>
                        {token ? <Link to="/conversations" className="px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 dark:hover:bg-gray-700 font-mono">
                        <FaFacebookMessenger className='text-xl text-blue-500'/>
                        
                        </Link>:null}
                        {token ? (
                            <Link to={dashboardLink}>
                                <img src={user?.image} alt="" className="h-8 w-8 border rounded-full border-gray-900" />
                            </Link>
                        ) : (
                            <div className="flex items-center xl:mt-0">
                                <Link to="/auth/student/login">
                                    <h3 className="px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 dark:hover:bg-gray-700 font-mono">Signin</h3>
                                </Link>
                            </div>
                        )}
                    </div>
                    <CgMenuGridO className="flex md:hidden text-gray-900 text-2xl" />
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
