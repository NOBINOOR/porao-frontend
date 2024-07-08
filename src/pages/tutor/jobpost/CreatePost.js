import React from 'react';

const CreatePost = () => {
    return (
        <div className=" flex flex-1 justify-center items-center mt-16 md:mt-32">
            <div className="m-4 md:m-0 w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h1 className="mt-4 text-xl text-gray-900">Create a post</h1>
                <form className="px-6 py-4">
                    <div className="flex justify-between gap-2">
                        <div className="w-full mt-4">
                            <select name="Start" className="w-full h-12 border rounded-lg " >
                                <option >Select Start Day </option>
                                <option >Saturday </option>
                                <option >Sunday </option>
                                <option >Monday </option>
                                <option >Tuesday </option>
                                <option >Wednesday </option>
                                <option >Thursday </option>
                                <option >Friday </option>
                            </select>
                        </div>
                        <div className="w-full mt-4">
                            <select name="End" className="w-full h-12 border rounded-lg " >
                                <option  >Select End Day </option>
                                <option  >Saturday </option>
                                <option >Sunday </option>
                                <option >Monday </option>
                                <option >Tuesday </option>
                                <option >Wednesday </option>
                                <option >Thursday </option>
                                <option >Friday </option>
                            </select>
                        </div>

                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="w-full mt-4">
                            <select name="Gender" className="w-full h-12 border rounded" >
                                <option  >Type </option>
                                <option  >Home Tutor</option>
                                <option >In Batch  </option>

                            </select>
                        </div>
                        <div className="w-full mt-4">
                            <select name="Gender" className="w-full h-12 border rounded" >
                                <option  >Choose Time </option>
                                <option  >Morning </option>
                                <option >Afternoon </option>
                                <option >Evening </option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        {/* <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 "
                            type="text"
                            placeholder="Tution Fees"
                            aria-label="Tution Fees"
                            // onChange={(e) => setExpert(e.target.value)}
                            required
                        /> */}
                           <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                           placeholder="Tution Fees"></input>
                    </div>
                    <div className="w-full mt-4">
                        {/* <TextArea
                            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 "
                            placeholder="About Yourself"

                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        /> */}
                        <textarea class="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="About Yourself">

                        </textarea>
                    </div>
                    <button className="mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-black focus:outline-none focus:ring focus:ring-black-300 focus:ring-opacity-50">
                        Post
                    </button>
                </form>
            </div>

        </div>
    );
};

export default CreatePost;