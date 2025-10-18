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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);

    // Navigate to school dashboard
    navigate("/dashboardschool");
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

