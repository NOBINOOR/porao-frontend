import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorClean, updateStudentProfile } from '../../../../redux/reducers/auth/authSlice';
import { useEffect } from 'react';
import { message } from 'antd';
const StudentProfile = () => {
    const dispatch = useDispatch();
    const { user, updatedStudent, isLoading } = useSelector(state => state.user);
    const { token } = useSelector(state => state.user.user);
    const [image, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [institution, setInstitution] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [standard, setStandard] = useState("");
    const updateProfileDataChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('institution', institution);
        formData.append('gender', gender);
        formData.append('standard', standard);
        formData.append('image', image);
        console.log("Form data before dispatch:", {
            name, email, phoneNumber, address, institution, gender, standard, image
        });
        dispatch(updateStudentProfile({ token, data: formData }));
    };
    useEffect(() => {
        if (user) {
            setAvatarPreview(user?.image);
            setName(user?.name);
            setPhone(user?.phoneNumber);
            setAddress(user?.address);
            setEmail(user?.email);
            setGender(user?.gender);
            setStandard(user?.standard);
            setInstitution(user?.institution);
        }
    }, [user]);

    useEffect(() => {
        if (updatedStudent) {
            message.success("Profile Successfully Updated");
            dispatch(errorClean());
        }
    }, [updatedStudent, dispatch]);
    return (
        <section className="w-3/4 p-16">
            <h2 className="text-start text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>

            <form onSubmit={handleUpdateProfile} className='mt-12'>
                <div>
                    <div className="image-section  flex flex-1 items-center justify-center gap-2">
                        <img
                            alt=""
                            src={avatarPreview}
                            // sx={{ width: 256, height: 156 }}
                            className="h-32 w-56 border rounded-lg"
                        />
                        <label>
                            +
                            <br />
                            <input
                                type="file"
                                name="image"
                                multiple
                                onChange={updateProfileDataChange}
                                accept="image/png,image/jpeg,image/webp"
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                    <div>

                        <input id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='Full Name'
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </div>

                    <div>
                        <input id="email" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>

                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Phone'
                            value={phoneNumber}
                            onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Gender'
                            value={gender}
                            onChange={e => setGender(e.target.value)} />
                    </div>
                    <div>

                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Address'
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
                    </div>

                    <div>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Which Standard'
                            value={standard}
                            onChange={e => setStandard(e.target.value)} />
                    </div>
                    <div>

                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Institution Name'
                            value={institution}
                            onChange={e => setInstitution(e.target.value)} />
                    </div>


                </div>

                <div className="flex justify-end mt-6">
                    {isLoading ? (
                        <button className="font-mono mt-4 w-1/4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500  ">
                            Loading
                        </button>
                    ) : (
                        <button className="font-mono mt-4 w-1/4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 ">
                            Update
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};

export default StudentProfile;