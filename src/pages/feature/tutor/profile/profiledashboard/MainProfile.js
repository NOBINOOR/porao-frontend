import React from 'react';
import LeftSidebar from '../../../../../components/teacher/LeftSidebar';
import { Outlet } from 'react-router-dom';

const MainProfile = () => {
    return (
        <div className='mt-24 flex w-10/12 2xl:w-3/4 mx-auto  border border-gray-100'>
            <div className='w-1/4 '>
            <LeftSidebar></LeftSidebar>
            </div>
            <div className='w-full bg-gray-100'>
            <Outlet />
            </div>
        </div>
    );
};

export default MainProfile;