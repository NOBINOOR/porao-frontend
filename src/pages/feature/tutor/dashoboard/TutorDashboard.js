import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const TutorDashboard = () => {
    const { token, name } = useSelector((state) => state.user.user);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const currentHour = new Date().getHours();
        let greetingMessage = '';

        if (currentHour >= 5 && currentHour < 12) {
            greetingMessage = 'Good morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingMessage = 'Good afternoon';
        } else {
            greetingMessage = 'Good evening';
        }

        setGreeting(greetingMessage);
    }, []);
    return (
        <div className="w-full  border border-gray-100">
            <p className="text-start text-3xl font-semibold text-gray-700 capitalize dark:text-white 
      pl-16 pt-16">
                Dashboard
            </p>
            <p className="text-start text-xs pl-16 mt-4">{greeting}, {name}</p>
        </div>
    );
};

export default TutorDashboard;