import React, { useState, useEffect } from "react";
import "../../Styles/DashBoardSchool.css";
import { HiAcademicCap } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { IoIosTrendingUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function DashBoardSchool() {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch school student data from backend API
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError('Not authenticated. Please login.');
          navigate('/loginschool');
          return;
        }

        const response = await fetch('/api/school/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUserData({
            fullName: data.student.fullName || "N/A",
            grade: data.student.grade || "N/A",
            stream: data.student.stream || "N/A",
            school: data.student.school || "N/A",
            educationBoard: data.student.educationBoard || "N/A",
            rollNumber: data.student.rollNumber || "N/A",
            city: data.student.city || "N/A",
            state: data.student.state || "N/A",
          });
        } else {
          setError(data.message || 'Failed to fetch user data');
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            navigate('/loginschool');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Unable to connect to server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="main-container">
        <div className="student-profile">
          <h2 className="profile-heading">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <div className="student-profile">
          <h2 className="profile-heading">Error</h2>
          <p className="detail-value">{error}</p>
        </div>
      </div>
    );
  }

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
