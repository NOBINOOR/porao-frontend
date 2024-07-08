import React from 'react';
import ConversationSidebar from '../../components/teacher/ConversationSidebar';
import MessageContainer from './MessageContainer';

const MainConversation = () => {
    return (
        <div className='flex w-full  xl:w-2/4 mx-auto mt-24 border border-gray-100'>
            <div className='w-2/4 '>
            <ConversationSidebar/>
            </div>
            <div className='w-full bg-gray-100 '>
                <MessageContainer/>
            </div>
        </div>
    );
};

export default MainConversation;