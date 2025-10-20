import React, { useState, useEffect } from "react";
import "../../Styles/DashBoardSchool.css";
import { HiAcademicCap } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { IoIosTrendingUp } from "react-icons/io";

function DashBoardCollege() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    course: "",
    specialization: "",
    year: "",
    collegeName: "",
    rollNumber: "",
    category: "",
  });

  useEffect(() => {
    // Retrieve college student data from localStorage
    const storedData = {
      fullName: localStorage.getItem("userName") || "N/A",
      email: localStorage.getItem("userEmail") || "N/A",
      phoneNumber: localStorage.getItem("userPhone") || "N/A",
      course: localStorage.getItem("userCourse") || "N/A",
      specialization: localStorage.getItem("userSpecialization") || "N/A",
      year: localStorage.getItem("userYear") || "N/A",
      collegeName: localStorage.getItem("userCollege") || "N/A",
      rollNumber: localStorage.getItem("userRollNumber") || "N/A",
      category: localStorage.getItem("userCategory") || "N/A",
    };
    setUserData(storedData);
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="student-profile">
          <h2 className="profile-heading">College Student Profile</h2>
          <h3 className="profile-subheading">
            Your registration details and academic information
          </h3>

          <div className="profile-details">
            <div className="profile-detail">
              <h2 className="details-style">Full Name:</h2>
              <p className="detail-value">{userData.fullName}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Course:</h2>
              <p className="detail-value">{userData.course}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Specialization:</h2>
              <p className="detail-value">{userData.specialization || "N/A"}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Year:</h2>
              <p className="detail-value">{userData.year}</p>
            </div>

            <div className="profile-detail">
              <h2 className="details-style">Roll Number:</h2>
              <p className="detail-value">{userData.rollNumber}</p>
            </div>
          </div>

          <div className="separator-line"></div>

          <div className="college-details">
            <div className="profile-detail">
              <h2 className="details-style">College Name:</h2>
              <p className="detail-value">{userData.collegeName}</p>
            </div>
            <div className="profile-detail">
              <h2 className="details-style">Category:</h2>
              <p className="detail-value">{userData.category}</p>
            </div>
            <div className="profile-detail">
              <h2 className="details-style">Email:</h2>
              <p className="detail-value">{userData.email}</p>
            </div>
            <div className="profile-detail">
              <h2 className="details-style">Phone:</h2>
              <p className="detail-value">{userData.phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className="number-container">
          <div className="box">
            <div className="box1-icon-wrapper">
              <HiAcademicCap className="box-icon1212" />
              <h1>5</h1>
            </div>
            <h2 className="box-heading">Available Pathways</h2>
          </div>
          <div className="box">
            <div className="box1-icon-wrapper">
              <SlCalender className="box-icon1213" />
              <h1>0</h1>
            </div>
            <h2 className="box-heading">Applications Submitted</h2>
          </div>
          <div className="box">
            <div className="box1-icon-wrapper">
              <IoIosTrendingUp className="box-icon1214" />
              <h1>3</h1>
            </div>
            <h2 className="box-heading">Urgent Deadlines</h2>
          </div>
        </div>
        <div className="exam-head-container">
          <h1 className="exam-heading">
            Your Personalized Academic Pathways - {userData.course}
          </h1>
          <h2 className="button1">5 Eligible</h2>
          <h2 className="button2">0 Applied</h2>
          <h2 className="button3">3 Urgent</h2>
        </div>
      </div>
    </>
  );
}

export default DashBoardCollege;
