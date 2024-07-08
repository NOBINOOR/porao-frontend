import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import { message } from 'antd';
import { errorClean, updateTutorProfile } from '../../../../redux/reducers/auth/authSlice';


const Profile = () => {
    const dispatch = useDispatch();
    const { user, updatedTeacher ,isLoading} = useSelector(state => state.user);
    const { token } = useSelector(state => state.user.user);
    const [image, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [degree, setDegree] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [expert, setExpert] = useState("");
    const [experience, setExperience] = useState("");
    const [versityName, setVersityName] = useState("");
    const [fees, setFees] = useState("");
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
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('degree', degree);
        formData.append('gender', gender);
        formData.append('fees', fees);
        formData.append('expert', expert);
        formData.append('experience', experience);
        formData.append('versityName', versityName);
        formData.append('image', image);
        console.log("Form data before dispatch:", {
            name, email, phone, address, degree, gender, fees, expert, experience, versityName, image
        });
        dispatch(updateTutorProfile({ token, data: formData }));
    };
    useEffect(() => {
        if (user) {
            setAvatarPreview(user?.image);
            setName(user?.name);
            setPhone(user?.phone);
            setAddress(user?.address);
            setEmail(user?.email);
            setGender(user?.gender);
            setDegree(user?.degree);
            setExpert(user?.expert);
            setExperience(user?.experience);
            setVersityName(user?.versityName);
            setFees(user?.fees);
        }
    }, [user]);

    useEffect(() => {
        if (updatedTeacher) {
            message.success("Profile Successfully Updated");
            dispatch(errorClean());
        }
    }, [updatedTeacher, dispatch]);
    return (
        <section className="w-3/4 p-16">
            <h2 className="text-start text-2xl font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>

            <form onSubmit={handleUpdateProfile}>
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
                            value={phone}
                             placeholder='Phone'
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
                            placeholder='Versity Name'
                            value={versityName}
                            onChange={e => setVersityName(e.target.value)} />
                    </div>
                    <div>

                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Degree'
                            value={degree}
                            onChange={e => setDegree(e.target.value)} />
                    </div>
                    <div>

                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='Expert'
                            value={expert}
                            onChange={e => setExpert(e.target.value)} />
                    </div>
                    <div>

                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Experience'
                            value={experience}
                            onChange={e => setExperience(e.target.value)} />
                    </div>
                    <div>

                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder='Fees'
                            value={fees}
                            onChange={e => setFees(e.target.value)} />
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

export default Profile;