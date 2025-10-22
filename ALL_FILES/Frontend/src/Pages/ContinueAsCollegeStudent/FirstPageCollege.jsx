import React, { useState } from "react";
import "../../Styles/FirstpageCollege.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
function FirstPageCollege() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    course: "",
    specialization: "",
    year: "",
    collegeName: "",
    rollNumber: "",
    category: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'password', 'confirmPassword', 'course', 'year', 'collegeName', 'rollNumber', 'category'];
    const isFormValid = requiredFields.every(field => formData[field].trim() !== '');
    
    if (!isFormValid) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    // Password validations
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }
    
    try {
      // Send registration data to backend API
      const response = await fetch('/api/college/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          course: formData.course,
          specialization: formData.specialization,
          year: formData.year,
          collegeName: formData.collegeName,
          rollNumber: formData.rollNumber,
          category: formData.category
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store the JWT token for authenticated requests
        localStorage.setItem('authToken', data.token);
        
        // Store user type for dashboard
        localStorage.setItem('userType', 'college');
        
        // Store all user data for the dashboard
        localStorage.setItem('fullName', data.student.fullName);
        localStorage.setItem('userEmail', data.student.email);
        localStorage.setItem('userPhone', data.student.phoneNumber);
        localStorage.setItem('userCourse', data.student.course);
        localStorage.setItem('userSpecialization', data.student.specialization);
        localStorage.setItem('userYear', data.student.year);
        localStorage.setItem('userCollege', data.student.collegeName);
        localStorage.setItem('userRollNumber', data.student.rollNumber);
        localStorage.setItem('userCategory', data.student.category);
        
        alert('Registration successful! Please login with your credentials.');
        navigate('/logincollege');
      } else {
        // Show error message from backend
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Unable to connect to server. Please check if the backend is running and try again.');
    }
  };

  return (
    <>
      <div className="firstpage-college-container">
        <div className="college-back-buttons">
          <Link to="/">
            <button className="college-back-button">← Back to Home</button>
          </Link>
          <Link to="/">
            <button className="college-back-button">🏠 Start Over</button>
          </Link>
        </div>
        <FaUniversity className="box-iconcollege" />
        <h1 className="college-heading">Create Your MYPATH Profile</h1>
        <h2 className="college-sub-heading">
          Enter your details to discover your personalized career pathway
        </h2>
        <div className="college-box">
          <form className="college-box-content" onSubmit={handleSubmit}>
            <h1 className="college-box-heading">
              Complete Your MYPATH Profile
            </h1>
            <h2 className="college-box-subheading">
              Unlock personalized university entrance exams, professional
              certifications, and career opportunities
            </h2>
            <label className="college-input-label" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="college-input-field"
              placeholder=""
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label className="college-input-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="college-input-field"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="college-input-label" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="college-input-field"
              placeholder=""
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label className="college-input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="college-input-field"
              placeholder="Create a strong password (min 8 chars)"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="college-input-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="college-input-field"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label className="college-input-label" htmlFor="course">
              Course
            </label>
            <input
              type="text"
              id="course"
              placeholder="Select Your Course"
              list="courses"
              className="college-input-field"
              value={formData.course}
              onChange={handleChange}
              required
            />

            <datalist id="courses">
              <option value="" disabled>
                Select your course
              </option>
              <option value="B.Tech/B.E" />
              <option value="M.Tech/M.E" />
              <option value="B.SC" />
              <option value="M.SC" />
              <option value="B.COM" />
              <option value="M.COM" />
              <option value="B.A" />
              <option value="BBA" />
              <option value="MBA" />
              <option value="BCA" />
              <option value="MCA" />
              <option value="PhD" />
            </datalist>
            <label
              className="college-input-label"
              htmlFor="specialization"
            >
              Specialization/Branch
            </label>
            <input
              type="text"
              id="specialization"
              className="college-input-field"
              placeholder="eg., Computer Science,Mechanical,Commerce"
              value={formData.specialization}
              onChange={handleChange}
            />
            <label className="college-input-label" htmlFor="year">
              Year of Study
            </label>
            <input
              type="text"
              id="year"
              placeholder="Select Year"
              list="years"
              className="college-input-field"
              value={formData.year}
              onChange={handleChange}
              required
            />
            <datalist id="years">
              <option value="" disabled>
                Select your year
              </option>
              <option value="1st Year" />
              <option value="2nd Year" />
              <option value="3rd Year" />
              <option value="4th Year" />
              <option value="5th Year" />
              <option value="Final Year" />
            </datalist>
            <label
              className="college-input-label"
              htmlFor="collegeName"
            >
              College/University Name
            </label>
            <input
              type="text"
              id="collegeName"
              className="college-input-field"
              placeholder=""
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
            <label
              className="college-input-label"
              htmlFor="rollNumber"
            >
              Roll Number/Student ID
            </label>
            <input
              type="text"
              id="rollNumber"
              className="college-input-field"
              placeholder=""
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
            <label className="college-input-label" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              placeholder="Select Category"
              list="categories"
              className="college-input-field"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <datalist id="categories">
              <option value="" disabled>
                Select your category
              </option>
              <option value="General" />
              <option value="OBC" />
              <option value="SC" />
              <option value="ST" />
              <option value="EWS" />
            </datalist>
            <div className="login-link-container" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '10px' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px' }}>Already registered? </span>
              <Link to="/logincollege" style={{ color: '#8B5CF6', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
                Login here
              </Link>
            </div>
            <button type="submit" className="college-submit-button">
              Complete Registration
            </button>
            <div className="beauty-box">
              <div className="beauty-content">
                <div className="content-box">
                  <HiAcademicCap className="box-icon2" />
                  <h1 className="beauty-heading">
                    Your MYPATH College Journey
                  </h1>
                </div>
                <p className="beauty-para">
                  GATE, CAT, MAT, XAT, GRE, GMAT, TOEFL, IELTS, Civil Services,
                  Banking exams, Professional certifications, and personalized
                  career-oriented pathways.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FirstPageCollege;
