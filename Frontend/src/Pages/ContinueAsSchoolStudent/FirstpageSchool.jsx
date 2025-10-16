import React, { useState } from "react";
import "../../Styles/FirstpageSchool.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
function FirstpageSchool() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    // Reset stream when class changes
    setSelectedStream("");
  };

  const showStreamSelector =
    selectedClass === "class 11th" || selectedClass === "class 12th";

  // Function to get the appropriate content based on class and stream
  const getInfoContent = () => {
    // For Class 8-10
    if (selectedClass === "class 8th" || selectedClass === "class 9th" || selectedClass === "class 10th") {
      return {
        title: `What's next for ${selectedClass === "class 8th" ? "Class 8" : selectedClass === "class 9th" ? "Class 9" : "Class 10"} students?`,
        description: "Science Olympiads, Math competitions, and talent search exams"
      };
    }

    // For Class 11-12 with stream selection
    if (showStreamSelector && selectedStream) {
      if (selectedStream.includes("PCM")) {
        return {
          title: "What's next for Class 11 students?",
          description: "KVPY, JEE preparation, NEET preparation, and science competitions"
        };
      } else if (selectedStream.includes("PCB")) {
        return {
          title: "What's next for Class 11 students?",
          description: "KVPY, JEE preparation, NEET preparation, and science competitions"
        };
      } else if (selectedStream.includes("PCMB")) {
        return {
          title: "What's next for Class 11 students?",
          description: "KVPY, JEE preparation, NEET preparation, and science competitions"
        };
      } else if (selectedStream.includes("Commerce")) {
        return {
          title: "What's next for Class 11 students?",
          description: "Commerce Olympiads, CA foundation preparation"
        };
      } else if (selectedStream.includes("Arts") || selectedStream.includes("Humanities")) {
        return {
          title: "What's next for Class 11 students?",
          description: "Arts competitions, scholarship exams, and humanities olympiads"
        };
      }
    }

    return null;
  };

  const infoContent = getInfoContent();

  return (
    <>
      <div className="firstpage-school-container">
        <div className="back-buttons">
          <Link to="/">
            <button className="back-button">← Back to Home</button>
          </Link>
          <Link to="/">
            <button className="back-button">🏠 Start Over</button>
          </Link>
        </div>
        <img src={logo} alt="Logo" className="firstpage-school-logo" />
        <h1 className="heading">Welcome to MYPATH</h1>
        <h2 className="sub-heading">
          Let's discover your personalized academic pathway
        </h2>
        <div className="box">
          <div className="box-content">
            <h1 className="box-content-heading">Choose Your Academic Level</h1>
            <h2 className="box-content-subheading">
              This helps us create your personalized path to success
            </h2>
            <h3 className="box-content-sub-subheading">
              Which class are you studying in?
            </h3>
            <input
              type="text"
              placeholder="Select Your Class"
              list="classes"
              className="custom-input"
              value={selectedClass}
              onChange={handleClassChange}
            />

            <datalist id="classes">
              <option value="" disabled>
                Select your class
              </option>
              <option value="class 8th" />
              <option value="class 9th" />
              <option value="class 10th" />
              <option value="class 11th" />
              <option value="class 12th" />
            </datalist>
            <div className="arrow-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>

            {showStreamSelector && (
              <div className="stream-selector">
                <h3 className="box-content-sub-subheadings">
                  Select your stream/subject combination
                </h3>
                <input
                  type="text"
                  placeholder="Choose your stream"
                  list="streams"
                  className="custom-input"
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                />
                <datalist id="streams">
                  <option value="Science (PCM) - Physics, Chemistry, Mathematics" />
                  <option value="Science (PCB) - Physics, Chemistry, Biology" />
                  <option value="Science (PCMB) - Physics, Chemistry, Math, Biology" />
                  <option value="Commerce - Business Studies, Economics, Accountancy" />
                  <option value="Arts/Humanities - History, Political Science, etc." />
                </datalist>
              </div>
            )}
          </div>
          <Link to="/secondpage">
            <button
              className="get-started-button"
              disabled={
                !selectedClass || (showStreamSelector && !selectedStream)
              }
            >
              Continue to Registration
            </button>
          </Link>
          
          {infoContent && (
            <div className="info-card">
              <div className="info-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <div className="info-card-content">
                <h3 className="info-card-title">{infoContent.title}</h3>
                <p className="info-card-description">{infoContent.description}</p>
              </div>
            </div>
          )}
          <div className="footer">
          <h1 className="footer-title">🎓50,000+ Students Enrolled</h1>
          <h1 className="footer-title">📚200+ exams</h1>
        </div>
        </div>
        
      </div>
    </>
  );
}export default FirstpageSchool;
