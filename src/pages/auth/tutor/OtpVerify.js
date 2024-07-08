import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { verifyOTP, verifyOTPClean } from "../../../redux/reducers/auth/verifyOtpSlice";
import { message} from 'antd';
const OtpVerify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otpString, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const email = localStorage.getItem("email");
    const { isLoading, success, errorMessage } = useSelector((state) => state.otpVerification);
    useEffect(() => {
        const savedEndTime = localStorage.getItem("otpEndTime");
        if (savedEndTime) {
            const endTime = new Date(savedEndTime);
            const currentTime = new Date();
            const diff = Math.ceil((endTime - currentTime) / 1000);
            if (diff > 0) {
                setTimer(diff);
                setCanResend(false);
            } else {
                setTimer(0);
                setCanResend(true);
            }
        }
    }, []);
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);
    const handleResend = () => {
        const newEndTime = new Date(new Date().getTime() + 60 * 1000);
        localStorage.setItem("otpEndTime", newEndTime);
        setTimer(60);
        setCanResend(false);
    };
    const handleChange = (index, value) => {
        if (/^[0-9a-zA-Z]$/.test(value) || value === "") {
            const newOtp = [...otpString];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < otpString.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const otp = otpString.join("");
        if (otpString) {
            dispatch(verifyOTP({ email,otp}));
        }
    };
    useEffect(() => {
        if (success) {
            message.success("Verification successful");
            navigate('/auth/tutor/login');
            dispatch(verifyOTPClean())
        }if(errorMessage){
            message.error(errorMessage)
        }
    }, [success, navigate,errorMessage,dispatch]);
    return (
        // <div className=" mt-24 w-full md:w-2/4 lg:w-1/4 mx-auto flex justify-center items-center">
        <div className=" flex flex-1 justify-center items-center mt-24">
            <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 p-4">
                <div className="mx-auto flex flex-col mt-8">
                    <div className="text-start">
                        <div className="pt-8">
                            <p className="text-2xl font-mono text-gray-900" >
                                Verification Code
                            </p>
                            <p className="text-xs pt-2 text-gray-500">
                                We have sent a code to <span style={{ color: '#E2136E' }}>{email}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <form className="mt-12" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                            {otpString.map((digit, index) => (
                                <div key={index} className="w-16 h-16">
                                    <input
                                        className="w-12 h-12 flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-xl bg-white focus:bg-gray-50 focus:ring-1 ring-gray-900"
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        id={`otp-input-${index}`}
                                        style={{ color: digit ? "black" : "black" }}
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="text-start text-sm font-medium text-gray-500">
                                {canResend ? (
                                    <button
                                        onClick={handleResend}
                                        className="text-xs"
                                        style={{ color: '#E2136E' }}
                                    >
                                        Resend OTP
                                    </button>
                                ) : (
                                    <p className="text-gray-900 text-xs">
                                        Did not receive your OTP {timer.toString().padStart(2, "0")}
                                    </p>
                                )}
                            </div>
                            <div>
                                <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black" >
                                    Verify Account
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpVerify;