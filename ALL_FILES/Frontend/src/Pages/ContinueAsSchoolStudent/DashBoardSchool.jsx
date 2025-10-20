import React, { useState, useEffect } from "react";
import "../../Styles/DashBoardSchool.css";
import { HiAcademicCap } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { IoIosTrendingUp } from "react-icons/io";

function DashBoardSchool() {
  const [userData, setUserData] = useState({
    fullName: "",
    grade: "",
    stream: "",
    school: "",
    educationBoard: "",
    rollNumber: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedData = {
      fullName: localStorage.getItem("userName") || "N/A",
      grade: localStorage.getItem("userGrade") || "N/A",
      stream: localStorage.getItem("userStream") || "N/A",
      school: localStorage.getItem("userSchool") || "N/A",
      educationBoard: localStorage.getItem("userBoard") || "N/A",
      rollNumber: localStorage.getItem("userRollNumber") || "N/A",
      city: localStorage.getItem("userCity") || "N/A",
      state: localStorage.getItem("userState") || "N/A",
    };
    setUserData(storedData);
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="student-profile">
          <h2 className="profile-heading">Student Profile</h2>
          <h3 className="profile-subheading">
            Your registration details and academic information
          </h3>

          <div className="profile-details">
            <div className="profile-detail">
              <h2 className="details-style">Full Name:</h2>
              <p className="detail-value">{userData.fullName}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Grade:</h2>
              <p className="detail-value">{userData.grade}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Stream:</h2>
              <p className="detail-value">{userData.stream}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Education Board:</h2>
              <p className="detail-value">{userData.educationBoard}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Roll Number:</h2>
              <p className="detail-value">{userData.rollNumber}</p>
            </div>
          </div>

          <div className="separator-line"></div>

          <div className="college-details">
            <div className="profile-detail">
              <h2 className="details-style">School Name:</h2>
              <p className="detail-value">{userData.school}</p>
            </div>
            <div className="profile-detail">
              <h2 className="details-style">State:</h2>
              <p className="detail-value">{userData.state}</p>
            </div>
            <div className="profile-detail">
              <h2 className="details-style">City:</h2>
              <p className="detail-value">{userData.city}</p>
            </div>
          </div>
        </div>
        <div className="number-container">
          <div className="box">
            <div className="box1-icon-wrapper">
              <HiAcademicCap className="box-icon1212" />
              <h1>N/A</h1>
            </div>
            <h2 className="box-heading">Available Pathways</h2>
          </div>
          <div className="box">
            <div className="box1-icon-wrapper">
              <SlCalender className="box-icon1213" />
              <h1>N/A</h1>
            </div>
            <h2 className="box-heading">Applications Submitted</h2>
          </div>
          <div className="box">
            <div className="box1-icon-wrapper">
              <IoIosTrendingUp className="box-icon1214" />
              <h1>N/A</h1>
            </div>
            <h2 className="box-heading">Urgent Deadlines</h2>
          </div>
        </div>
        <div className="exam-head-container">
          <h1 className="exam-heading">
            Your Personalized Academic Pathways - {userData.grade}
          </h1>
          <h2 className="button1">3 Eligible</h2>
          <h2 className="button2">0 Applied</h2>
          <h2 className="button3">2 Urgent</h2>
        </div>
      </div>
    </>
  );
}

export default DashBoardSchool;
