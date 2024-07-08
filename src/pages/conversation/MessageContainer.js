import React from 'react';
import { useSelector } from 'react-redux';
import conversationImg from '../../assets/conversation.jpg'
const MessageContainer = () => {
    const { selectedTeacher } = useSelector((state) => state.enrolledTeachers);
    return (
        <div>
            {
                selectedTeacher ? <div>

                </div>:
                <div className=' flex justify-center items-center h-full'>
                    <h2 className='text-xl mt-16 mb-8'>Please start a conversation</h2>
                </div>
            }
        </div>
    );
};

export default MessageContainer;