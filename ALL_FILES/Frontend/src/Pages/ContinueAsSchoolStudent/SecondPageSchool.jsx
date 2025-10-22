import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../Styles/SecondPageSchool.css";

function SecondPageSchool() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    school: "",
    educationBoard: "",
    rollNumber: "",
    city: "",
    state: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const required = ['fullName','email','phone','password','confirmPassword','school','educationBoard','rollNumber','city','state'];
    const missing = required.filter(k => !String(formData[k] || '').trim());
    if (missing.length) {
      alert('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      // Get grade and stream from localStorage (set in FirstPageSchool)
      const grade = localStorage.getItem('userGrade') || '';
      const stream = localStorage.getItem('userStream') || '';

      // Send registration data to backend API
      const response = await fetch('/api/school/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          school: formData.school,
          educationBoard: formData.educationBoard,
          rollNumber: formData.rollNumber,
          city: formData.city,
          state: formData.state,
          grade,
          stream
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store the JWT token for authenticated requests
        localStorage.setItem('authToken', data.token);
        
        // Store user type for dashboard
        localStorage.setItem('userType', 'school');
        
        // Store all user data for the dashboard
        localStorage.setItem('fullName', data.student.fullName);
        localStorage.setItem('userEmail', data.student.email);
        localStorage.setItem('userPhone', data.student.phone);
        localStorage.setItem('userSchool', data.student.school);
        localStorage.setItem('userEducationBoard', data.student.educationBoard);
        localStorage.setItem('userRollNumber', data.student.rollNumber);
        localStorage.setItem('userCity', data.student.city);
        localStorage.setItem('userState', data.student.state);
        localStorage.setItem('userGrade', data.student.grade);
        localStorage.setItem('userStream', data.student.stream);
        
        alert('Registration successful! Please login with your credentials.');
        navigate('/loginschool');
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
    <div className="secondpage-school-container">
      <div className="back-buttons">
        <Link to="/">
          <button className="back-button">← Back to Home</button>
        </Link>
        <Link to="/firstpage">
          <button className="back-button">← Back</button>
        </Link>
      </div>
      
      <img src={logo} alt="Logo" className="secondpage-school-logo" />
      <h1 className="heading">Complete Your Registration</h1>
      <h2 className="sub-heading">
        Just a few more details to personalize your learning journey
      </h2>

      <div className="form-box">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-section">
            <h3 className="section-heading">Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name 
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                required
              />
            </div>

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
              <label htmlFor="phone" className="form-label">
                Phone Number 
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
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
                placeholder="Create a strong password (min 8 chars)"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">School Details</h3>
            
            <div className="form-group">
              <label htmlFor="school" className="form-label">
                School Name 
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Enter your school name"
                className="form-input"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="educationBoard" className="form-label">
                  Education Board 
                </label>
                <select
                  id="educationBoard"
                  name="educationBoard"
                  value={formData.educationBoard}
                  onChange={handleChange}
                  className="form-input form-select"
                  required
                >
                  <option value="">Select your board</option>
                  <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                  <option value="ICSE">ICSE (Indian Certificate of Secondary Education)</option>
                  <option value="ISC">ISC (Indian School Certificate)</option>
                  <option value="State Board">State Board</option>
                  <option value="IB">IB (International Baccalaureate)</option>
                  <option value="IGCSE">IGCSE (Cambridge International)</option>
                  <option value="NIOS">NIOS (National Institute of Open Schooling)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rollNumber" className="form-label">
                  Roll Number 
                </label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City 
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state" className="form-label">
                  State 
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Your state"
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>

          <div className="login-link-container" style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>Already registered? </span>
            <Link to="/loginschool" style={{ color: '#8B5CF6', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
              Login here
            </Link>
          </div>

          <button type="submit" className="submit-button">
            Complete Registration
          </button>
        </form>

        <div className="footer">
          <h1 className="footer-title">🎓50,000+ Students Enrolled</h1>
          <h1 className="footer-title">📚200+ exams</h1>
        </div>
      </div>
    </div>
  );
}

export default SecondPageSchool;

