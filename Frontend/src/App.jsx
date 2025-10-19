import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import FirstpageSchool from "./Pages/ContinueAsSchoolStudent/FirstpageSchool";
import SecondPageSchool from "./Pages/ContinueAsSchoolStudent/SecondPageSchool";
import FirstPageCollege from "./Pages/ContinueAsCollegeStudent/FirstPageCollege";
import DashBoardSchool from "./Pages/ContinueAsSchoolStudent/DashBoardSchool";
import DashBoardCollege from "./Pages/ContinueAsCollegeStudent/DashBoardCollege";
import Feedback from "./Pages/ContinueAsSchoolStudent/Feedback";
import Notifications from "./Pages/ContinueAsSchoolStudent/Notifications";
import Syllabus from "./Pages/ContinueAsSchoolStudent/Syllabus";

function App() {
  const location = useLocation();

  const showNavbar =
    location.pathname === "/dashboardschool" ||
    location.pathname === "/dashboardcollege" ||
    location.pathname === "/feedback" ||
    location.pathname === "/notifications" ||
    location.pathname === "/syllabus";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/firstpage" element={<FirstpageSchool />} />
        <Route path="/secondpage" element={<SecondPageSchool />} />
        <Route path="/firstpagecollege" element={<FirstPageCollege />} />
        <Route path="/dashboardschool" element={<DashBoardSchool />} />
        <Route path="/dashboardcollege" element={<DashBoardCollege />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/syllabus" element={<Syllabus />} />
      </Routes>
    </>
  );
}

export default App;
