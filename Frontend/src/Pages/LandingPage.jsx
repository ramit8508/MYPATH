import React from "react";
import logo from "../Assets/logo.png";
import "../Styles/Landingpage.css";
import { HiAcademicCap } from "react-icons/hi2";
import { FaUniversity } from "react-icons/fa";


function LandingPage() {
  return (
    <>
      <div className="container">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="header-heading">MYPATH</h1>
          <h2 className="header-subheading">
            Your personalized pathway to academic success and career
            opportunities
          </h2>
        </div>
        <div className="boxes">
          <div className="box">
            <HiAcademicCap className="box-icon" />
            <h1 className="box-title">School Student</h1>
            <h2 className="box-description">
              Class 8th - 12th (CBSE,ICSE,State Boards)
            </h2>
            <ul className="box1-features">
              <li>
                <span className="feature-icon" aria-hidden="true">
                  📘→
                </span>
                <span className="feature-title">&nbsp;Olympiads &amp; Competitions</span>
              </li>
              <li>
                <span className="feature-icon" aria-hidden="true">
                  👥→
                </span>
                <span className="feature-title">&nbsp;NTSE, KVPY, JEE/NEET Prep</span>
              </li>
              <li>
                <span className="feature-icon" aria-hidden="true">
                  🎓→
                </span>
                <span className="feature-title">&nbsp;Scholarship Exams</span>
              </li>
            </ul>
            <div className="box1-stats">
              <div className="stat">
                <span className="stat-number">40,000+</span>
                <span className="stat-label">School Students</span>
              </div>
              <div className="stat">
                <span className="stat-number">150+</span>
                <span className="stat-label">Competitions</span>
              </div>
            </div>
            <button className="get-started-button">
              Continue as School Student
            </button>
          </div>
            <div className="box">
              <FaUniversity className="box-icon2" />
              <h1 className="box-title">College Student</h1>
              <h2 className="box-description">
                Class 8th - 12th (CBSE,ICSE,State Boards)
              </h2>
              <ul className="box2-features">
                <li>
                  <span className="feature-icon" aria-hidden="true">
                    📘→
                  </span>
                  <span className="feature-title1">&nbsp;University Entrance Exams</span>
                </li>
                <li>
                  <span className="feature-icon" aria-hidden="true">
                    👥→
                  </span >
                  <span className="feature-title1">&nbsp;GATE,CAT,GRE,GMAT</span>
                </li>
                <li>
                  <span className="feature-icon" aria-hidden="true">
                    🎓→
                  </span>
                  <span className="feature-title1">&nbsp;Professional Certificates</span>
                </li>
              </ul>
              <div className="box2-stats">
                <div className="stat">
                  <span className="stat-number">25,000+</span>
                  <span className="stat-label2">College Students</span>
                </div>
                <div className="stat">
                  <span className="stat-number">150+</span>
                  <span className="stat-label2">Competitions</span>
                </div>
              </div>
              <button className="get-started-button2">
                Continue as College Student
              </button>
            </div>
          </div>
          <h1 className="footer">Join thousands of students who have found their personalized path to success with MYPATH</h1>
        </div>
        
    </>
  );
}

export default LandingPage;
