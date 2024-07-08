import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchStudentApprovedEnrollment,
  fetchStudentPendingEnrollment,
} from "../../../../redux/reducers/enrollment/studentEnrollmentSlice";
import { PieChart } from "@mui/x-charts/PieChart";
import { fetchStudentAttendance} from "../../../../redux/reducers/attendance/createAttendanceSlice";
import EnrollmentCrad from "../enrollment/EnrollmentCrad";
import AttendanceCard from "../attendance/AttendanceCard";
import { useState } from "react";
const StudentDashboard = () => {
  const { token,name } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudentPendingEnrollment({ token }));
    dispatch(fetchStudentApprovedEnrollment({ token }));
    dispatch(fetchStudentAttendance({ token }));
  }, [dispatch, token]);
  const { pendingStatus, approvedStatus } = useSelector(
    (state) => state.enrollmentStatus
  );
  const pendingEnrollment = pendingStatus?.data?.length;
  const approvedEnrollment = approvedStatus?.data?.length;
  const declinedJobs = 1;
  const { data } = useSelector((state) => state.attendance.studentAttendances);
  const presentStatus = data?.presentPercentage;
  const absentStatus = data?.absentPercentage;
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

      <div className="p-16 flex gap-4">
        <EnrollmentCrad></EnrollmentCrad>
        <AttendanceCard/>
      </div>
      <div className="mt-12 flex w-full">
        <div className="w-full ">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: pendingEnrollment, label: "Pending" },
                  { id: 1, value: approvedEnrollment, label: "Approved" },
                  { id: 2, value: declinedJobs, label: "Rejected" },
                ],
              },
            ]}
            // width={400}
            className="w-3/4"
            height={200}
          />
          <p className=" text-xs text-center text-blue-500">Enrollment Stats</p>
        </div>
        <div className="w-full">
          <p className=" text-xs text-center text-blue-500">Attendance Stats</p>
          <p className=" text-xs text-center text-blue-500">Total Attendance {data?.totalAttendance}</p>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: presentStatus, label: "Present" },
                  { id: 1, value: absentStatus, label: "Absent" },
                ],
              },
            ]}
            // width={400}
            className="w-3/4"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
