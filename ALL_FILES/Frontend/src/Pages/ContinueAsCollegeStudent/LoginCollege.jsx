import React, { useState } from "react";
import "../../Styles/LoginCollege.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

function LoginCollege() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Login submitted:", formData);
    
    // Verify credentials against stored registration data
    const registeredEmail = localStorage.getItem('registeredUserEmail_college');
    const registeredPassword = localStorage.getItem('registeredUserPassword_college');
    
    if (!registeredEmail || !registeredPassword) {
      setError("No registered account found. Please sign up first.");
      return;
    }
    
    if (formData.email !== registeredEmail) {
      setError("Email not found. Please check your email or sign up.");
      return;
    }
    
    if (formData.password !== registeredPassword) {
      setError("Incorrect password. Please try again.");
      return;
    }
    
    // Login successful - retrieve and restore user data
    const userData = localStorage.getItem('collegeUserData');
    if (userData) {
      const user = JSON.parse(userData);
      // Restore all user data to localStorage for dashboard
      localStorage.setItem('userName', user.fullName);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userPhone', user.phoneNumber);
      localStorage.setItem('userCourse', user.course);
      localStorage.setItem('userSpecialization', user.specialization);
      localStorage.setItem('userYear', user.year);
      localStorage.setItem('userCollege', user.collegeName);
      localStorage.setItem('userRollNumber', user.rollNumber);
      localStorage.setItem('userCategory', user.category);
      localStorage.setItem('userType', 'college');
    }
    
    // Navigate to college dashboard after successful login
    navigate("/dashboardcollege");
  };

  return (
    <>
      <div className="login-college-container">
        <div className="college-back-buttons">
          <Link to="/">
            <button className="college-back-button">← Back to Home</button>
          </Link>
          <Link to="/firstpagecollege">
            <button className="college-back-button">📝 Sign Up</button>
          </Link>
        </div>
        <FaUniversity className="box-iconcollege" />
        <h1 className="college-heading">Welcome Back to MYPATH</h1>
        <h2 className="college-sub-heading">
          Login to access your personalized career pathway
        </h2>
        <div className="college-box">
          <form className="college-box-content" onSubmit={handleSubmit}>
            <h1 className="college-box-heading">
              College Student Login
            </h1>
            <h2 className="college-box-subheading">
              Enter your credentials to continue your journey
            </h2>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <label className="college-input-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="college-input-field"
              placeholder="your.email@example.com"
              value={formData.email}
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="forgot-password-link">
              <Link to="/forgot-password" style={{ color: '#83E0C0', textDecoration: 'none', fontSize: '14px' }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="college-submit-button">
              Login to Dashboard
            </button>

            <div className="signup-link-container">
              <span style={{ color: '#94a3b8', fontSize: '14px' }}>Don't have an account? </span>
              <Link to="/firstpagecollege" style={{ color: '#83E0C0', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
                Sign up here
              </Link>
            </div>

            <div className="beauty-box">
              <div className="beauty-content">
                <div className="content-box">
                  <FaUniversity className="box-icon2" />
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

export default LoginCollege;
