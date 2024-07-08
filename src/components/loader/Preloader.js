import React from 'react';
import './Loader.css'
const Preloader = () => {
    return (
        <div className="w-1/4 flex flex-1 items-center justify-center mx-auto min-h-screen">
            <p to="/" className="text-white text-sm md:text-5xl font-semibold font-serif loader-text">
                পড়াও
            </p>
        </div>
    );
};

export default Preloader;