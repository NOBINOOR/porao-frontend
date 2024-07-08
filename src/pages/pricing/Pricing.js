import React from 'react';


const Pricing = () => {
    return (
        <div className=" mt-8 lg:mt-52">
            <div className="container px-6 py-8 mx-auto">
                <h1 className="text-4xl font-semibold text-center text-gray-900 capitalize lg:text-3xl dark:text-gray-900 font-mono">Tutor Pricing Plan</h1>
                <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3 xl:mt-12">
                    <div className="bg-gray-800 border-gray-800 flex items-center justify-between px-8 py-12 border cursor-pointer rounded-xl dark:border-gray-700">
                        <div className="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <h2 className="text-lg font-medium text-white sm:text-xl dark:text-gray-200 font-mono">Basic</h2>
                        </div>
                        <h2 className="text-2xl font-semibold text-white sm:text-3xl dark:text-gray-300 ">Free</h2>
                    </div>
                    <div className="bg-gray-900 flex items-center justify-between px-8 py-8 border border-gray-900 cursor-pointer rounded-xl">
                        <div className="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600 dark:text-blue-500 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <h2 className="text-lg font-medium text-white sm:text-xl dark:text-gray-200 font-mono">Standard</h2>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                            <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full dark:text-blue-400 sm:px-4 sm:py-1 dark:bg-gray-700 ">
                                Save 30%
                            </div>
                            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-500 sm:text-3xl">$99 <span className="text-base font-medium ">/Yearly</span></h2>
                        </div>
                    </div>
                    <div className="bg-gray-800 border-gray-800  flex items-center justify-between px-8 py-8 border cursor-pointer rounded-xl dark:border-gray-700">
                        <div className="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>

                            <h2 className="text-lg font-medium text-white sm:text-xl dark:text-gray-200 font-mono">Pro</h2>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                            <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full dark:text-blue-400 sm:px-4 sm:py-1 dark:bg-gray-700 ">
                                Save 20%
                            </div>
                            <h2 className="text-2xl font-semibold text-white sm:text-3xl dark:text-gray-300">$149 <span className="text-base font-medium">/Month</span></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;