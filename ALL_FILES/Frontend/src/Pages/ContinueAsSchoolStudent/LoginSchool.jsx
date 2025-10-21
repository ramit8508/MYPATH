import React, { useState } from "react";
import "../../Styles/LoginSchool.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function LoginSchool() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    const registeredEmail = localStorage.getItem('registeredUserEmail_school');
    const registeredPassword = localStorage.getItem('registeredUserPassword_school');
    
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
    const userData = localStorage.getItem('schoolUserData');
    if (userData) {
      const user = JSON.parse(userData);
      // Restore all user data to localStorage for dashboard
      localStorage.setItem('userName', user.fullName);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userPhone', user.phone);
      localStorage.setItem('userSchool', user.school);
      localStorage.setItem('userBoard', user.educationBoard);
      localStorage.setItem('userRollNumber', user.rollNumber);
      localStorage.setItem('userCity', user.city);
      localStorage.setItem('userState', user.state);
      localStorage.setItem('userGrade', user.grade);
      localStorage.setItem('userStream', user.stream);
      localStorage.setItem('userType', 'school');
    }
    
    // Navigate to school dashboard after successful login
    navigate("/dashboardschool");
  };

  return (
    <div className="login-school-container">
      <div className="back-buttons">
        <Link to="/">
          <button className="back-button">← Back to Home</button>
        </Link>
        <Link to="/firstpage">
          <button className="back-button">📝 Sign Up</button>
        </Link>
      </div>
      
      <img src={logo} alt="Logo" className="login-school-logo" />
      <h1 className="heading">Welcome Back to MYPATH</h1>
      <h2 className="sub-heading">
        Login to continue your personalized academic journey
      </h2>

      <div className="form-box">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-section">
            <h3 className="section-heading">School Student Login</h3>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>

            <div className="forgot-password-link">
              <Link to="/forgot-password" style={{ color: '#8B5CF6', textDecoration: 'none', fontSize: '14px' }}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Login to Dashboard
          </button>

          <div className="signup-link-container">
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>Don't have an account? </span>
            <Link to="/firstpage" style={{ color: '#8B5CF6', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
              Sign up here
            </Link>
          </div>
        </form>

        <div className="footer">
          <h1 className="footer-title">🎓50,000+ Students Enrolled</h1>
          <h1 className="footer-title">📚200+ exams</h1>
        </div>
      </div>
    </div>
  );
}

export default LoginSchool;
