import React from "react";
import "../../Styles/FirstpageCollege.css";
import { Link } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
function FirstPageCollege() {
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
          <div className="college-box-content">
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
              required
            />
            <label className="college-input-label" htmlFor="Email Address">
              Email Address
            </label>
            <input
              type="email"
              id="Email Address"
              className="college-input-field"
              placeholder=""
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
              required
            />
            <label className="college-input-label" htmlFor="Course">
              Course
            </label>
            <input
              type="text"
              placeholder="Select Your Course"
              list="courses"
              className="college-input-field"
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
              htmlFor="Specialization/Branch"
            >
              Specialization/Branch
            </label>
            <input
              type="text"
              id="Specialization/Branch"
              className="college-input-field"
              placeholder="eg., Computer Science,Mechanical,Commerce"
            />
            <label className="college-input-label" htmlFor="Year">
              Year of Study
            </label>
            <input
              type="text"
              placeholder="Select Year"
              list="years"
              className="college-input-field"
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
              htmlFor="College/University Name"
            >
              College/University Name
            </label>
            <input
              type="text"
              id="College/University Name"
              className="college-input-field"
              placeholder=""
              required
            />
            <label
              className="college-input-label"
              htmlFor="Roll Number/Student ID"
            >
              Roll Number/Student ID
            </label>
            <input
              type="text"
              id="Roll Number/Student ID"
              className="college-input-field"
              placeholder=""
              required
            />
            <label className="college-input-label" htmlFor="Category">
              Category
            </label>
            <input
              type="text"
              placeholder="Select Category"
              list="categories"
              className="college-input-field"
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
            <button className="college-submit-button">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstPageCollege;
