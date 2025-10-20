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
import NotificationsSchool from "./Pages/ContinueAsSchoolStudent/Notifications";
import NotificationsCollege from "./Pages/ContinueAsCollegeStudent/Notifications";
import SyllabusSchool from "./Pages/ContinueAsSchoolStudent/Syllabus";
import SyllabusCollege from "./Pages/ContinueAsCollegeStudent/Syllabus";

function App() {
  const location = useLocation();

  const showNavbar =
    location.pathname === "/dashboardschool" ||
    location.pathname === "/dashboardcollege" ||
    location.pathname === "/feedback" ||
    location.pathname === "/notificationsschool" ||
    location.pathname === "/notificationscollege" ||
    location.pathname === "/syllabusschool" ||
    location.pathname === "/syllabuscollege";

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
        <Route path="/notificationsschool" element={<NotificationsSchool />} />
        <Route path="/notificationscollege" element={<NotificationsCollege />} />
        <Route path="/syllabusschool" element={<SyllabusSchool />} />
        <Route path="/syllabuscollege" element={<SyllabusCollege />} />
      </Routes>
    </>
  );
}

export default App;
